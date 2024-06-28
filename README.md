# Doowit

Doowit is a personal task management app used to store, organize and prioritize your tasks.

Visit here: https://doowit.lcslicp.dev/

### Tech Stack

- Frontend: React, Vite, Tailwind, Flowbite
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
- multer

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
2. [Flowbite](https://flowbite.com/docs/getting-started/introduction/)
3. [Node.js](https://nodejs.org/en/docs/)
4. [bycrypt](https://www.npmjs.com/package/bcrypt)
5. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
6. [jwt-decode](https://www.npmjs.com/package/jwt-decode)
7. [JWT](https://jwt.io/)
8. [Multer](https://www.npmjs.com/package/multer)
9. [MongoDB] (https://www.mongodb.com/docs/)
