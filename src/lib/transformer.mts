import markdoc, { Config, Node } from '@markdoc/markdoc';
import { imageSize } from 'image-size';

interface Dimension {
  width?: number | undefined;
  height?: number | undefined;
  loading?: 'eager' | 'lazy';
}

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

async function calculateImageSize(src: string): Promise<Dimension> {
  if (!src) {
    return {};
  }

  const response = await fetch(src);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { width, height } = imageSize(buffer);

  return { width, height, loading: 'lazy' };
}

export const config: Config = {
  nodes: {
    paragraph: {
      async transform(node, config) {
        const imageNode = getImageNode(node);

        if (imageNode) {
          const attributes = imageNode.transformAttributes(config);
          const imageAttributes = await calculateImageSize(attributes['src']);
          return new markdoc.Tag('Image', { ...attributes, ...imageAttributes });
        }

        return new markdoc.Tag('p', node.transformAttributes(config), node.transformChildren(config));
      },
    },
  },
};
