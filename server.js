const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

require('./models/user');
require('./models/post');
require('./models/comment');

/*
Question:
Build the API with layered architecture folders:
- config for the database connection
- models for Users, Posts, and Comments
- repositories for the database queries
- services for the business logic
- controllers for the request and response
- routes for the endpoints
*/

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

const PORT = 3000;

sequelize.connectDatabase()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
