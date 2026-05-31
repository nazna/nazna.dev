import type { Paragraph, Root, RootContent } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkBlockquote: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (index === undefined || !parent) {
        return;
      }

      const maybeFooterNode = node.children.at(-1) as Paragraph | undefined;
      const first = maybeFooterNode?.children.at(0);

      if (!first || first.type !== 'text' || !first.value.startsWith('--')) {
        return;
      }

      const [by, cite] = first.value.slice(2).trim().split(', ');
      const link = maybeFooterNode?.children.find((c) => c.type === 'link')?.url;

      if (!by) {
        throw new Error('Missing by value on Blockquote');
      }

      const children = node.children.slice(0, -1) as RootContent[];

      parent.children[index] = {
        type: 'nazna-blockquote',
        by,
        cite,
        link,
        children,
      };
    });
  };
};

declare module 'mdast' {
  export interface NaznaBlockquote {
    type: 'nazna-blockquote';
    by: string;
    cite: string | undefined;
    link: string | undefined;
    children: RootContent[];
  }

  export interface RootContentMap {
    'nazna-blockquote': NaznaBlockquote;
  }
}
