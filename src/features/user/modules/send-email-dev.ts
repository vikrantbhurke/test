import transport from "@/global/configurations/nodemailer";
import { TemplateVariables } from "mailtrap";

export const sendEmailDev = async (
  filename: string,
  recipient: string,
  subject: string,
  variables: TemplateVariables
) => {
  const { template } = await import(`@/global/templates/${filename}`);
  const Handlebars = (await import("handlebars")).default;
  const handlerbarsTemplate = Handlebars.compile(template);

  const mailOptions = {
    from: process.env.MAILTRAP_SENDER as string,
    to: recipient,
    subject,
    html: handlerbarsTemplate(variables),
  };

  try {
    await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("⛔ Error sending email:", error);
  }
};
