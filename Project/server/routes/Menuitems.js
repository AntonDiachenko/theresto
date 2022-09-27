const express = require("express");
const router = express.Router();
const { Menuitems } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root2022root2022",
  database: "aproject",
});
//get all menuitems by categoryid, 1 to many, add isfav and iscart
  router.get("/mandf", validateToken,   async (req, res) => {
    const userid = req.user.id;
    const sqlSelect = "SELECT m.id,m.itemname,m.description,m.price,m.photoURL, m.CategoryId,f.id IS NOT NULL isFav, c.id IS NOT NULL isCart from menuitems as m  LEFT JOIN favorites as f ON m.id = f.MenuItemId and f.UserId="+ userid+" LEFT JOIN cartitems as c on m.id = c.MenuItemId and c.UserId= " +userid;
    db.query(sqlSelect, (err, result) => {
      res.json(result);
    });
    });
//get menuitems by categoryid, 1 to many, add isfav and iscart
  router.get("/mandf/:categoryid", validateToken,   async (req, res) => {
    const categoryid = req.params.categoryid;
    const userid = req.user.id;
    const sqlSelect = "SELECT m.id,m.itemname,m.description,m.price,m.photoURL, m.CategoryId,f.id IS NOT NULL isFav, c.id IS NOT NULL isCart from menuitems as m  LEFT JOIN favorites as f ON m.id = f.MenuItemId and f.UserId= "+ userid+" LEFT JOIN cartitems as c on m.id = c.MenuItemId and c.UserId= " +userid +" where CategoryId = "+categoryid;
    db.query(sqlSelect, (err, result) => {
      res.json(result);
    });
    });
  

//get all
router.get("/",  async (req, res) => {
  const menuList = await Menuitems.findAll();
  res.json(menuList);
});

//get menuitems by categoryid, 1 to many
router.get("/byId/:categoryid",   async (req, res) => {
  const categoryid = req.params.categoryid;

  const menuList = await Menuitems.findAll({
    where: {
      CategoryId: categoryid,
    },
  });
  res.json(menuList);
});
//get menuitems by menu id, 1 to 1
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  const menuList = await Menuitems.findOne({
    where: {
      id: id,
    },
  });
  res.json(menuList);
});

router.post("/", async (req, res) => {
  const menuItem = req.body;
  await Menuitems.create(menuItem);
  res.json(menuItem);
});

router.delete("/delete/:id", async (req, res) => {
  const menuItem = req.params.id;
  await Menuitems.destroy({
    where: {
      id: menuItem,
    },
  });
  res.json("delete");
});

router.put("/update/:id", validateToken, async (req, res) => {
  const menuid = req.params.id;
  const item = req.body;
  await Menuitems.update(
    {
      itemname: item.newitemname,
      description: item.newdescription,
      price: item.newprice,
      photoURL: item.newphotoURL,
    },
    { where: { id: menuid } }
  );
  res.json(req.body);
});
module.exports = router;
