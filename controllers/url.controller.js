const shortid = require("shortid");
const URL = require("../models/url.model.js");

async function handleGenerateNewShortURL(req, res) {
  console.log("Received request body:", req.body);

  if (!req.body || !req.body.url) {
    return res.status(400).json({ error: "URL is required in request body" });
  }

  const { url } = req.body;
  const shortId = shortid.generate();

  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id
  });

  const allUrls = await URL.find({});
  return res.render('home', {
    id : shortId,
    urls: allUrls
  })
  // return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
};
