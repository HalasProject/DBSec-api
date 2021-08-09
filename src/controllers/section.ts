"use strict";

import { Response, Request, NextFunction } from "express";
import { Section,SectionDocument } from "../models/Section";
import { CallbackError, NativeError } from "mongoose";


/**
 * Display information of one section.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const one = (req: Request, res: Response,next: NextFunction) => {
    try {
        const id = req.params.id;
        Section.findById(id, (err: NativeError, section: SectionDocument) => {
            if (err) { return next(err); }
            return res.status(200).json({data: section});
        });
            
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * List all sections;
 * @param  {Request} req
 * @param  {Response} res
*/
export const all = async (req: Request, res: Response,next: NextFunction)  => {
    try {
        Section.find({}, (err, sections:SectionDocument[]) => {
            if (err) { return next(err); }
            return res.status(200).json({ data: sections });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Create new section.
 *  @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
 */
export const create = (req: Request, res: Response,next: NextFunction) => {
    const { data } = req.body;
    try {
        console.log(data);
        Section.create(data, function (err:NativeError, section:SectionDocument) {
            if (err) { return next(err); }
            return res.status(200).json({data: section.toJSON()});
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
 * Delete existing section with id.
 *  @param  {Request} req
  * @param  {Response} res
 */
export const destroy = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        Section.remove({ _id: id },(function(err) {
            if (!err) {
                return res.status(200).json({ message: "Section deleted successfully" });
            } else {
                return res.status(400).json({ message: "Cannot delete section",error: err.message });
            }
        }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

/**
  * Update existing section.
  * @param  {Request} req
  * @param  {Response} res
  * @param  {NextFunction} next
*/
 export const update = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const id  = req.params.id;
        const { data } = req.body;
        await Section.updateOne({_id:id},{...data},null,function (err, result) {
            if (err) { return next(err); }
            if (result.nModified === 1) return res.status(200).json({data:result,message: "Section updated successfully" });
            else return res.status(400).json({data:result,message: "Cannot update section" });
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};
