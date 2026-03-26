import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/send-contact-email', async (req, res) => {
  const { projectStatus, projectName, location, name, email, phone, query } =
    req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    const mailOptions = {
      from: `"Upkar Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Project Enquiry from ${name}`,

      html: `
<div style="margin:0;padding:0;background:#f4f6f5;font-family:Arial, Helvetica, sans-serif;">
  
  <!-- Outer spacing -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f5;padding:40px 20px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#2D5C3A;padding:25px;text-align:center;">
              <h2 style="color:#ffffff;margin:0;">Upkar Group</h2>
              <p style="color:#dfeee5;margin:6px 0 0;">Project Enquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 30px;">
              <h3 style="color:#2D5C3A;margin:0 0 15px;">New Lead Details</h3>

              <!-- Table -->
              <table width="100%" cellpadding="12" cellspacing="0" style="margin-top:20px;border-collapse:separate;border-spacing:0 12px;">
                
                <tr style="background:#f7f7f7;">
                  <td style="font-weight:bold;width:35%;border-radius:6px 0 0 6px;">Name</td>
                  <td style="border-radius:0 6px 6px 0;">${name}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Email</td>
                  <td style="border-radius:0 6px 6px 0;">${email}</td>
                </tr>

                <tr style="background:#f7f7f7;">
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Phone</td>
                  <td style="border-radius:0 6px 6px 0;">${phone}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Project Status</td>
                  <td style="border-radius:0 6px 6px 0;">${projectStatus}</td>
                </tr>

                <tr style="background:#f7f7f7;">
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Project</td>
                  <td style="border-radius:0 6px 6px 0;">${projectName}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Location</td>
                  <td style="border-radius:0 6px 6px 0;">${location}</td>
                </tr>

                <tr style="background:#f7f7f7;">
                  <td style="font-weight:bold;border-radius:6px 0 0 6px;">Query</td>
                  <td style="border-radius:0 6px 6px 0;">${query}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding:15px;font-size:12px;color:#999;">
              © ${new Date().getFullYear()} Upkar Group. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail Error:', err);
    res.status(500).json({ error: 'Email failed' });
  }
});

export default router;
