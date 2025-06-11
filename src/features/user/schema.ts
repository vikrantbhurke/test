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
    .min(2, { message: "First name must be at least 2 characters." })
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
    .min(2, { message: "Last name must be at least 2 characters." })
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
  avatar: z
    .object({
      secureUrl: z.string().url().nullable(),
      publicId: z.string().nullable(),
    })
    .optional(),
  subscriptionId: z.string().nullable(),
  favBookId: z
    .string()
    .refine((value) => isMongoId(value))
    .nullable(),

  gender: z.nativeEnum(Gender, {
    message: "Gender is required.",
  }),
  role: z.nativeEnum(Role).default(Role.Public),
  provider: z.array(z.nativeEnum(Provider).default(Provider.credentials)),
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
  avatar: true,
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

export const SignInUserSchema = UserSchema.pick({
  username: true,
}).extend({
  password: z.string().refine((value) => isStrongPassword(value), {
    message:
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
  }),
});

export const EditUserSchema = UserSchema.pick({
  firstname: true,
  lastname: true,
  hashedPassword: true,
  provider: true,
  avatar: true,
  role: true,
  status: true,
  payment: true,
  subscriptionId: true,
  isVerified: true,
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

export const RequestEmailSchema = UserSchema.pick({
  email: true,
});

export const ResetPasswordSchema = UserSchema.pick({})
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

export type SignUpUserDTO = z.infer<typeof SignUpUserSchema>;
export type SignInUserDTO = z.infer<typeof SignInUserSchema>;
export type EditUserDTO = z.infer<typeof EditUserSchema>;
export type GetUserDTO = z.infer<typeof GetUserSchema>;
export type RequestEmailDTO = z.infer<typeof RequestEmailSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
