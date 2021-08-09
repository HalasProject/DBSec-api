import express from "express";
import * as testController from "../controllers/tests";
import * as sectionController from "../controllers/section";
import * as runnerController from "../controllers/runner";
const routes = express.Router();



/*
* * Tests Resource API
* * * * * * * * * * * * * * */

/**
 * List all avaiable test;
 * @route GET /api/tests
 */
routes.get("/tests", testController.all);

/**
 * Show information of a specific test with id.
 * @route GET /api/test
 */
routes.get("/test/:id", testController.one);

/**
 * Create a new test.
 * @route POST /api/test
 */
routes.post("/test", testController.create);

/**
 * Update a specific test with id.
 * @route PUT /api/test/:id
 */
routes.put("/test/:id", testController.update);

/**
 * Delete a specific test with id.
 * @route DELETE /api/test/:id
 */
routes.delete("/test/:id", testController.destroy);

/*
* * Section Resource API
* * * * * * * * * * * * * * */

/* *
  * List all avaiable section;
  * @route GET /api/sections
  */
routes.get("/sections", sectionController.all);

 /**
  * Show information of a specific section with id.
  * @route GET /api/section
  */
routes.get("/section/:id", sectionController.one);
 
/**
  * Create a new section.
  * @route POST /api/section
  */
routes.post("/section", sectionController.create);
 
/**
  * Update a specific section with id.
  * @route PUT /api/section/:id
  */
routes.put("/section/:id", sectionController.update);
 
/**
  * Delete a specific section with id.
  * @route DELETE /api/section/:id
  */
routes.delete("/section/:id", sectionController.destroy);

/*
* * Runner API
* * * * * * * * * * * * * * */

routes.post("/runner", runnerController.run);
export default routes;