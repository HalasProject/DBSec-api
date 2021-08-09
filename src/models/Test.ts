import mongoose from "mongoose";

export type TestDocument = mongoose.Document & {
    title: string;
    description?: string;
    
    sql?: string;
    result:{
        good?: string;
        worst?: string;
    }
    enabled: boolean;
    database: {
        type: string;
        version: string;
    };
    read_more?: string;
    
    // comparePassword: comparePasswordFunction;
    // gravatar: (size: number) => string;
};

const TestSchema = new mongoose.Schema<TestDocument>(
    {
        title: String,
        description: String,
        
        sql: String,
        result:{
            good: String,
            worst: String
        },

        enabled: Boolean,
        database: {
            type: String,
            version: String
        }
    },
    { timestamps: true, typeKey: "$type"},
);


export const Test = mongoose.model<TestDocument>("Test", TestSchema);
