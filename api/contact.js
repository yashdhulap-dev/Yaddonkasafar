import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, tour, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    // Create transporter (use your Gmail or SMTP credentials)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or your SMTP service
      auth: {
        user: 'yaddonkasafar@gmail.com',      // Replace with your email
        pass: 'sgpp nxwh bcat bfnx'          // Gmail: App password (not normal password)
      }
    });

    try {
      // Email to you
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: 'yaddonkasafar@gmail.com',        // Your email
        subject: `New Enquiry: ${tour}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTour: ${tour}\nMessage: ${message}`,
      });

      // Thank you email to user
      await transporter.sendMail({
        from: '"YaddonKaSafar" <YOUR_EMAIL@gmail.com>',
        to: email,
        subject: 'Thank you for contacting YaddonKaSafar',
        text: `Hi ${name},\n\nThank you for contacting us. We will get back to you shortly regarding your tour "${tour}".\n\nBest Regards,\nYaddonKaSafar Team`
      });

      res.status(200).json({ message: 'Enquiry sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
