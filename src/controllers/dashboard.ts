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
        const modules_nbr = await Module.count({enabled:true}).exec();
        const instances_nbr = await Instance.count().exec();
        const tests_nbr = await Test.aggregate([{
            $group: {
                "_id":  "$uuid",
                "count":{"$sum":1}
            }
        }]).exec();
        
        const module_dist = await Module.aggregate([
            {
                $group: {
                    "_id":  "$database.type",
                    "count":{"$sum":1}
                }
            }
        ]).exec(); 

        const test_dist = await Test.aggregate([
            { 
                $lookup:
                {
                  from: "sections",
                  localField: "section_id",
                  foreignField: "_id",
                  as: "section"
                }
            },
            {
                $group: {
                    "_id":  {
                        "uuid":"$uuid",
                        "database":"$section.database_type"
                    },
                    "count":{"$sum":1},
                    "database": {"$first":"$section.database_type"},
                   
                }
            },
            {   $unwind:"$database"  }
        ]).exec(); 
        return res.status(200).json({ instances_nbr,modules_nbr,tests_nbr, module_dist,test_dist});
    } catch (e) {
        return res.status(500).send(e.message);
    }
};