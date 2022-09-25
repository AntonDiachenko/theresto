const express = require("express");
const router = express.Router();
const { Cartitems } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const cartList = await Cartitems.findAll();
  res.json(cartList);
});

//get cartitems by username, 1 to 1
router.get("/byuserId", validateToken, async (req, res) => {
    const UserId = req.user.id;

  const cartList = await Cartitems.findAll({
    where: {
      UserId: UserId,
    },
  });
  res.json(cartList);
});

router.post("/", validateToken, async (req, res) => {
//   const {quantity} = req.body.quantity;
//   const {itemname} = req.body.itemname;
//   const {price} = req.body.price;
  const userid = req.user.id;
  const cartItem = ({ quantity, itemname, price} = req.body);
  await Cartitems.create({
    quantity: quantity,
    itemname: itemname,
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

//   router.put("/update/:id", validateToken, async (req, res) => {
//     const categoryid = req.params.id;
//     const category = req.body;
//     await Categories.update(
//       {
//         name: category.name,
//       },
//       { where: { id: categoryid } }
//     );
//     res.json(req.body);
//   });

//   router.get("/byId/:id", async (req, res) => {
//     const id = req.params.id;
//     const catItem = await Categories.findByPk(id);
//     res.json(catItem);
//   });

module.exports = router;
