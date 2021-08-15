"use strict";

import { Response, Request, NextFunction } from "express";
import { Section,SectionDocument } from "../models/Section";
import { CallbackError, NativeError,Query } from "mongoose";
import { Module,ModuleDocument } from "../models/Module";
import { Test,TestDocument } from "../models/Test";
import { Sequelize,Dialect} from "sequelize";
import { nanoid } from "nanoid";
/**
 * Run tests
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const run = (req: Request, res: Response,next: NextFunction) => {
    const generatedID = nanoid(10);
    const log:any = {};
    try {
        const { section_id, test_ids } = req.body;
        console.log(test_ids);
        Section.findById(section_id, (err: NativeError, section: SectionDocument) => {
            if (err) { return next(err); }
            const instance = new Sequelize(section.database,section.privileged_account,section.privileged_account_password,{
                host: section.server,
                dialect: section.database_type as Dialect,
            });
            const modules:Query<ModuleDocument[], ModuleDocument> = Module.find({"_id": { $in: test_ids } ,"enabled": true});
            modules.exec(async (err,modules:ModuleDocument[]) => {
                if (err) { return next(err); }
                if (modules.length == 0) { return res.status(200).json({message:"Aucun test na etait trouveé"}); }
                const results: Array<any> = [];
                let passedTest = 0;
                for (const module of modules){
                    await instance.query(module.sql).then(async (rows) => {
                        console.log(rows);

                        const testCreated = new Test({
                            uuid: generatedID,
                            section_id: section._id,
                            module_id: module._id,
                            resultat: JSON.stringify(rows)
                        });

                        testCreated.save(async function (err) {
                            if (err) { return next(err); }
                            passedTest++;
                        });

                        results.push(testCreated);
                       
                    });
                    return res.status(200).json({data: [],message:`(${passedTest}/${modules.length}) Test passed !`}); 
                }               
            });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};