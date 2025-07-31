import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

import {
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PASS,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USER,
} from "../env";

// Data dari .env
const transporter = nodemailer.createTransport({
  host: EMAIL_SMTP_HOST,
  port: EMAIL_SMTP_PORT,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
});

export interface ISendMail {
  from: string;
  to: string;
  subject: string;
  content: string;
}

// function untuk mengirim email
export const sendMail = async ({ from, to, subject, content }: ISendMail) => {
  const result = await transporter.sendMail({
    from,
    to,
    subject,
    html: content,
  });

  return result;
};

// function untuk mengirim email dengan template
export const renderMail = async (
  template: string,
  data: any
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data
  );

  return content as string;
};
