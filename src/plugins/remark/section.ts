import type { Heading, NaznaSection, Node, Root } from 'mdast';
import type { Plugin } from 'unified';
import { findAfter } from 'unist-util-find-after';
import { visit } from 'unist-util-visit';

export const remarkSection: Plugin<[], Root> = () => {
  return (tree) => {
    for (let depth = 6; depth > 0; depth -= 1) {
      visit(
        tree,
        (node): node is Heading => node.type === 'heading' && (node as Heading).depth === depth,
        (node, index, parent) => {
          if (index === undefined || !parent) {
            return;
          }

          const isEnd = (node: Node): node is Heading => node.type === 'heading' && (node as Heading).depth <= depth;
          const end = findAfter(parent, node, isEnd);
          const endIndex = end ? parent.children.indexOf(end) : -1;

          const between = parent.children.slice(index, endIndex > 0 ? endIndex : undefined);

          const section: NaznaSection = {
            type: 'nazna-section',
            children: between,
          };

          parent.children.splice(index, section.children.length, section);
        },
      );
    }
  };
};

declare module 'mdast' {
  export interface NaznaSection {
    type: 'nazna-section';
    children: RootContent[];
  }

  export interface RootContentMap {
    'nazna-section': NaznaSection;
  }
}
