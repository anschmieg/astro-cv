import { z, defineCollection } from "astro:content";
const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

const cvSchema = z.object({
    name: z.string(),
    summary: z.string().optional(),
    custom_link_label: z.string().optional(),
    custom_link: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    pricing: z.string().optional(),
    oldPricing: z.string().optional(),
    badge: z.string().optional(),
    checkoutUrl: z.string().optional(),
    heroImage: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type CvSchema = z.infer<typeof cvSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const cvCollection = defineCollection({ schema: cvSchema });

export const collections = {
    'blog': blogCollection,
    'cv': cvCollection
}