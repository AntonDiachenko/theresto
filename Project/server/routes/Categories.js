const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",  async (req, res) => {
  const categoryList = await Categories.findAll();
  res.json(categoryList);
});

router.post("/", async (req, res) => {
  const categoryItem = req.body;
  await Categories.create(categoryItem);
  res.json(categoryItem);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Categories.destroy({
    where: {
      id: id,
    },
  });
  res.json("delete");
});

router.put("/update/:id", validateToken, async (req, res) => {
  const categoryid = req.params.id;
  const category = req.body;
  await Categories.update(
    {
      name: category.name,
    },
    { where: { id: categoryid } }
  );
  res.json(req.body);
});

module.exports = router;
