"use strict";

import { Response, Request, NextFunction } from "express";
import { Section,SectionDocument } from "../models/Section";
import { CallbackError, NativeError,Query } from "mongoose";
import { Test,TestDocument } from "../models/Test";
import { Sequelize,Dialect } from "sequelize";

/**
 * Run tests
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const run = (req: Request, res: Response,next: NextFunction) => {

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
            const tests:Query<TestDocument[], TestDocument> = Test.find({"_id": { $in: test_ids } ,"enabled": true});
            tests.exec((err,tests:TestDocument[]) => {
                if (err) { return next(err); }
                if (tests.length == 0) { return res.status(200).json({message:"Aucun test na etait trouveé"}); }
                tests.forEach((test) => {
                    instance.query(test.sql).then((rows) => {
                        rows.forEach((row:any) => {
                            if (row["value"] == test.result.good){
                                log.result = true;
                            }
                            else if (row["value"] == test.result.worst) {
                                log.result = false;
                            }
                            res.status(200).json({data:log});
                        });
                    });
                });
            });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};