const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// GET /search?q=delhi
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json({ success: true, data: [] });
    }

    const listings = await Listing.find(
      { title: { $regex: query, $options: "i" } },
      { title: 1 }   // _id is included by default
    ).limit(5);

    res.json({ success: true, data: listings });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
