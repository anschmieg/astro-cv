import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkSectionize from "remark-sectionize";
import remarkHeadingId from "remark-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://astrofy-template.netlify.app",
  integrations: [mdx(), sitemap(), tailwind()],
  buildOptions: {
    publicCSS: true,
  },
  markdownOptions: {
    remarkPlugins: [remarkSectionize, remarkHeadingId],
  },
});
