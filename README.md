# Doowit

Doowit is a personal task management app used to store, organize and prioritize your tasks.

Visit here: https://doowit.lcslicp.xyz/

### Tech Stack

- Frontend: Typescript, React, Vite, Redux, Tailwind, Flowbite
- Backend: Node.js, Express, MongoDB 

### Dependencies

The following dependencies are required to run this project:

- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- jwt-decode
- mongoose
- morgan
- axios
- react
- react-redux
- react-router-dom
- vite
- typescript

To install all the required dependencies, you can run the following command:

```
npm install
```

Check the `package.json` file and make sure the scripts are configured correctly.

### ENV variables

Create an `.env` file in the root directory and populate these variables:

1. DB_HOST
2. PORT
3. DB_NAME
4. ACCESS_TOKEN_SECRET
5. REFRESH_TOKEN_SECRET

Copy & paste the connection string from MongoDB as your value for `DB_HOST`. Make sure to update the `<password>` in the connection string.

```
DB_HOST=sampleconnectionstring
```

### Resources

1. [React docs](https://beta.reactjs.org/)
2. [Typescript](https://www.typescriptlang.org/docs/)
3. [Redux](https://redux.js.org/introduction/getting-started)
4. [Flowbite](https://flowbite.com/docs/getting-started/introduction/)
5. [Node.js](https://nodejs.org/en/docs/)
6. [bycrypt](https://www.npmjs.com/package/bcrypt)
7. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
8. [jwt-decode](https://www.npmjs.com/package/jwt-decode)
9. [JWT](https://jwt.io/)
10. [MongoDB](https://www.mongodb.com/docs/)
