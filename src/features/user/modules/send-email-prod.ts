"use server";
import { MailtrapClient, TemplateVariables } from "mailtrap";

export const sendEmailProd = async (
  id: string,
  recipient: string,
  variables: TemplateVariables
) => {
  const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN as string,
  });

  const sender = {
    email: process.env.MAILTRAP_SENDER as string,
    name: process.env.APP_NAME as string,
  };

  const recipients = [{ email: recipient }];

  const mailOptions = {
    from: sender,
    to: recipients,
    template_uuid: id,
    template_variables: variables,
  };

  try {
    await client.send(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("⛔ Error sending email:", error);
  }
};
