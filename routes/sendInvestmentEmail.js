import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send-investment-email', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Upkar Group <onboarding@resend.dev>',
      to: ['javadalidev@gmail.com'],
      subject: `New Investment Enquiry from ${name}`,
      html: `
        <h2>New Investment Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});
export default router;

// nodemailer

// import express from 'express';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// router.post('/send-investment-email', async (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     const mailOptions = {
//       from: `"Investment Form" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: `New Investment Enquiry from ${name}`,
//       html: `
// <div style="margin:0;padding:0;background-color:#f4f6f5;font-family:Arial, Helvetica, sans-serif;">

//   <!-- Outer spacing wrapper -->
//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f5;padding:40px 20px;">
//     <tr>
//       <td align="center">

//         <!-- Main Card -->
//         <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">

//           <!-- Header -->
//           <tr>
//             <td style="background:#2D5C3A;padding:25px;text-align:center;">
//               <h1 style="color:#ffffff;margin:0;font-size:22px;">Upkar Group</h1>
//               <p style="color:#dfeee5;margin:6px 0 0;font-size:13px;">Investment Enquiry</p>
//             </td>
//           </tr>

//           <!-- Body -->
//           <tr>
//             <td style="padding:35px 30px;">
//               <h2 style="margin:0 0 15px;color:#2D5C3A;font-size:18px;">
//                 New Investment Lead Received
//               </h2>

//               <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 10px;">
//                 You have received a new investment enquiry. Details are below:
//               </p>

//               <!-- Info Table -->
//               <table width="100%" cellpadding="12" cellspacing="0" style="margin-top:25px;border-collapse:separate;border-spacing:0 12px;">

//                 <tr style="background:#f7f7f7;">
//                   <td style="font-weight:bold;color:#333;width:30%;border-radius:6px 0 0 6px;">Name</td>
//                   <td style="color:#555;border-radius:0 6px 6px 0;">${name}</td>
//                 </tr>

//                 <tr style="background:#ffffff;">
//                   <td style="font-weight:bold;color:#333;border-radius:6px 0 0 6px;">Email</td>
//                   <td style="color:#555;border-radius:0 6px 6px 0;">${email}</td>
//                 </tr>

//                 <tr style="background:#f7f7f7;">
//                   <td style="font-weight:bold;color:#333;border-radius:6px 0 0 6px;">Phone</td>
//                   <td style="color:#555;border-radius:0 6px 6px 0;">${phone}</td>
//                 </tr>

//               </table>
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td style="text-align:center;padding:15px;font-size:12px;color:#999;">
//               © ${new Date().getFullYear()} Upkar Group. All rights reserved.
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>

// </div>
// `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true });
//     // } catch (error) {
//     //   console.error('Nodemailer Error:', error);
//     //   res.status(500).json({ error: 'Failed to send email' });
//     // }
//   } catch (error) {
//     console.error('Nodemailer Error FULL:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
