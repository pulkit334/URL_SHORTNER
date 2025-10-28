const { nanoid } = require("nanoid");
const URL = require("../Models/url");

async function handleGenerateNew(req, res) {
  const shortID = nanoid(8);
  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({
      message: "URL is required",
    });
  }

  try {
    const newUrl = await URL.create({
      shortid: shortID,
      redirectUrl: body.url,
      createdBy: req.user.id, //
      Vist: [],
    });

    return res.json({
      id: shortID,
      message: "Short URL created successfully",
      createdBy: req.user.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { handleGenerateNew };