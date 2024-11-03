const Assignment = require('../models/assignmentModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Missing email configuration in environment variables');
}

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send reminder email
const sendReminderEmail = (email, assignment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Reminder: Upcoming Assignment Due - ${assignment.title}`,
    text: `Your assignment "${assignment.title}" is due on ${assignment.deadline}. Don't forget to complete it!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
};

// Function to check for upcoming assignments
const checkUpcomingAssignments = async () => {
  console.log("Checking for upcoming assignments...");

  const now = new Date();
  const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    const upcomingAssignments = await Assignment.find({
      deadline: { $gte: now, $lt: oneDayFromNow },
    });

    console.log(`Found ${upcomingAssignments.length} upcoming assignments.`);

    const userEmails = {};
    for (const assignment of upcomingAssignments) {
      if (!userEmails[assignment.user_id]) {
        const user = await User.findById(assignment.user_id);
        if (user) {
          userEmails[assignment.user_id] = user.email;
          console.log(`User email for ${user._id}: ${user.email}`);
        } else {
          console.log(`No user found for ID: ${assignment.user_id}`);
          userEmails[assignment.user_id] = null;
        }
      }

      const email = userEmails[assignment.user_id];
      if (email) {
        console.log(`Sending reminder for assignment "${assignment.title}" to ${email}`);
        sendReminderEmail(email, assignment);
      } else {
        console.log(`No email found for user ID: ${assignment.user_id}`);
      }
    }
  } catch (error) {
    console.error('Error checking for upcoming assignments:', error);
  }
};

/// Schedule the reminder check to run once a day at a specific time (e.g., midnight)
cron.schedule('0 0 * * *', checkUpcomingAssignments); // Runs daily at midnight


module.exports = checkUpcomingAssignments;
