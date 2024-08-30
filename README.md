# Northcoders News API

## Project Summary

This project is an API build for the purpose of being a back end service for the accessing of application data programmatically, which will allow information to be provided to the front end architecture.

## Hosted Version

[Hosted Link (Click Me)](https://joe-b-nc-news.onrender.com)

Please keep in mind that the instance will spin down with inactivity which can delay requests by a minimum of 50 seconds.

## Environment Variables

Environment variables are not provided within this repositiory, they will need to be created manually.

This project uses [dotenv](https://www.npmjs.com/package/dotenv) which allows the storage of environment variables in seperate files.

Instructions to create environment variables to connect to the correct database:

At the root of the project, please create two seperate files starting with .env and include the text within the brackets within the files created:

.env.test

(PGDATABASE=nc_news_test)

.env.development

(PGDATABASE=nc_news)

## Using the API

The following will need to be installed on your system before you are able to use this API:

- Node.js - 22.3.0 or higher
- NPM - 10.8.1 or higher
- PostgreSQL - 16.4 or higher

Once the above have been installed, please follow these instructions below:

1. **Install dependencies**

   **npm install** will install the needed dependencies to use this project.

2. **Create the environment variables**

   Follow the instructions above to manually create environment variables. This will allow you to interact with the testing database.

3. **Creating and seeding the databases**

   Use the following command to create the databases: **npm run setup-dbs**

   Use the following command to seed the database: **npm run seed**

4. **Testing**

   You can run a test file by using **npm test < file path >**

## Dependencies Minimum Versions

**Dependencies:**

- dotenv: - 16.0.0

- express: - 4.19.2

- pg: - 8.7.3

- pg-format: - 1.0.4

**DevDependencies:**

- jest: - 8.0.2

- jest-extended: - 2.0.0

- jest-sorted: - 1.0.15

- supertest: - 7.0.0

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
