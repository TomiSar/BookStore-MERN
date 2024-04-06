# Fullstack small Book-application React.js application with Node.js, Express.js & MongoDB (MERN)

## API endpoints (Books)

- http://localhost:5000/api/books/:bookId (GET Place byPlaceId)
- http://localhost:5000/api/books/ (GET Places byUserId)
- http://localhost:5000/api/books/ (POST create new Book)
- http://localhost:5000/api/books/:bookId (PATCH update Book byId)
- http://localhost:5000/api/books/:bookId (DELETE Place byId)

## Creating config for MongoDB URI connection string
- mkdir in root directory config 
- inside config create file .env (touch .env)

## .env file add MongoDB connection string with credentials
- MONGO_URI=mongodb+srv://{username}:{password}@{username}.jb7l6.mongodb.net/{database}  

## install dependencies (backend)

- npm i

## Start in (backend) localhost:5000

- npm run start
- npm run dev (nodemon)

## Installation of needed Packages for back-end (npm or yarn)

- npm i dotenv
- npm i morgan
- npm i mongoose
- npm i express
- npm i nodemon
- npm i body-parser
- npm i cors
