import markdoc, { Config, Node } from '@markdoc/markdoc';
import { imageSize } from 'image-size';

interface Dimension {
  width: number | undefined;
  height: number | undefined;
  position: number;
}

interface Frontmatter {
  title: string;
  publishedAt: string;
  draft: boolean;
}

export const createConfig = (frontmatter: Frontmatter, imageInfo: Map<string, Dimension>) => {
  const config: Config = {
    nodes: {
      paragraph: {
        transform(node, config) {
          const cnode = node.children?.[0]?.children?.[0];

          if (cnode?.type === 'image') {
            const image = imageInfo.get(cnode.attributes['src']);

            return new markdoc.Tag('Image', {
              ...cnode.attributes,
              width: image?.width,
              height: image?.height,
              loading: Number(image?.position) > 0 ? 'lazy' : 'eager',
            });
          }

          return new markdoc.Tag('p', node.transformAttributes(config), node.transformChildren(config));
        },
      },
      // blockquote: {
      //   children: ['figure', 'figcaption', 'blockquote', 'paragraph'],
      //   transform(node, config) {
      //     console.log(JSON.stringify(node, null, 2));
      //     const children = node.transformChildren(config);
      //     console.log(children);
      //     return new markdoc.Tag('Blockquote', {});
      //   },
      // },
    },
  };

  return config;
};

export const extractDescription = (node: Node, info: Frontmatter): string => {
  return (
    node.children.find((c) => c.type === 'paragraph')?.children[0]?.children[0]?.attributes['content'] || info['title']
  );
};

export const calculateImageSize = async (text: string) => {
  const origins = [/(?<url>https:\/\/.*\.?unsplash\.com\/.+?)[ )\]]/g];

  const dimensionsMap = new Map<string, Dimension>();

  for (const origin of origins) {
    let index = 0;
    let result = null;

    while ((result = origin.exec(text)) !== null) {
      const url = result?.groups?.['url'];

      if (url) {
        const response = await fetch(url);
        const arraybuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arraybuffer);

        const { width, height } = imageSize(buffer);
        dimensionsMap.set(url, { width, height, position: index });
      }

      index += 1;
    }
  }

  return dimensionsMap;
};
