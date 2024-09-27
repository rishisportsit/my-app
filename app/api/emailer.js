// import { createTransport } from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, email, message } = req.body;

//     // Create transporter
//     const transporter = createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: email,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: `Message from ${name}`,
//       text: message,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: "Email sent successfully!" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Failed to send email", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
