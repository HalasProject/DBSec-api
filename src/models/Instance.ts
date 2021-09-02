import mongoose from "mongoose";

export type InstanceDocument = mongoose.Document & {
    _id? : string;
    name: string;
    database_type: string;                //  postgresql
    server: string;                       //  localhost
    port: number;                         //  5432
    database: string;                     //  template1
    privileged_account: string;           //  postgres
    privileged_account_password :string;  //  halashalas
    application_account: string;          //  apprunuser
    configuration_file: string;           //   /etc/postgresql/13/main/postgresql.conf
    enabled:boolean;
    
    // comparePassword: comparePasswordFunction;
    // gravatar: (size: number) => string;
};

const InstanceSchema = new mongoose.Schema<InstanceDocument>(
    {
        name: String,
        database_type: String,
        server: String,
        port: Number,
        database: String,
        privileged_account: String,
        privileged_account_password: String,
        application_account: String,
        configuration_file: String,
        enabled: { type: Boolean, default: true }
    },
    { timestamps: true}
);


export const Instance = mongoose.model<InstanceDocument>("Instance", InstanceSchema);
