const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser')


app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}))
const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const menuRouter = require("./routes/Menuitems");
app.use("/menu", menuRouter);

const categoryRouter = require("./routes/Categories");
app.use("/category", categoryRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});


