// File: pages/api/contact.js (or app/api/contact/route.js for App Router)

// First, install nodemailer:
// npm install nodemailer

import nodemailer from 'nodemailer';

// For Pages Router
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  
  // Create a temporary email account using ethereal.email
  // This is a testing service that catches emails without actually sending them
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  
  try {
    const info = await transporter.sendMail({
      from: `"Contact Form" <${email}>`,
      to: "rishivarma9090@gmail.com",
      subject: `New message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    // This URL lets you see the test email
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// For App Router
/*
export async function POST(request) {
  const { name, email, message } = await request.json();
  
  // Create a temporary email account
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  
  try {
    const info = await transporter.sendMail({
      from: `"Contact Form" <${email}>`,
      to: "rishivarma9090@gmail.com",
      subject: `New message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
*/