import request from "supertest";
import app from "../src/app";

describe("GET /api/instances", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/instances")
            .expect(200);
    });
});

describe("GET /api/tests", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/tests")
            .expect(200);
    });
});


describe("GET /api/modules", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/modules")
            .expect(200);
    });
});
