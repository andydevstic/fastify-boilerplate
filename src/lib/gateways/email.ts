import * as mailer from 'nodemailer';

import * as config from '../../../config';

const transporter = mailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
  logger: false,
  debug: false,
  from: config.smtp.senderName,
});

export function sendEmail(data: mailer.SendMailOptions): Promise<mailer.SentMessageInfo> {
  return transporter.sendMail(data);
}
