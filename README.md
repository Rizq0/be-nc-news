# Northcoders News API

## Project Summary

This project is an API built to be a backend service for accessing application data programmatically, which will allow information to be provided to the frontend architecture.

Skills used while completing this project have been listed at the bottom of this README.

## Hosted Version

[Hosted Link (Click Me)](https://joe-b-nc-news.onrender.com/api)

Please keep in mind that the instance will spin down with inactivity which can delay requests by a minimum of 50 seconds.

## Environment Variables

Environment variables are not provided within this repository, they will need to be created manually.

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to store environment variables in separate files.

Instructions to create environment variables to connect to the correct database:

At the root of the project, please create two separate files starting with .env and include the text within the brackets within the files created:

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

# About This Project

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).

## Skills Used

- **Key Development Points**

  - JavaScript

    - RESTFUL API design
    - MVC paradigm
    - Robust error handling
    - Reusable utility functions
    - Handing of asynchronous processes

  - PostgreSQL

    - SQL queries
    - Creating and seeding databases
    - Separating testing, development & production databases
    - Using parameterized queries to avoid SQL injection risks
    - dotenv, used to create dynamic access to different databases

  - Hosting
    - Supabase, configuring and hosting the database online
    - Render, configuring and hosting the API online

---

- **Testing**

  - Test Driven Development (TDD)

    - Jest
    - SuperTest

---

- **Source Control**

  - GitHub
    - Branching
