const Waitlist = require("../models/Waitlist");
const { sendWelcomeEmail } = require("../services/emailService");

// Logger utility
const logger = {
  info: (message, data = {}) => console.log(`[INFO] ${message}`, data),
  error: (message, error = {}) => console.error(`[ERROR] ${message}`, error),
  warn: (message, data = {}) => console.warn(`[WARN] ${message}`, data),
};

exports.joinWaitlist = async (req, res) => {
  const startTime = Date.now();
  logger.info("Join waitlist request received", { body: req.body });

  try {
    const { email, stack } = req.body;

    // Check if email already exists
    const existingUser = await Waitlist.findOne({ email });
    if (existingUser) {
      logger.warn("Duplicate email attempt", { email });
      return res.status(400).json({
        success: false,
        message: "You are already on our waitlist!",
      });
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({
      email,
      stack,
    });

    logger.info("New waitlist entry created", { email, stack });

    // Send welcome email
    try {
      await sendWelcomeEmail(email, stack);
      logger.info("Welcome email sent successfully", { email });
    } catch (emailError) {
      logger.error("Failed to send welcome email", emailError);
      // Don't fail the request if email fails
    }

    const responseTime = Date.now() - startTime;
    logger.info("Join waitlist request completed", { responseTime });

    res.status(201).json({
      success: true,
      message: "Successfully joined the waitlist!",
      data: waitlistEntry,
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logger.error("Join waitlist error", { error, responseTime });

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

exports.getStats = async (req, res) => {
  const startTime = Date.now();
  logger.info("Get stats request received");

  try {
    const totalCount = await Waitlist.countDocuments();
    const stackStats = await Waitlist.aggregate([
      {
        $group: {
          _id: "$stack",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusStats = await Waitlist.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const responseTime = Date.now() - startTime;
    logger.info("Get stats request completed", { responseTime });

    res.status(200).json({
      success: true,
      data: {
        totalCount,
        stackStats: stackStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        statusStats: statusStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logger.error("Get stats error", { error, responseTime });

    res.status(500).json({
      success: false,
      message: "Error fetching waitlist statistics",
    });
  }
};

exports.getUsers = async (req, res) => {
  const startTime = Date.now();
  logger.info("Get users request received");

  try {
    const { page = 1, limit = 10, status, stack } = req.query;
    const query = {};

    if (status) query.status = status;
    if (stack) query.stack = stack;

    const users = await Waitlist.find(query)
      .sort({ joinedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Waitlist.countDocuments(query);

    const responseTime = Date.now() - startTime;
    logger.info("Get users request completed", { responseTime });

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logger.error("Get users error", { error, responseTime });

    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};
