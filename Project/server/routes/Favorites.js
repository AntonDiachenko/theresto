const express = require("express");
const router = express.Router();
const { Favorites } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const mysql = require("mysql2");

router.post("/", validateToken, async (req, res) => {
    const { MenuitemId } = req.body;
    const UserId = req.user.id;
  
    const found = await Favorites.findOne({
      where: { MenuitemId: MenuitemId, UserId: UserId },
    });
    if (!found) {
      await Favorites.create({  MenuitemId: MenuitemId, UserId: UserId });
      
    } 
    else {
      await Favorites.destroy({
        where: {MenuitemId: MenuitemId, UserId: UserId },
      });
    }
  }); 

  
// get users by userid
  const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root2022",
  database: "aproject",
  });


  // router.get("/byuserId", async (req, res) => {
  //   const id = req.user.id;
  //   const user = await Users.findByPk(id);
  //   if (!user) {
  //     res.status(404).json("The user is not found");
  //   } else {
  //     res.status(200).json(user);
  //   }
  // });
  
  router.get("/byUserId", validateToken, async (req, res) => {
    const userid = req.user.id;
    const sqlSelect = "select * from menuitems as m inner join favorites as f on m.id = f.MenuitemId where UserId =  "+userid;
    db.query(sqlSelect, (err, result) => {
      res.json(result);
    });
  });
  

// get users by menuitemid

  router.get("/byMenuId/:id", validateToken, async (req, res) => {
    const menuitemId = req.params.id;
    const userid = req.user.id;
    const found = await Favorites.findOne({
      where: { MenuitemId: menuitemId, UserId: userid }
      
  });
  res.json(found);
})

module.exports = router;
