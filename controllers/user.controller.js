const User = require("../models/user.model.js");
const { v4 : uuidv4 } = require('uuid');
const {setUser} = require('../service/auth.service.js');

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password});
  if (!user) {
    return res.render('login', { error: "Invalid Email or Password" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId); //cookie banaya 

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
