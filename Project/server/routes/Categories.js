const express = require("express");
const router = express.Router();
const { Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    const categoryList = await Categories.findAll();
    res.json(categoryList);
});

router.post("/",  async (req, res) => {
    const categoryItem = req.body;
    await Categories.create(categoryItem);
    res.json(categoryItem);
});

router.delete("/delete/:id",  async(req,res)=>{
    const id = req.params.id;
    await Categories.destroy({
      where:{
        id: id
      }
    });
    res.json("delete")
  });
  
module.exports = router;