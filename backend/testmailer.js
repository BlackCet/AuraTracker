require('dotenv').config();
const { sendReminderEmail } = require('./config/mailer');

sendReminderEmail('testrecipient@example.com', {
  title: 'Sample Assignment',
  deadline: new Date().toLocaleString()
});
