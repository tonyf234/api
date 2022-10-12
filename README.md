# API
download npm packages:
`npm install`

copy the '.env.sample' file to '.env' before running any script
`cp .env.sample .env`

run development:
`npm run start:dev`

run test:
`npm run start:test`

## <u>Endpoints</u> :
- /users
    - GET / : get all users
- /auth
  - POST /signup
  - POST /signin
  - POST /signout
  - GET /test : test page to test guard

## <u>workflow</u> :
1. entity
2. (repository)
3. service
4. controller
5. router
6. app

***
Project info:
- 1 high vulnerability (faker)
