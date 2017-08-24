import nodemailer from 'nodemailer';
import config from '../../config';

exports.sendMail = data => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.pass
    }
  });

  const mailOptions = {
    from: config.email,
    to: data.email,
    subject: '註冊成功✔',
    text: '註冊成功了',
    html: '<b>恭喜您</b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message send: ${info.response}`);
  });

};