const express = require("express");
const router = express.Router();
const { Menuitems } = require("../models");

router.get("/", async (req, res) => {
  const menuList = await Menuitems.findAll();
  res.json(menuList);
});
//get nemuitems by categoryid, 1 to many
router.get("/byId/:categoryid", async (req, res) => {
  const categoryid = req.params.categoryid;

  const menuList = await Menuitems.findAll({
    where: {
      CategoryId: categoryid,
    },
  });
  res.json(menuList);
});
//get nemuitems by menu id, 1 to 1
router.get("/:id", async (req, res) => {
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
module.exports = router;
