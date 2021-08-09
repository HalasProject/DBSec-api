"use strict";

import { Response, Request, NextFunction } from "express";
import { Test,TestDocument } from "../models/Test";
import { CallbackError, NativeError } from "mongoose";


/**
 * Display information of one test.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const one = (req: Request, res: Response,next: NextFunction) => {
    try {
        const id = req.params.id;
        Test.findById(id, (err: NativeError, test: TestDocument) => {
            if (err) { return next(err); }
            return res.status(200).json({data: test});
        });
            
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * List all tests;
 * @param  {Request} req
 * @param  {Response} res
*/
export const all = async (req: Request, res: Response,next: NextFunction) => {
    try {
        Test.find({}, (err, tests:TestDocument[]) => {
            if (err) { return next(err); }
            return res.status(200).json({ data: tests });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Create new test.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const create = (req: Request, res: Response,next: NextFunction) => {
    const { data } = req.body;
    try {
        console.log(data);
        Test.create(data, function (err:NativeError, test:TestDocument) {
            if (err) { return next(err); }
            return res.status(200).json({data: test.toJSON()});
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete existing test with id.
 *  @param  {Request} req
  * @param  {Response} res
 */
export const destroy = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        Test.remove({ _id: id },(function(err) {
            if (!err) {
                return res.status(200).json({ message: "Test deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete test",error: err.message });
            }
        }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
  * Update existing test.
  * @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
*/
 export const update = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const id  = req.params.id;
        const { data } = req.body;
        await Test.updateOne({_id:id},{...data},null,function (err, result) {
            if (err) { return next(err); }
            if (result.nModified === 1) return res.status(200).json({data:result,message: "Test updated successfully" });
            else return res.status(400).json({data:result,message: "Cannot update test" });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};
