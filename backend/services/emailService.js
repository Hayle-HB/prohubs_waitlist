const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (email, stack) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to ProHubs Waitlist! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Welcome to ProHubs! 🚀</h1>
        <p style="color: #666; line-height: 1.6;">
          Thank you for joining our waitlist! We're excited to have you on board as we build something amazing.
        </p>
        <p style="color: #666; line-height: 1.6;">
          You've registered as a <strong>${stack}</strong> developer, and we'll make sure to notify you first when we launch features relevant to your expertise.
        </p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">What's Next?</h2>
          <ul style="color: #666; line-height: 1.6;">
            <li>We'll notify you as soon as we launch</li>
            <li>You'll get early access to our platform</li>
            <li>Special offers and discounts for early adopters</li>
          </ul>
        </div>
        <p style="color: #666; line-height: 1.6;">
          Stay tuned for updates! If you have any questions, feel free to reply to this email.
        </p>
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
          <p>© 2024 ProHubs. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

module.exports = { sendWelcomeEmail };
