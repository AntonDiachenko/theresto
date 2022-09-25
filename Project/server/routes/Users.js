const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// register a new user
router.post("/", async (req, res) => {
  const user = ({ username, email, password, phone } = req.body);

  const user1 = await Users.findOne({ where: { username: username } });

  if (user1) {
    res.json({ error: "User  Exist" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
        phone: phone,
      });
      res.json(user);
    });
  }
});

//login as a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id, role: user.role },
      "importantsecret"
    );
    res.json({
      token: accessToken,
      username: username,
      id: user.id,
      role: user.role,
    });
    // res.json("you log in");
  });
});

// get all users
router.get("/", async (req, res) => {
  const users = await Users.findAll();
  if (!users) {
    res.json("There are no users.");
  } else {
    res.status(200).json(users);
  }
});

// get users by id
router.get("/byId/:id([0-9]+)", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  if (!user) {
    res.status(404).json("The user is not found");
  } else {
    res.status(200).json(user);
  }
});

router.get("/byuserId", validateToken, async (req, res) => {
  const id = req.user.id;
  const user = await Users.findByPk(id);
  if (!user) {
    res.status(404).json("The user is not found");
  } else {
    res.status(200).json(user);
  }
});


// get users by username
router.get("/byname/:username", validateToken, async (req, res) => {
  const username = req.params.username;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.status(404).json("The user is not found");
  } 
  else {
    res.status(200).json(user);
  }
});

//DELETE
router.delete("/delete/:id", validateToken, async (req, res) => {
  const userid = req.params.id;
  await Users.destroy({
    where: {
      id: userid,
    },
  });
  res.json("delete");
});

// UPDATE --> EDIT
router.put("/update/:id([0-9]+)", async (req, res) => {
  const userid = req.params.id;
  const user = req.body;
  await Users.update(
    {
      username: user.username,
      email: user.email,

      phone: user.phone,
      role: user.role,
    },
    { where: { id: userid } }
  );
  res.json(req.body);
});


// auth route to check if there is a valid token or not
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;