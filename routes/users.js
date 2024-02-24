const express = require("express");
const body_parser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3000;
const router = express.Router();
router.use(body_parser.json());

//in memory database
let users = [];

//get user list
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

//get user with userid
router.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[userIndex] = {
    ...users[userIndex],
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };
  res.json(users[userIndex]);
});

//update user
router.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[userIndex] = {
    ...users[userIndex],
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };
  res.json(users[userIndex]);
});

// Delete an existing user
router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.sendStatus(204).json({ msg: "record is deleted" });
});

module.exports = router;
