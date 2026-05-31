import type { Root } from 'mdast';
import { codeToHtml } from 'shiki';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkShiki: Plugin<[], Root> = () => {
  return async (tree) => {
    const promises: Promise<string>[] = [];

    visit(tree, 'code', (node) => {
      promises.push(codeToHtml(node.value, { lang: node.lang ?? 'text', theme: 'catppuccin-frappe' }));
    });

    const resolved = await Promise.all(promises);

    visit(tree, 'code', (node, index, parent) => {
      if (index === undefined || !parent) {
        return;
      }

      const html = resolved.shift();

      if (!html) {
        throw new Error('Invalid converted html resolved');
      }

      parent.children[index] = {
        type: 'nazna-shiki',
        html,
        lang: node.lang ?? 'text',
      };
    });
  };
};

declare module 'mdast' {
  export interface NaznaShiki {
    type: 'nazna-shiki';
    html: string;
    lang: string;
  }

  export interface RootContentMap {
    'nazna-shiki': NaznaShiki;
  }
}
