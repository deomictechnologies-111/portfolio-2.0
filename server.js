const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static portfolio files
app.use(express.static(__dirname));

// POST endpoint for contact submissions
app.post('/api/submit', async (req, res) => {
  const { name, email, budget, project_type, message } = req.body;

  // Basic validation
  if (!name || !email || !budget || !project_type || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const recipient = process.env.TO_EMAIL || 'deomictechnologies@gmail.com';

  console.log(`Received lead from ${name} (${email})`);

  // 1. Try sending via SMTP/Nodemailer if configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name} (Deomic Lead)" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: email,
        subject: `New Project Brief from ${name} — Deomic Technologies`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6a0dff; border-bottom: 2px solid #6a0dff; padding-bottom: 10px;">New Project Brief</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <p><strong>Project Type:</strong> ${project_type}</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
              <p><strong>Message/Goal:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 11px; color: #888;">Submitted via Deomic Technologies Portfolio Contact Form</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email successfully sent via SMTP to ${recipient}`);
      return res.status(200).json({ success: true, message: 'Submission successful' });
    } catch (smtpError) {
      console.error('SMTP sending failed, attempting fallback...', smtpError);
    }
  }

  // 2. Fall back to Web3Forms if access key is set
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const formData = {
        name,
        email,
        budget,
        project_type,
        message,
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New Project Brief from ${name} — Deomic Technologies`,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log(`Lead sent successfully via Web3Forms proxy`);
        return res.status(200).json({ success: true, message: 'Submission successful' });
      }
      throw new Error(data.message || 'Web3Forms API failed');
    } catch (web3Error) {
      console.error('Web3Forms sending failed:', web3Error.message);
    }
  }

  // 3. Dev fallback: No serverless keys or SMTP configured (makes local development a breeze)
  if (process.env.NODE_ENV !== 'production' || (!process.env.SMTP_HOST && !process.env.WEB3FORMS_ACCESS_KEY)) {
    console.warn('⚠️ No email delivery service configured. Lead logged to console above.');
    return res.status(200).json({ 
      success: true, 
      message: 'Submission received locally (Logged to console)' 
    });
  }

  return res.status(500).json({ 
    success: false, 
    message: 'Form submission failed: No mail services configured.' 
  });
});

// Fallback all page requests to index.html for SPA compatibility
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Deomic Portfolio Backend is running at http://localhost:${PORT}`);
});
