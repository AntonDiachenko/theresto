const express = require("express");
const router = express.Router();
const { Menu } = require("../models");


router.get("/", async (req, res) => {
    const menuList = await Menu.findAll();
    res.json(menuList);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const menuItem = await Menu.findByPk(id);
    res.json(menuItem);
});


router.post("/", async (req, res) => {
    const menuItem = req.body;
    await Menu.create(menuItem);
    res.json(menuItem);
});


module.exports = router;