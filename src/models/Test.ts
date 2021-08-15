import mongoose from "mongoose";

export type TestDocument = mongoose.Document & {
    uuid: string,
    section_id: string,
    module_id: string,
    resultat: string,
};

const TestSchema = new mongoose.Schema<TestDocument>(
    {
        uuid: String,
        section_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section"
        },
        module_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Module"
        },
        resultat: String,
    },
    { timestamps: true},
);


export const Test = mongoose.model<TestDocument>("Test", TestSchema);
