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
            return res.status(200).json(section);
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
        Section.create(data, function (err:NativeError, section:SectionDocument) {
            if (err) { return next(err); }
            return res.status(200).json(section);
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
        await Section.findOneAndUpdate({_id:id},{...data},{new: true},function (err, result) {
            if (err) { return next(err); }
            return res.status(200).json(result);
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
};
