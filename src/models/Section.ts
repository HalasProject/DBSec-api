import mongoose from "mongoose";

export type SectionDocument = mongoose.Document & {
    database_type: string;                //  postgresql
    server: string;                       //  localhost
    port: number;                         //  5432
    database: string;                     //  template1
    privileged_account: string;           //  postgres
    privileged_account_password :string;  //  halashalas
    application_account: string;          //  apprunuser
    configuration_file: string;           //   /etc/postgresql/13/main/postgresql.conf
    
    // comparePassword: comparePasswordFunction;
    // gravatar: (size: number) => string;
};

const SectionSchema = new mongoose.Schema<SectionDocument>(
    {
        database_type: String,
        server: String,
        port: Number,
        database: String,
        privileged_account: String,
        privileged_account_password: String,
        application_account: String,
        configuration_file: String
    }
);


export const Section = mongoose.model<SectionDocument>("Section", SectionSchema);
