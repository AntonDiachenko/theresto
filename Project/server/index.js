const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser')


app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}))
const db = require("./models");

// Routers
//Users
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
//Menuitems
const menuRouter = require("./routes/Menuitems");
app.use("/menu", menuRouter);
//Categories
const categoriesRouter = require("./routes/Categories");
app.use("/categories", categoriesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
