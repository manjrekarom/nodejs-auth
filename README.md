# nodejs-auth
A nodeJS application focussing mainly on authentication, by using sessions.

The application concentrates on adding authentication and authorization into node apps. 
It also tries to manage the usual login flows such as redirecting users when signed in to home page and taking user to login url when not logged in.


### Important packages:
1. [Express](https://expressjs.com/): To make working with node easier
2. [Body-parser](https://www.npmjs.com/package/body-parser): To work with form-data (login details such as email and password).
3. [Bcryptjs](https://www.npmjs.com/package/bcrypt): To hash passwords.
4. [Connect-mongo](https://www.npmjs.com/package/connect-mongo): To store session data in mongodb. You can also work without it and the data will be stored in RAM.
5. [Mongoose](http://mongoosejs.com/): It's a mongodb ODM basically to help working with mongodb easier.
6. [HBS](http://handlebarsjs.com/): Handlebars view engine. It's a template engine to add data directly into views before sending.
7. [Express-session](https://www.npmjs.com/package/express-session): A session middleware for express applications. For handling all tasks such as setting cookie on client requests, storing session data in selected session store.


### Installation:
1. You'll need mongodb database on your system. After you are done with it's installation follow the rest of the steps.
2. `npm install`
3. `npm start`
4. In your browser, put in the url as `localhost:3000`


The code is very easy to read but also a throw-away one. 
Two files to understand it all. App file contains most of the code and user file defines 
schema, models, some instance and model methods.
