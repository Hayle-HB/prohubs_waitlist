const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    stack: {
      type: String,
      required: false,
      enum: ["Frontend", "Backend", "UI/UX", "Mobile", "ML", "Other"],
    },
    status: {
      type: String,
      enum: ["pending", "notified", "joined"],
      default: "pending",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add compound index for common queries
waitlistSchema.index({ status: 1, joinedAt: -1 });

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
