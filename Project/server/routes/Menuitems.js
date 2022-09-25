
const { Menuitems } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const express = require("express");
const router = express.Router();

router.get("/", validateToken,  async (req, res) => {
  const menuList = await Menuitems.findAll();
  res.json(menuList);
});
//get nemuitems by categoryid, 1 to many
router.get("/byId/:categoryid", validateToken,  async (req, res) => {
  const categoryid = req.params.categoryid;

  const menuList = await Menuitems.findAll({
    where: {
      CategoryId: categoryid,
    },
  });
  res.json(menuList);
});
//get nemuitems by menu id, 1 to 1
router.get("/:id", validateToken,  async (req, res) => {
  const id = req.params.id;

  const menuList = await Menuitems.findOne({
    where: {
      id: id,
    },
  });
  res.json(menuList);
});

router.post("/", validateToken, async (req, res) => {
  const menuItem = req.body;
  await Menuitems.create(menuItem);
  res.json(menuItem);
});

router.delete("/delete/:id", validateToken,  async (req, res) => {
  const menuItem = req.params.id;
  await Menuitems.destroy({
    where: {
      id: menuItem,
    },
  });
  res.json("delete");
});


router.put("/update/:id", validateToken,  async(req,res)=>{
  const menuid = req.params.id;
  const item = req.body;
  await Menuitems.update({ 
    itemname:item.newitemname,
    description:item.newdescription,
    price:item.newprice,
    photoURL:item.newphotoURL
    }, { where: { id: menuid} });
  res.json(req.body);
  
  });
  


module.exports = router;
