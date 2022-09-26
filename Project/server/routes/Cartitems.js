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
    router.get("/byUserId", validateToken, async (req, res) => {
        const UserId = req.user.id;
        const sqlSelect = "select * from menuitems as m inner join Cartitems as c on m.id = c.MenuitemId where UserId =  "+UserId;
        db.query(sqlSelect, (err, result) => {
          res.json(result);
        });
      });

      //get cartitems by username and menuitemid, 1 to 1
    router.get("/byUidMid/:menuitemid", validateToken, async (req, res) => {
      const UserId = req.user.id;
      const menuitemid = req.params.menuitemid;
      const sqlSelect = "select quantity  from Cartitems where UserId =  "+UserId +"MenuitemId ="+menuitemid;
      db.query(sqlSelect, (err, result) => {
        res.json(result);
      });
    });

    router.put("/update", validateToken,async (req, res) => {
      const menuitemid = req.body.id;
      const quantity = req.body.quantity+1;
      const sqlSelect = "update cartitems set quantity ="+ quantity + "where MenuitemId ="+menuitemid;
      db.query(sqlSelect, (err, result) => {
        res.json(result);
      });
 
    });

router.post("/", validateToken, async (req, res) => {
    //   const {quantity} = req.body.quantity;
     
    //   const {price} = req.body.price;
      const userid = req.user.id;
      const cartItem = ({ quantity, MenuitemId, price} = req.body);
      await Cartitems.create({
        quantity: quantity,
        MenuitemId: MenuitemId,
        price: price,
        UserId:userid
      })
       
      res.json(cartItem);
    });

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Cartitems.destroy({
    where: {
      id: id,
    },
  });
  res.json("delete");
});


module.exports = router;
