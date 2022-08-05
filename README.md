# Online clothing store mockup


https://user-images.githubusercontent.com/72722478/183127136-93a5f5e9-47e9-4fd1-b53d-3ced5d95ab97.mp4


# Description 

> This is small project that i did while studying front-end technologies. So far, this is only a store layout without a payment system and an admin panel, but almost all the necessary endpoints for creating/editing/deleting new products are available if the user has a valid jwt token and his role is admin.

# Tech stack

> **Backend**
- NestJS - (express enviroment / express multer for distribution static files)
- SequelizeORM - (w/o migrations, because fast development was preffered)
- PostgreSQL 
- Docker
- Swagger - OpenApi

> **Front-end**
- React - (Split code on chunks with React.lazy / study of optimization methods, such as useMemo, React.memo, React.Callback) 
- RTK

# Deploying

> **distribution static files, implemented using express multer, all static files will be stored in the dist folder, not completed description of endpoints available on http://localhost:3001/swagger-doc**
- Move to server folder, then =>
- Create wear_db.env file, with constants for connection to database, then enter the following command: *docker-compose up --build -d*
- Move to client folder, then => 
- Enter the follwing command: *yarn && yarn start*




