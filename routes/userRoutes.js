const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//Get User Todo List

// Sign up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Check if all required fields are entered
  if (!name || !email || !password)
    return res.status(400).json({ error: "Please enter all required fields." });
  // Check if password is at least 6 characters
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });
  // Check if user already exists
  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ error: "User already exists." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // Create new user
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving users", error });
//   }
// });

// Sign in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // Check if all required fields are entered
  if (!email || !password)
    return res.status(400).json({ error: "Please enter all required fields." });
  // Check if user exists
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist." });
    // Check if password matches
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: "Password is incorrect." });
    // Create and assign a token
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

module.exports = router;
