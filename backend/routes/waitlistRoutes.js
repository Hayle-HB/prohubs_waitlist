const express = require("express");
const router = express.Router();
const {
  joinWaitlist,
  getStats,
  getUsers,
} = require("../controllers/waitlistController");

// Join waitlist
router.post("/join", async (req, res, next) => {
  try {
    await joinWaitlist(req, res);
  } catch (error) {
    next(error);
  }
});

// Get waitlist statistics
router.get("/stats", async (req, res, next) => {
  try {
    await getStats(req, res);
  } catch (error) {
    next(error);
  }
});

// Get users with pagination and filtering
router.get("/users", async (req, res, next) => {
  try {
    await getUsers(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
