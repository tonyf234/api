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

## <u>workflow</u> :
1. entity
2. (repository)
3. service
4. controller
5. router
6. app

***
Feature ideas:
- admin guard for routes .../users/
- number of users connected in .../users/connected
- see your user profil in .../users/me

***
Project info:
- 1 high vulnerability (faker)
