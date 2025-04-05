const express = require("express");
const URL = require("../models/url.model.js");

let router = express.Router();

router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    return res.render('home')
})

module.exports = router;
