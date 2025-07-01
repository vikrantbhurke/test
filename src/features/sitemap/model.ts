import { Schema, model, models } from "mongoose";
import { Route } from "./enums";
const { ObjectId } = Schema.Types;

const SitemapSchema = new Schema(
  {
    type: { type: String, enum: Object.values(Route), required: true },
    smId: { type: Number, required: true }, // Same as `id` in your sitemap logic
    urlIds: [{ type: ObjectId }],
    lastGeneratedAt: { type: Date, required: true },
  },
  { collection: "Sitemap", timestamps: true }
);

export const Sitemap = models.Sitemap || model("Sitemap", SitemapSchema);
