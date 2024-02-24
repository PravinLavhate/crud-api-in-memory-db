const express = require("express");
const body_parser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3000;
const router = express.Router();
router.use(body_parser.json());

//in memory database
let users = [];

router.get("/", (req, resp) => {
  resp.json(users);
});

router.post("/", (req, resp) => {
  const { username, age, hobbies } = req.body;

  if (!username || isNaN(age)) {
    return resp
      .status(400)
      .json({ error: "Username is mandatory and age must be a number" });
  }
  const nUser = {
    id: uuidv4(),
    username: username,
    age: age,
    hobbies: hobbies || [],
  };

  users.push(nUser);

  resp.status(201).json(nUser);
});

module.exports = router;
