## What has changed to "nest new <project-name>"

- Removed `app.controller` and `app.service`
- Create a new resource with `nest g resource <resource-name>`

### Added Dependencies

- @nestjs/config <!-- Configurations Module for Global variables -->
- @nestjs/platform-fastify <!-- Fastify module for higher performance -->

- class-validator <!-- Validation Module for request input validation -->
- class-transformer <!-- Transform Module for request input transformation -->

- @nestjs/passport
- passport

- @nestjs/jwt
- passport-jwt
- -D @types/passport-jwt

- -D prisma `npx prisma init`
- @prisma/client
- dotenv-cli `dotenv -e .env.<name> --`

- argon2 <!-- Password hashing module -->

### Changed Configuration

- Changed the `nest new <project-name>` command to `nest new <project-name> --template=<template-name>`
- Updated the `.prettierrc` file to use more consistent indentation
- Updated the `main.ts` file to use `@nestjs/platform-fastify` instead of `@nestjs/platform-express`
