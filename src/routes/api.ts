import express from "express";
import * as testController from "../controllers/tests";
import * as sectionController from "../controllers/section";
import * as runnerController from "../controllers/runner";
import * as moduleController from "../controllers/module";

const routes = express.Router();


/*
* * Tests Resource API
* * * * * * * * * * * * * * */

/**
 * GET a list of test grouped by uuid.
 * @route GET /api/test/grouped
 */
routes.get("/test/grouped", testController.groupe);

/**
 * Create a new test.
 * @route POST /api/test
 */
routes.post("/test", testController.create);

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
 * Delete a specific test with id.
 * @route DELETE /api/test/:id
 */
routes.delete("/test/:id", testController.destroy);

/*
* * Module Resource API
* * * * * * * * * * * * * * */

/**
 * List all avaiable module;
 * @route GET /api/modules
 */
 routes.get("/modules", moduleController.all);

 /**
  * Show information of a specific module with id.
  * @route GET /api/module
  */
 routes.get("/module/:id", moduleController.one);
 
 /**
  * Create a new module.
  * @route POST /api/module
  */
 routes.post("/module", moduleController.create);
 
 /**
  * Update a specific module with id.
  * @route PUT /api/module/:id
  */
 routes.put("/module/:id", moduleController.update);
 
 /**
  * Delete a specific module with id.
  * @route DELETE /api/module/:id
  */
 routes.delete("/module/:id", moduleController.destroy);

 
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