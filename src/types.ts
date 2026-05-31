import type { RootContent } from 'mdast';
import z from 'zod';

export interface Post {
  createdAt: Temporal.Instant;
  slug: string;
  title: string;
  updatedAt: Temporal.Instant;
  draft: boolean;
  description: string;
  nodes: RootContent[];
}

export const FrontmatterSchema = z.object({
  title: z.string(),
  updatedAt: z.string().transform((value) => Temporal.Instant.from(value)),
  draft: z.boolean(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;
