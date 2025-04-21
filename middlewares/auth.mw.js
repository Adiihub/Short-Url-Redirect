const { getUser } = require("../service/auth.service.js");

function checkforAuthentication() {
  const autorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  ) {
    return next();
  }
//   const token = 
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("userUid:", userUid); // Log to see if cookie is present

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies.uid;
  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
