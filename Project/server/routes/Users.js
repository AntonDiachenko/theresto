const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// post a new user
router.post("/", async (req, res) => { 
    const  user ={username, email, password, phone} = req.body;
    
    const user1 = await Users.findOne({ where: { username: username } });
  
    if (user1){res.json({ error: "User  Exist" });
    }else{
        bcrypt.hash(password, 10).then((hash)=>{
            Users.create({
               username:username,
               email :email,
               password: hash,
               phone:phone
           });
           res.json(user);
           } );
    } 
  });


  //login as a user
  router.post("/login", async (req, res) => {
    const  {username, password} = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
  
      const accessToken = sign(
        { username: user.username, id: user.id , role:user.role},
        "importantsecret"
      );
      res.json({ token: accessToken, username: username, id: user.id , role:user.role});
    // res.json("you log in");
    });
  }); 

  router.get("/auth", async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
  });


  
  router.get('/byId/:id', validateToken, async (req,res)=>{
    const id = req.params.id;
    const auc = await Users.findByPk(id);
    res.json(auc);

  })


  

router.delete("/delete/:id", validateToken, async(req,res)=>{
  const userid = req.params.id;
  await Users.destroy({
    where:{
      id: userid
    }
  });
  res.json("delete")
});


router.put("/update/:id", validateToken, async(req,res)=>{
  const userid = req.params.id;
  const user = req.body;
  await Users.update({ 
    username:user.username,
    email :user.email,

    phone:user.phone,
    role: user.role
     }, { where: { id: userid } });
  res.json(req.body);
  
  });
  



module.exports = router;