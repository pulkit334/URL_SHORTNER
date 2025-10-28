const express = require("express");
const routerss = express.Router();
const urlmodel = require("../Models/url");
const { Timestamp } = require("bson");

async function handleRedirect(req, res) {
  const shortid = req.params.id; // match route param

  try {
    const updatedUrl =await  urlmodel.findOneAndUpdate(
      { shortid },
      {
        $push: { Vist: { Timestamp: Date.now() } },
      },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).send("URL not found");
    }
    // console.log(updatedUrl)

    // Redirect to the original URL if you have it
    return res.redirect(updatedUrl.redirectUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}



async function getanylatics(req, res) {
    try {
        const shortid= req.params.id;

        // Check if id is provided
        if (!shortid) {
            return res.status(400).json({ error: "ID is required" });
        }

        // Await the query
        const result = await urlmodel.findOne({ shortid });


        // If no URL found
        if (!result) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Return analytics data
        return res.json({
            totalClicks: result.Vist?.length,
            analytics: result.Vist || []
        });

    } catch (err) {
        console.error("Error in analytics route:", err);
        return res.status(500).json({ error: "Server error" });
    }
}





module.exports = { handleRedirect,getanylatics };
