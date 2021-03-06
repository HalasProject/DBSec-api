"use strict";

import { Response, Request, NextFunction } from "express";
import { Module,ModuleDocument } from "../models/Module";
import { CallbackError, NativeError } from "mongoose";

/**
 * Display information of one module.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const one = (req: Request, res: Response,next: NextFunction) => {
    try {
        const { id } = req.params;
        Module.findById(id, (err: NativeError, module: ModuleDocument) => {
            if (err) { return next(err); }
            if (!module) { return res.status(404).json({"message": "No module was found with the provided id !"}); }
            return res.status(200).json({data: module});
        });
            
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * List all modules;
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
*/
export const all = async (req: Request, res: Response,next: NextFunction) => {
    try {
        
        const query = req.query;
        let querys:any = {};
        if ("database" in query){ 
            querys["database.type"] = query.database;
            querys.enabled = true;
        }
        if ("search" in query){
            querys = [];
            querys.push(
                {title : RegExp(`^${query.search}`,"i")},
                {"database.type": RegExp(`^${query.search}`,"i") },
                {category: RegExp(`^${query.search}`,"i") }
            );
            querys = { $or: querys};
        }

        Module.find(querys, (err, modules:ModuleDocument[]) => {
            if (err) { return next(err); }
            return res.status(200).json({ data: modules });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Create new module.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const create = (req: Request, res: Response,next: NextFunction) => {
    const { data } = req.body;
    try {
        console.log(data);
        Module.create(data, function (err:NativeError, module:ModuleDocument) {
            if (err) { return next(err); }
            return res.status(201).json(module);
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete existing module with id.
 *  @param  {Request} req
  * @param  {Response} res
 */
export const destroy = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        Module.findByIdAndRemove(id,{}, (function(err) {
            if (!err) {
                return res.status(200).json({ message: "Module deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete module",error: err.message });
            }
        }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
  * Update existing module.
  * @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
*/
 export const update = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const { id }  = req.params;
        const { data } = req.body;
        await Module.findByIdAndUpdate(id,{...data},{new: true},function (err, result) {
            if (err) { return next(err); }
            return res.status(200).json(result);
            // else return res.status(400).json({data:result,message: "Cannot update module" });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};
