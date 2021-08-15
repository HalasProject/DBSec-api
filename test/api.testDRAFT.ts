import request from "supertest";
import app from "../src/app";

describe("GET /api/sections", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/sections")
            .expect(200);
    });
});

describe("GET /api/tests", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/sections")
            .expect(200);
    });
});


describe("GET /api/modules", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/sections")
            .expect(200);
    });
});
