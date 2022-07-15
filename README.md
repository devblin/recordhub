# Recordhub

A small web-application built using TypeScript, NestJS for backend and HTML, CSS for frontend with SQLite database along with Github authorization to register an account and create a repository in authorized user's github account.

## Tech-Stack
* NestJS
* TypeScript
* HTML, CSS
* SQLite

## Usage:

#### **Applcation Live At:** https://recordhub.herokuapp.com

1. Authroize Github to proceed.
![](https://i.imgur.com/TCxKnyS.png)

2. Enter repository name to create in your github account.
![](https://i.imgur.com/sivJmce.png)

## Setup
* Make sure you have nodejs installed in your local system. ([install nodejs](https://nodejs.org/en/download/))
* Verify nodejs installation by executing `node -v` and you see output similar to:
 `v16.14.0`
* In root of the project directory run:
    * To setup frontend:
    `npm run setup:client`

    * To setup backend:
    `npm run setup:server`
    
- Copy contents of `.env.example` to `.env` file in the project root and update the required ENV values as required.
    ```
    FRONTEND_BASE_URL=http://localhost:5500
    BACKEND_PORT=3000
    DATABASE_STORAGE_PATH=recordhub.db

    JWT_SECRET=
    JWT_EXPIRATION_TIME_SECONDS=86400

    GITHUB_OAUTH_CLIENT_ID=
    GITHUB_OAUTH_CLIENT_SECRET=
    GITHUB_OAUTH_CALLBACK_URL=http://localhost:3000/auth/github/callback
    ```
- Execute `npm run start:server:dev` to start backend in dev mode and visit `http://localhost:BACKEND_PORT` to check the running server.
- Execute `npm run start:client:dev` to start frontend in dev mode and visit `http://localhost:5500` to check the application.
