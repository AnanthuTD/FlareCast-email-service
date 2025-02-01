import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import env from '../env';
import IEmailService from '../entities/IEmailService';

class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions: MailOptions = {
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions: MailOptions = {
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
