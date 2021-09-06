import mongoose from "mongoose";

export type TestDocument = mongoose.Document & {
    _id? : string;
    uuid: string,
    instance_id: string,
    module_id: string,
    resultat: string,
    createdAt: Date
};

const TestSchema = new mongoose.Schema<TestDocument>(
    {
        uuid: String,
        instance_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instance",
            index: true
        },
        module_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Module",
            index: true
        },
        resultat: String,
    },
    { timestamps: true},
);


export const Test = mongoose.model<TestDocument>("Test", TestSchema);
