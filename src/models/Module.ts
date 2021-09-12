import mongoose from "mongoose";

export type ModuleDocument = mongoose.Document & {
    _id? : string;
    title: string;
    description?: string;
    
    sql?: string;
    result:{
        good?: string;
        worst?: string;
    }
    enabled: boolean;
    category: string,
    database: {
        type: string;
        version: string;
    };
    readMore?: string;
    
    // comparePassword: comparePasswordFunction;
    // gravatar: (size: number) => string;
};

const ModuleSchema = new mongoose.Schema<ModuleDocument>(
    {
        title: String,
        description: String,
        
        sql: String,
        result:{
            good: String,
            worst: String
        },
        category: String,
        enabled: Boolean,
        database: {
            type: String,
            version: String
        },
        readMore: String
    },
    { timestamps: true, typeKey: "$type"},
);


export const Module = mongoose.model<ModuleDocument>("Module", ModuleSchema);
