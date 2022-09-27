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
  password: "root2022root2022",
  database: "aproject",
  });

  
  router.get("/byUserId", validateToken, async (req, res) => {
    const userid = req.user.id;
    const sqlSelect = "select f.MenuitemId, m.itemname, m.description, m.price, m.photoURL, m.CategoryID, c.id IS NOT NULL isCart from favorites as f left join menuitems as m on f.MenuitemId = m.id LEFT JOIN cartitems as c on f.MenuitemId = c.MenuitemId where f.UserId= " +userid;
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
