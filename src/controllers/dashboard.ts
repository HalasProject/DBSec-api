import { Response, Request, NextFunction } from "express";
import { Instance } from "../models/Instance";
import { Module } from "../models/Module";
import { Test } from "../models/Test";
import { NativeError } from "mongoose";

/**
 * Return statistique
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
*/
export const statistique = async (req: Request, res: Response,next: NextFunction) => {
    
    try {
        const modulesTotal = await Module.count({enabled:true}).exec();
        const instancesTotal = await Instance.count().exec();
        const testsTotal: [] = await Test.aggregate([{
            $group: {
                "_id":  "$uuid",
                "count":{"$sum":1}
            }
        }]).exec();
        
        const moduleDistribution = await Module.aggregate([
            {
                $group: {
                    "_id":  "$database.type",
                    "count":{"$sum":1}
                },
            }
        ]).exec(); 

        const testsDistribution = await Test.aggregate([
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
                    "_id": {
                        "uuid":"$uuid",
                        "instance":"$instance.database_type"
                    },
                    "count":{"$sum":1},
                    "database": {"$first":"$instance.database_type"},
                }
            },
            { $unwind:"$database"}, 
            { $project: {"database":1, "total":"$count", _id: 0}},
            {
                $group: {
                    "_id": {
                        "database":"$database",
                    },
                    "count":{"$sum":1},
                    "database": {"$first":"$database"},
                }
            },
            { $project: {"database":1, "total":"$count", _id: 0}},
        ]).exec(); 

        const lastTestTime = (await Test.findOne().sort({createdAt:-1}).select("createdAt").limit(1)).createdAt;
        return res.status(200).json({ instancesTotal,modulesTotal,...{testsTotal:testsTotal.length}, testsDistribution, moduleDistribution, lastTestTime});
    } catch (e) {
        return res.status(500).send(e.message);
    }
};