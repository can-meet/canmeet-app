import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendPurchaseNotification = (receiverEmail: string, productName: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: '【can meet】商品購入のお知らせ',
    text: `あなたの出品した商品「${productName}」が購入されました。`,
    html: `
      <h3>商品名：${productName}</h3>
      <p>サイトを確認して、チャットを始めましょう。</p>

      <p>※このメールに返信をしても購入者とは連絡できません。</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

export { sendPurchaseNotification };
