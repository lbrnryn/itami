require('dotenv').config();

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err); 
    } else {
      res.send(data);
    }
  })
});

app.post('/send', upload.array('files', 100), (req, res) => {
  const { name, email, number, message } = req.body;
  const uploadedFiles = req.files;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Zebedee Travel & Tours',
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone Number: ${number}</p>
      <p>Message: </p>
      <p>${message}</p>
    `,
    attachments: uploadedFiles.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    })),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully.');
    }
  });

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
