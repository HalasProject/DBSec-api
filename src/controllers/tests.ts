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
        const { id } = req.params;
        
        Test.aggregate([
            {$match: { uuid: id }},
            { 
                $lookup:
                {
                  from: "instances",
                  localField: "instance_id",
                  foreignField: "_id",
                  as: "instance"
                }
            },
            {
                $group: {
                    "_id":  "$uuid",
                    "count":{"$sum":1},
                    "instance": {"$first":"$instance.database_type"},
                    "tests": { "$push": "$$ROOT"} 
                },
            },
            {
                $project: { "tests.instance":  0, "tests.uuid": 0},
            },
            {   $unwind:"$instance"  }
        ]).exec((err: NativeError, test) => {
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
        Test.create(data, function (err:NativeError, test:TestDocument) {
            if (err) { return next(err); }
            return res.status(201).json({data: test});
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
        const { id } = req.params;
        Test.findByIdAndRemove(id, {}, (function(err) {
            if (!err) {
                return res.status(200).json({ message: "Test deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete test", error: err.message });
            }
        }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete many test uuid.
 *  @param  {Request} req
  * @param  {Response} res
 */
 export const destroyMany = (req: Request, res: Response) => {
    try {
        const {uuid} = req.params;
        Test.remove({ uuid: uuid },(function(err) {
            if (!err) {
                return res.status(200).json({ message: "Tests deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete tests",error: err.message });
            }
        }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete existing test with id.
 *  @param  {Request} req
  * @param  {Response} res
 */
 export const groupe = async (req: Request, res: Response) => {
    try {
        Test.aggregate([
            {
                $lookup: {
                    from: "instances",
                    localField: "instance_id",
                    foreignField: "_id",
                    as: "instance"
                }
            },
            {   $unwind:"$instance"  },
            {
                $group: {
                    "_id": "$uuid",
                    "count":{"$sum":1},
                    "database": {"$first":"$instance.database_type"},
                    "created_at":{"$last":"$createdAt"}
                }
            },
            { $sort: {"created_at":1} }
        ]).exec(function (err, tests) {
            if (!err) {
                return res.status(200).json({ data:tests });
            } else {
                return res.status(400).json({ message: "Cannot get tests",error: err.message });
            }
        });

    } catch (e) {
        return res.status(500).send(e.message);
    }
};
