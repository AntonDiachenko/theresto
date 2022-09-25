const express = require("express");
const router = express.Router();
const { Cartitems } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const cartList = await Cartitems.findAll();
  res.json(cartList);
});

router.post("/", validateToken, async (req, res) => {
  const cartItem = req.body;
  await Cartitems.create(cartItem);
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
