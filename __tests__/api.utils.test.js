const { checkExists } = require("../api/utility-functions/api-utils");

describe("API Utility Function Testing", () => {
  describe("checkExists Function Testing", () => {
    test("When given a correct table name, column name and value that exists in that table, return a confirmation", () => {
      return checkExists("articles", "article_id", 1).then((data) => {
        expect(data).toBe("Exists within the database");
      });
    });
    test("When given a correct table name, column name and incorrect value, return a rejected promise within the catch block", () => {
      return checkExists("articles", "article_id", 1000)
        .then((data) => {})
        .catch((err) => {
          expect(err).toEqual(
            expect.objectContaining({
              status: 404,
              msg: "Not found",
            })
          );
        });
    });
    test("When given either an incorrect table name or column name, return a psql error within the catch block", () => {
      return checkExists("articlal", "article_id", 1)
        .then((data) => {})
        .catch((err) => {
          expect(err.code).toBe("42P01");
        });
    });
  });
});

// more tests to be added
