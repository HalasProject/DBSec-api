"use strict";

import { Response, Request, NextFunction } from "express";
import { Instance,InstanceDocument } from "../models/Instance";
import { CallbackError, NativeError } from "mongoose";

/**
 * Display information of one instance.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const one = (req: Request, res: Response,next: NextFunction) => {
    try {
        const { id } = req.params;
        Instance.findById(id, (err: NativeError, instance: InstanceDocument) => {
            if (err) { return next(err); }
            return res.status(200).json(instance);
        });
            
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * List all instances with search query;
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
*/
export const all = async (req: Request, res: Response,next: NextFunction)  => {
    const { query } = req;
    try {
        let querys:any = {};
        if ("search" in query){
            querys = [];
            querys.push(
                {name : RegExp(`^${query.search}`,"i")},
                {database_type: RegExp(`^${query.search}`,"i") }
            );
            querys = { $or: querys};
        }
        Instance.find(querys).sort({"createdAt":-1}).exec(function(err, instances:InstanceDocument[]){
            if (err) { return next(err); }
            return res.status(200).json({ data: instances });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Create new instance.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const create = (req: Request, res: Response,next: NextFunction) => {
    const { data } = req.body;
    try {
        Instance.create(data, function (err:NativeError, instance:InstanceDocument) {
            if (err) { return next(err); }
            return res.status(201).json(instance);
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete existing instance with id.
 *  @param  {Request} req
  * @param  {Response} res
 */
export const destroy = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        Instance.findByIdAndRemove(id,{}, function(err) {
            if (!err) {
                return res.status(200).json({ message: "Instance deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete instance",error: err.message });
            }
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
  * Update existing instance.
  * @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
*/
 export const update = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const { id }  = req.params;
        const { data } = req.body;
        await Instance.findByIdAndUpdate(id,{...data},{new: true},function (err, result) {
            if (err) { return next(err); }
            return res.status(200).json(result);
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};
