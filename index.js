const express = require("express");
const path = require("path");
const staticRoute = require('./routes/staticRouter.js')
const mongoose = require("mongoose");
const urlRoute = require("./routes/url.route.js");
const userRoute = require("./routes/user.route.js");
const URL = require("./models/url.model.js");
const { connectToMongoDB } = require("./connect.js");
const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDb Connected")
);

// templating engines like "ejs" yh hamare liye serverside rendering ka kaam krte h
app.set("view engine", 'ejs'); 
// app.set('views', path.resolve("./views"));
app.set('views', "./views"); // path bta rhe ki views ke andr hai


app.use(express.json()); // means hum json data vi support krenge 
app.use(express.urlencoded({extended : false})); // hum form data vi support krenge

app.get("/test", async(req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls : allUrls
  });
})

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use('/user', userRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
