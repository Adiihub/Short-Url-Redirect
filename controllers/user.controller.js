const user = require("../models/user.model.js");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await user.create({
      name,
      email,
      password,
    });
    return res.redirect("home");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await user.findOne({ email});
  if (!user) {
    return res.render("login", { error: "Invalid Email or Password" });
  }

  return res.redirect("home");
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
