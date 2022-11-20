import markdoc, { Config, Node } from '@markdoc/markdoc';
import type { ImageProps } from '../components/image.js';

type Dimension = Pick<ImageProps, 'width' | 'height' | 'loading'>;

function getImageNode(node: Node): markdoc.Node | undefined {
  if (
    node.type === 'paragraph' &&
    node.children[0]?.type === 'inline' &&
    node.children[0].children[0]?.type === 'image'
  ) {
    return node.children[0]?.children[0];
  }

  return undefined;
}

async function parseImageSize(alt: string): Promise<Dimension> {
  if (!alt) {
    return {};
  }

  const parsed = alt.split(/[x:]/);

  const width = Number(parsed[0]);
  const height = Number(parsed[1]);
  const loading = parsed[2] === 'eager' ? undefined : 'lazy';

  return { width, height, loading };
}

export const config: Config = {
  nodes: {
    paragraph: {
      async transform(node, config) {
        const imageNode = getImageNode(node);

        if (imageNode) {
          const attributes = imageNode.transformAttributes(config);
          const imageAttributes = await parseImageSize(attributes['alt']);

          return new markdoc.Tag('Image', { ...attributes, ...imageAttributes });
        }

        return new markdoc.Tag('p', node.transformAttributes(config), node.transformChildren(config));
      },
    },
  },
};
