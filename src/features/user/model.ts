import { Schema, model, models } from "mongoose";
import { Gender, Role, Provider, Status } from "./enums";
import { Payment } from "@/features/payment/enums";
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    avatar: { type: Object, default: { secureUrl: "", publicId: "" } },
    favBookId: { type: ObjectId, ref: "Book", default: null },
    gender: { type: String, enum: Object.values(Gender), required: true },
    role: { type: String, enum: Object.values(Role), default: Role.Public },
    provider: [
      {
        type: String,
        enum: Object.values(Provider),
        default: Provider.credentials,
      },
    ],
    payment: {
      type: String,
      enum: Object.values(Payment),
      default: Payment.Free,
    },
    subscriptionId: { type: String, default: "" },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Inactive,
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);
