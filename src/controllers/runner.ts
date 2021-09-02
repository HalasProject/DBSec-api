"use strict";

import { Response, Request, NextFunction } from "express";
import { Instance,InstanceDocument } from "../models/Instance";
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
export const run = async (req: Request, res: Response,next: NextFunction) => {
    const generatedID = nanoid(10);
    const log:any = {};
    try {
        const { instance_id, modules_ids } = req.body;
        Instance.findById(instance_id, (err: NativeError, instance: InstanceDocument) => {
            if (err) { return next(err); }
            const instance_conn = new Sequelize(instance.database,instance.privileged_account,instance.privileged_account_password,{
                host: instance.server,
                dialect: instance.database_type as Dialect,
            });

            const modules:Query<ModuleDocument[], ModuleDocument> = Module.find({
                "_id": { $in: modules_ids } ,
                "enabled": true,
                "database.type": instance.database_type
            });

            modules.exec(async (err,modules:ModuleDocument[]) => {
                if (err) { return next(err); }
                if (modules.length == 0) { return res.status(404).json({message:"Modules was not found,please make sure you selected the correct ones"}); }
                
                const results: Array<any> = [];
                let passedTest = 0;
                for (const module of modules){
                    await instance_conn.query(module.sql).then(async (rows) => {
                        const testCreated = new Test({
                            uuid: generatedID,
                            instance_id: instance._id,
                            module_id: module._id,
                            resultat: JSON.stringify(rows)
                        });

                        testCreated.save(async function (err) {
                            if (err) { return next(err); }
                            passedTest++;
                        });

                        results.push(testCreated);
                       
                    });
                    return res.status(200).json({data: results,message:`(${passedTest}/${modules.length}) Test passed !`}); 
                }               
            });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};