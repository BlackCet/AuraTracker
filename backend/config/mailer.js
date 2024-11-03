const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use Gmail or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send email notifications
const sendReminderEmail = (to, assignment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reminder: Upcoming Assignment Deadline',
    text: `Hi! This is a reminder for your assignment: "${assignment.title}". It is due on ${assignment.deadline}. Don't forget to complete it!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendReminderEmail };
