const request = require("supertest");
const { app } = require("../api/app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const endpointData = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return connection.end();
});

describe("Full API Test Suite", () => {
  describe("/api/topics", () => {
    test("200: /api/topics fetches all topics from the table", () => {
      const { topicData } = testData;
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics.length).toBe(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("/api", () => {
    test("200: /api fetches all api endpoints available to the user", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body).length).toEqual(
            Object.keys(endpointData).length
          );
          Object.keys(endpointData).forEach((key) => {
            expect(body).toHaveProperty(key);
          });
        });
    });
  });
  describe("Error Handling", () => {
    test("404: Route not found when given a bad path", () => {
      return request(app)
        .get("/api/topic")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Route not found");
        });
    });
    test("404: Route not found when given a empty path", () => {
      return request(app)
        .get("")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Route not found");
        });
    });
  });
});
