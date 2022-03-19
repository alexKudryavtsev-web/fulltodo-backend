const nodemailer = require("nodemailer");

class EmailService {
  transporter = null;

  async sendActivationMail(to, link) {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта ${to}`,
      text: "",
      html: `
      <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

const emailService = new EmailService();

module.exports = emailService;
