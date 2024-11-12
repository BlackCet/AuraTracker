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
    html: `
      <div style="
        font-family: Arial, sans-serif; 
        border: 1px solid #ddd; 
        padding: 20px; 
        max-width: 600px; 
        margin: auto; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      ">
        <h2 style="
          color: #4CAF50; 
          text-align: center; 
          font-size: 1.5em;
        ">
          Assignment Reminder
        </h2>
        <p style="
          font-size: 1.1em; 
          color: #333;
        ">
          Hello, just a friendly reminder that your assignment "<strong>${assignment.title}</strong>" is due soon.
        </p>
        <p style="
          background: #f9f9f9; 
          padding: 10px; 
          border-radius: 5px;
          font-size: 1.05em;
          text-align: center;
          color: #333;
        ">
          <strong>Due Date:</strong> ${assignment.deadline}
        </p>
        <p style="
          margin-top: 20px;
          font-size: 1em;
          color: #555;
        ">
          Make sure to complete it on time to stay on track. If you have any questions or need assistance, feel free to reach out.
        </p>
        <p style="
          margin-top: 30px; 
          font-size: 0.9em; 
          color: #777;
          text-align: center;
        ">
          Best regards,<br>Your Course Team
        </p>
      </div>
    `,
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
      completed: false, // Only get assignments that are incomplete
    });

    console.log(`Found ${upcomingAssignments.length} upcoming incomplete assignments.`);

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
        console.log(`Sending reminder for incomplete assignment "${assignment.title}" to ${email}`);
        sendReminderEmail(email, assignment);
      } else {
        console.log(`No email found for user ID: ${assignment.user_id}`);
      }
    }
  } catch (error) {
    console.error('Error checking for upcoming assignments:', error);
  }
};

// Schedule the reminder check to run every day at midnight
cron.schedule('29 14 * * *', checkUpcomingAssignments);

module.exports = checkUpcomingAssignments;
