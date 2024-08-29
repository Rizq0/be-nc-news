const { checkExists } = require("../api/utility-functions/api-utils");

describe("API Utility Function Testing", () => {
  describe("checkExists Function Testing", () => {
    test("When given a correct table name, column name and value that exists in that table, return a confirmation", () => {
      return checkExists("articles", "article_id", 1).then((data) => {
        expect(data).toBe("Exists within the database");
      });
    });
  });
});

// more tests to be added
