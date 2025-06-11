// Mailtrap template ids, filenames and subjects for sandbox emails

export const Template = {
  Welcome: {
    filename: "welcome.ts",
    id: process.env.MAILTRAP_WELCOME_TEMPLATE_ID as string,
    subject: `Welcome To ${process.env.APP_NAME as string}`,
  },
  Password: {
    filename: "password.ts",
    id: process.env.MAILTRAP_PASSWORD_TEMPLATE_ID as string,
    subject: `Reset Password For ${process.env.APP_NAME as string}`,
  },
};
