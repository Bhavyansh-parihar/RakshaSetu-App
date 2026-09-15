require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing SMTP connection...');
  console.log(`Using Host: ${process.env.SMTP_HOST} Port: ${process.env.SMTP_PORT}`);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"RakshaSetu Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to self for testing
      subject: "RakshaSetu SMTP Test",
      text: "If you are reading this, the RakshaSetu SMTP integration is working flawlessly!",
    });
    console.log(`✅ Success! Test email sent. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Failed to send email. Error:`, error.message);
    if (error.message.includes('Invalid login') || error.message.includes('535')) {
      console.error('\nNOTE: If you are using a regular password, Google blocked this. You MUST use a 16-character App Password from Google Account Security settings!');
    }
  }
}

testEmail();
