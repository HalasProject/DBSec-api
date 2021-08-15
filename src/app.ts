import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import * as contactController from "./controllers/contact";

import apiRoutes from "./routes/api";

// Create Express server
const app = express();
// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
    
// Express configuration
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: {
            autoReconnect: true
        }
    })
}));

app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);

/**
 * API examples routes.
 */
app.use("/api", apiRoutes);

export default app;
