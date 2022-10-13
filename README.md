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
    - / (GET) : get all users
        - admin required
    - /connected (GET) : get number of user connected
    - /me (GET) : get user personal info
        - authentication required
- /auth
  - /signup (POST)
    - fields required: firsname, lastname, email and/or phone, password
    - addictional fields: birthdate, pref ('phone'|'email')
  - /signin (POST)
    - fields required: email or phone, password
  - /signout (POST)
    - authentication required
  - /test (GET) : test page to test guard
    - authentication required
- /reports
  - / (GET) : get all reports
    - admin required
  - /me (GET) : get user reports
    - authentication required
  - /send (POST)
    - required fields : type ('nature'| 'obstacle'| 'infrastructure'| 'dumping'| 'association')
    - authentication required

## Dependency graph
run this command to generate the .svg file `npm run dependency`
(required `depcruise` and `dot` commands)
![api dependency graph](dependencygraph.svg)


## <u>workflow</u> :
1. entity
2. (repository)
3. service
4. controller
5. router
6. app

***
Feature ideas:
...

***
Project info:
- 1 high vulnerability (faker)



