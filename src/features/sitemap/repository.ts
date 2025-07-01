import { EditMode, Order, SearchMode, Size, Type } from "@/global/enums";
import { Sitemap } from "./model";
import { Repository } from "@/global/classes";

export class SitemapRepository extends Repository {
  filter = {};
  type = Type.Paged;
  size = Size.Large;
  sort = "updatedAt";
  mode = SearchMode.Or;
  order = Order.Ascending;
  populate = [];
  searchFields = [];
  populateSelect = [];
  select = "";

  async getSitemap(conditions: any) {
    // conditions = { type, smId }

    return await this.getOne(Sitemap, {
      conditions,
      select: this.select,
      populate: this.populate,
      populateSelect: this.populateSelect,
    });
  }

  async setSitemap(filter: any, update: any) {
    await this.editOne(Sitemap, {
      filter,
      update,
      mode: EditMode.Set,
    });
  }
}
