import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkImage: Plugin<[], Root> = () => {
  return (tree) => {
    let firstImageNodeFound: boolean = false;

    visit(tree, 'paragraph', (node, index, parent) => {
      if (index === undefined || !parent) {
        return;
      }

      const imageNode = node.children.at(0);

      if (imageNode?.type === 'image') {
        if (!imageNode.alt || !imageNode.title) {
          throw new Error('Missing alt or title value on Image');
        }

        const [width, height] = imageNode.alt.split(/[x:]/);

        parent.children[index] = {
          type: 'nazna-image',
          url: imageNode.url,
          text: imageNode.title ?? undefined,
          width: Number(width),
          height: Number(height),
          loading: firstImageNodeFound ? 'lazy' : undefined,
        };

        firstImageNodeFound = true;
      }
    });
  };
};

declare module 'mdast' {
  export interface NaznaImage {
    type: 'nazna-image';
    url: string;
    text: string | undefined;
    loading: 'eager' | 'lazy' | undefined;
    width: number;
    height: number;
  }

  export interface RootContentMap {
    'nazna-image': NaznaImage;
  }
}
