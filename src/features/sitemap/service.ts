import { Service } from "@/global/classes";
import { SitemapRepository } from "..";

export class SitemapService extends Service {
  sitemapRepository: SitemapRepository;

  setSitemapRepository(sitemapRepository: SitemapRepository) {
    this.sitemapRepository = sitemapRepository;
  }

  async getSitemap(conditions: any) {
    return await this.sitemapRepository.getSitemap(conditions);
  }

  async setSitemap(filter: any, update: any) {
    await this.sitemapRepository.setSitemap(filter, update);
  }
}
