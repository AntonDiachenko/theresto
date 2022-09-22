const express = require("express");
const router = express.Router();
const { Categories } = require("../models");

router.get("/", async (req, res) => {
  const catList = await Categories.findAll();
  res.json(catList);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const catItem = await Categories.findByPk(id);
  res.json(catItem);
});

router.post("/", async (req, res) => {
  const catItem = req.body;
  await Categories.create(catItem);
  res.json(catItem);
});

module.exports = router;
