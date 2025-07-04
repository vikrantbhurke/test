import { Sitemap } from "./model";
import { EditMode } from "@/global/enums";
import * as db from "@/global/utilities";

const populate: string[] = [];
const populateSelect: string[] = [];
const select = "";

export async function getSitemap(conditions: any) {
  // conditions = { type, smId }

  return await db.getOne(Sitemap, {
    conditions,
    select,
    populate,
    populateSelect,
  });
}

export async function setSitemap(filter: any, update: any) {
  await db.editOne(Sitemap, {
    filter,
    update,
    mode: EditMode.Set,
  });
}
