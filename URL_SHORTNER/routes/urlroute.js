const express = require("express")
const router = express.Router();
const {handleGenerateNew} = require("../controller/url")
const {handleRedirect,getanylatics} = require("../controller/logic")
const auth = require("../auth");
router.post("/",auth ,handleGenerateNew)
router.get("/:id",auth,handleRedirect)
router.get("/analytics/:id",auth,getanylatics)
//  Get all URLs created by the logged-in user
router.get("/urls/user", auth, async (req, res) => {
  try {
    const userUrls = await URL.find({ createdBy: req.user.id });
    res.json(userUrls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router