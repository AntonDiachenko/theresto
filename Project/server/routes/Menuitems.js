const express = require("express");
const router = express.Router();
const { Menuitems } = require("../models");

// Get all Menu
router.get("/", async (req, res) => {
  const menuList = await Menuitems.findAll();
  if (!menuList) {
    res.json("There are no menus listed");
  } else {
    res.status(200).json(menuList);
  }
});

// Get Menu by ID
router.get("/byId/:id([0-9]+)", async (req, res) => {
  const id = req.params.id;
  const menuItem = await Menuitems.findByPk(id);
  if (!menuItem) {
    res.status(404).json("The menuItem is not found");
  } else {
    res.status(200).json(menuItem);
  }
});

// POST a new Menu
router.post("/", async (req, res) => {
  const menuItem = req.body;
  await Menuitems.create(menuItem);
  res.json(menuItem);
});

// UPDATE --> EDIT
// router.put("/update/:id([0-9]+)", async (req, res) => {
//     const menuid = req.params.id;
//     const menu = req.body;
//     await Menu.update(
//       {
//         description: menu.description,
//         price: menu.price,

//         photoURL: menu.photoURL,
//
//       },
//       { where: { id: menuid } }
//     );
//     res.json(req.body);
//   });

//DELETE
// router.delete("/delete/:id", async (req, res) => {
//     const menuid = req.params.id;
//     await Menu.destroy({
//       where: {
//         id: menuid,
//       },
//     });
//     res.json("delete");
//   });

module.exports = router;
