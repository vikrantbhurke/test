"use server";
import nodemailer from "nodemailer";

let transport: nodemailer.Transporter | null = null;

const connectNodemailer = async (): Promise<nodemailer.Transporter> => {
  if (transport) return transport;

  try {
    transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    await transport.verify();
    console.log("✅ Nodemailer connected");
    return transport;
  } catch (error) {
    console.error("⛔ Nodemailer didn't connect");
    console.error(error);
    process.exit(1);
  }
};

export default connectNodemailer;
