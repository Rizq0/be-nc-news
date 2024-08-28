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
  describe("GET /api/topics", () => {
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
  describe("GET /api", () => {
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
  describe("GET /api/articles/:article_id", () => {
    test("200: /api/articles/:article_id fetches the article with the requested id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article.length).toBe(1);
          expect(article[0]).toHaveProperty("author");
          expect(article[0]).toHaveProperty("title");
          expect(article[0]).toHaveProperty("article_id");
          expect(article[0]).toHaveProperty("body");
          expect(article[0]).toHaveProperty("topic");
          expect(article[0]).toHaveProperty("created_at");
          expect(article[0]).toHaveProperty("votes");
          expect(article[0]).toHaveProperty("article_img_url");
        });
    });
    test("400: Returns an error if given a article_id of the wrong data type", () => {
      return request(app)
        .get("/api/articles/nonexist")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("404: Returns an error if given an article_id that is out of range", () => {
      return request(app)
        .get("/api/articles/20")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
        });
    });
  });
  describe("GET /api/articles", () => {
    test("200 /api/articles returns array of all the articles in descending data order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).toBe(13);
          articles.forEach((article) => {
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
            expect(article).toHaveProperty("comment_count");
          });
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    test("200: /api/articles/:article_id/comments returns all comments on an article", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments.length).toBe(2);
          comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("body");
            expect(comment).toHaveProperty("article_id");
          });
        });
    });
    test("200: /api/articles/5/comments to be sorted by created_at ascending order", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toBeSortedBy("created_at", { descending: false });
        });
    });
    test("200 /api/articles/2/comments returns an empty array rather than error when given an article_id that exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toEqual([]);
        });
    });
    test("400: /api/articles/idonotexist/comments returns an error when given an id that is the wrong data type", () => {
      return request(app)
        .get("/api/articles/idonotexist/comments")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("404: /api/articles/15/comments returns an error when given an id that does not exist within articles", () => {
      return request(app)
        .get("/api/articles/15/comments")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
        });
    });
  });
  describe("GET /api/users", () => {
    test("200: /api/users returns an array of all users with the correct properties", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    test("201: /api/articles/2/comments returns the newly posted comment", () => {
      const body = {
        username: "lurker",
        body: "Born from fire",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(body)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment[0]).toMatchObject({
            comment_id: expect.any(Number),
            body: "Born from fire",
            article_id: 2,
            author: "lurker",
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
    test("400: /api/articles/2/comments return a 400 error when a request body key is incorrect", () => {
      const body = {
        usernamekeyincorrect: "lurker",
        body: "Born from fire",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(body)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("404: /api/articles/15/comments return a 404 error when an article does not exist", () => {
      const body = {
        username: "lurker",
        body: "Born from fire",
      };
      return request(app)
        .post("/api/articles/15/comments")
        .send(body)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
        });
    });
    test("404: /api/articles/2/comments return a 404 error when a user does not exist", () => {
      const body = {
        username: "joe",
        body: "Born from fire",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(body)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
        });
    });
    test("400: /api/articles/idonotexist/comments return a 400 error when an article id given is the wrong data type", () => {
      const body = {
        username: "lurker",
        body: "Born from fire",
      };
      return request(app)
        .post("/api/articles/idonotexist/comments")
        .send(body)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("200: /api/articles/2 returns the full updated article that has been patched when adding votes", () => {
      const body = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/2")
        .send(body)
        .expect(200)
        .then(({ body: { update } }) => {
          expect(update[0]).toEqual(
            expect.objectContaining({
              article_id: 2,
              title: "Sony Vaio; or, The Laptop",
              topic: "mitch",
              author: "icellusedkars",
              body: expect.any(String),
              created_at: expect.any(String),
              votes: 1,
              article_img_url: expect.any(String),
            })
          );
        });
    });
    test("200: /api/articles/1 returns the full updated article that has been patched when removing votes", () => {
      const body = { inc_votes: -99 };
      return request(app)
        .patch("/api/articles/1")
        .send(body)
        .expect(200)
        .then(({ body: { update } }) => {
          expect(update[0]).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: expect.any(String),
              created_at: expect.any(String),
              votes: 1,
              article_img_url: expect.any(String),
            })
          );
        });
    });
    test("400: /api/articles/2 returns an error if the body key that holds the votes value is incorrect", () => {
      const body = { inc_votez: 1 };
      return request(app)
        .patch("/api/articles/2")
        .send(body)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("400 /api/articles/2 returns an error if the body votes value is the wrong data type", () => {
      const body = { inc_votes: "Wrong Data Type" };
      return request(app)
        .patch("/api/articles/2")
        .send(body)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("400 /api/articles/idonotexist returns an error when given an article id is the wrong data type", () => {
      const body = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/idonotexist")
        .send(body)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("404 /api/articles/15 returns an error when then given article id does not exist in the database", () => {
      const body = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/15")
        .send(body)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("204: /api/comments/1 returns no content, with the correct status code", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).toBeEmpty();
          return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments.length).toBe(1);
            });
        });
    });
    test("400: /api/comments/wrongdatatype returns an error when trying to delete when using wrong data type of comment id", () => {
      return request(app)
        .delete("/api/comments/wrongdatatype")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("404: /api/comments/100 returns an error if the comment does not exist within the database", () => {
      return request(app)
        .delete("/api/comments/100")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found");
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
