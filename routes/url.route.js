const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectURL } = require('../controllers/url.controller.js');

let router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleRedirectURL);


module.exports = router;