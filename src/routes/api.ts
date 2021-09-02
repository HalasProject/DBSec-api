import express from "express";
import * as testController from "../controllers/tests";
import * as instanceController from "../controllers/instance";
import * as runnerController from "../controllers/runner";
import * as moduleController from "../controllers/module";
import * as dashboardController from "../controllers/dashboard";

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

/**
 * Delete many test with uuid.
 * @route DELETE /api/tests/:uuid
 */
routes.delete("/tests/:uuid", testController.destroyMany);


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
* * Instance Resource API
* * * * * * * * * * * * * * */

/* *
  * List all avaiable instance;
  * @route GET /api/instances
  */
routes.get("/instances", instanceController.all);

 /**
  * Show information of a specific instance with id.
  * @route GET /api/instance
  */
routes.get("/instance/:id", instanceController.one);
 
/**
  * Create a new instance.
  * @route POST /api/instance
  */
routes.post("/instance", instanceController.create);
 
/**
  * Update a specific instance with id.
  * @route PUT /api/instance/:id
  */
routes.put("/instance/:id", instanceController.update);
 
/**
  * Delete a specific instance with id.
  * @route DELETE /api/instance/:id
  */
routes.delete("/instance/:id", instanceController.destroy);

/*
* * Runner API
* * * * * * * * * * * * * * */

routes.post("/runner", runnerController.run);

/*
* * Dashboard API
* * * * * * * * * * * * * * */

routes.get("/statistique",dashboardController.statistique);
export default routes;