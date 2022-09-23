const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Menuitems } = require("../models");

router.get("/", async (req, res) => {
  const categoryList = await Categories.findAll();
  res.json(categoryList);
});

router.post("/", async (req, res) => {
  const categoryItem = req.body;
  await Categories.create(categoryItem);
  res.json(categoryItem);
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Categories.destroy({
    where: {
      id: id,
    },
  });
  res.json("delete");
});

//   router.get("/byId/:id", async (req, res) => {
//     const id = req.params.id;
//     const catItem = await Categories.findByPk(id);
//     res.json(catItem);
//   });

// const [results, metadata] = await sequelize.query(
//     "SELECT * FROM Menuitems JOIN Categories ON menuitems.CategoryId = categories.id"
//   );

//   console.log(JSON.stringify(results, null, 2));

// const users = await User.findAll({ include: Invoice });
// console.log(JSON.stringify(users, null, 2));

router.get("/menujoin", async (req, res) => {
  const categories = await Categories.findAll({ include: Menuitems });
  res.json(categories);
});

//get nemuitems by categoryid, 1 to many
// router.get("/byId/:menuitemsid", async (req, res) => {
//     const menuitemsid = req.params.categoryid;

//     const menuList = await Menuitems.findAll({
//       where: {
//         CategoryId: categoryid,
//       },
//     });
//     res.json(menuList);
//   });

module.exports = router;
