import { Schema, model, models } from "mongoose";

const CacheSchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: String, required: true },
  },
  {
    collection: "Cache",
    timestamps: true,
  }
);

CacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Cache = models.Cache || model("Cache", CacheSchema);
