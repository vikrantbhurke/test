import { z } from "zod";
import equals from "validator/lib/equals";
import isAlpha from "validator/lib/isAlpha";
import isMongoId from "validator/lib/isMongoId";
import isStrongPassword from "validator/lib/isStrongPassword";
import { Gender, Role, Provider, Payment, Status } from "./enums";

const reservedUsernames = ["admin", "support", "api", "root", "login"];

export const UserSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "First name must be at least 3 characters." })
    .max(30, { message: "First name must be at most 30 characters." })
    .trim()
    .refine((value) => isAlpha(value), {
      message: "First name must contain only letters.",
    })
    .transform(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    ),

  lastname: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters." })
    .max(30, { message: "Last name must be at most 30 characters." })
    .trim()
    .refine((value) => isAlpha(value), {
      message: "Last name must contain only letters.",
    })
    .transform(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    ),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must be at most 30 characters." })
    .trim()
    .refine((value) => /^[a-z0-9._]+$/.test(value), {
      message:
        "Username can only include letters, numbers, underscores, and periods.",
    })
    .refine((value) => value === value.toLowerCase(), {
      message: "Username must be all lowercase.",
    })
    .refine(
      (value) =>
        !value.startsWith(".") &&
        !value.startsWith("_") &&
        !value.endsWith(".") &&
        !value.endsWith("_"),
      {
        message: "Username cannot start or end with '.' or '_'.",
      }
    )
    .refine((value) => !/(\.\.|__|_\.)|(\._)/.test(value), {
      message: "Username cannot contain consecutive '.' or '_'.",
    })
    .refine((value) => !reservedUsernames.includes(value), {
      message: "This username is reserved or not allowed.",
    }),

  email: z
    .string()
    .max(30, { message: "Email must be at most 30 characters." })
    .email({
      message: "Invalid email address.",
    })
    .trim(),

  hashedPassword: z.string().trim(),
  avatar: z.string().url().nullable(),
  subscriptionId: z.string().nullable(),
  favBookId: z
    .string()
    .refine((value) => isMongoId(value))
    .nullable(),

  gender: z.nativeEnum(Gender),
  role: z.nativeEnum(Role).default(Role.Public),
  provider: z.nativeEnum(Provider).default(Provider.Credentials),
  payment: z.nativeEnum(Payment).default(Payment.Free),
  status: z.nativeEnum(Status).default(Status.Inactive),
  isVerified: z.boolean().default(false),
});

export const SignUpUserSchema = UserSchema.pick({
  firstname: true,
  lastname: true,
  username: true,
  email: true,
  gender: true,
})
  .extend({
    password: z.string().refine((value) => isStrongPassword(value), {
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => equals(data.password, data.confirmPassword), {
    message: "Confirm password must match password.",
    path: ["confirmPassword"],
  });

export const EditUserSchema = UserSchema.pick({
  firstname: true,
  lastname: true,
}).partial();

export const GetUserSchema = UserSchema.pick({
  firstname: true,
  lastname: true,
  avatar: true,
  username: true,
  email: true,
  favBookId: true,
}).extend({
  id: z.string(),
});

export type SignUpUserDTO = z.infer<typeof SignUpUserSchema>;
export type EditUserDTO = z.infer<typeof EditUserSchema>;
export type GetUserDTO = z.infer<typeof GetUserSchema>;
