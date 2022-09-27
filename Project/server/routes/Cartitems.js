const express = require("express");
const router = express.Router();
const { Cartitems } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const mysql = require("mysql2");

router.get("/", validateToken, async (req, res) => {
  const cartList = await Cartitems.findAll();
  res.json(cartList);
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root2022",
  database: "aproject",
});
//get cartitems by username, 1 to many
router.get("/byuserId", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const sqlSelect =
    "select * from menuitems as m inner join Cartitems as c on m.id = c.MenuitemId where UserId =  " +
    UserId;
  db.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});

//get cartitems by username and menuitemid, 1 to 1
router.get("/byUidMid/:menuitemid", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const menuitemid = req.params.menuitemid;
  const sqlSelect =
    "select quantity  from Cartitems where UserId =  " +
    UserId +
    "MenuitemId =" +
    menuitemid;
  db.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});

router.put("/update", validateToken, async (req, res) => {
  const menuitemid = req.body.MenuitemId;
  const quantity = req.body.quantity;
  const sqlSelect =
    "update cartitems set quantity = " +
    quantity +
    " where MenuitemId = " +
    menuitemid;
  db.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});

router.post("/", validateToken, async (req, res) => {
  const userid = req.user.id;
  const { quantity, MenuitemId, price } = req.body;
  const found = await Cartitems.findOne({
    where: { MenuitemId: MenuitemId, UserId: userid },
  });
  if (!found) {
    await Cartitems.create({
      quantity: quantity,
      MenuitemId: MenuitemId,
      price: price,
      UserId: userid,
    });
  } else {
    await Cartitems.destroy({
      where: { MenuitemId: MenuitemId, UserId: userid },
    });
  }
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const MenuitemId = req.params.id;
  await Cartitems.destroy({
    where: {
      MenuitemId: MenuitemId,
    },
  });
  res.json("delete");
});

router.delete("/delete", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const sqlSelect = "delete from cartitems where UserId =  " + UserId;
  db.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
