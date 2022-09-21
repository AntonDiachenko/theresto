const express = require("express");
const router = express.Router();
const { Categories } = require("../models");

// Get all Categories
router.get("/", async (req, res) => {
  const catList = await Categories.findAll();
  if (!catList) {
    res.json("There are no categories listed");
  } else {
    res.status(200).json(catList);
  }
});

// Get Category by ID
router.get("/byId/:id([0-9]+)", async (req, res) => {
  const id = req.params.id;
  const catItem = await Categories.findByPk(id);
  if (!catItem) {
    res.status(404).json("The category item is not found");
  } else {
    res.status(200).json(catItem);
  }
});

// POST a new Category
router.post("/", async (req, res) => {
  const catItem = req.body;
  await Categories.create(catItem);
  res.json(catItem);
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
router.delete("/delete/:id", async (req, res) => {
  const catid = req.params.id;
  await Categories.destroy({
    where: {
      id: catid,
    },
  });
  res.json("category deleted");
});

module.exports = router;
