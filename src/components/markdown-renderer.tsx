import type {
  Break,
  Delete,
  Emphasis,
  Heading,
  InlineCode,
  Link,
  List,
  ListItem,
  NaznaBlockquote,
  NaznaImage,
  NaznaSection,
  NaznaShiki,
  Paragraph,
  RootContent,
  Strong,
  Text,
} from 'mdast';

import pkg from '../../package.json' with { type: 'json' };

export function MarkdownRenderer({ nodes }: { nodes: RootContent[] }) {
  return <NodesRenderer nodes={nodes} />;
}

function NodesRenderer({ nodes }: { nodes: RootContent[] }) {
  return (
    <>
      {nodes.map((node) => {
        switch (node.type) {
          case 'nazna-blockquote':
            return <NaznaBlockquoteNode node={node} />;
          case 'nazna-image':
            return <NaznaImageNode node={node} />;
          case 'nazna-section':
            return <NaznaSectionNode node={node} />;
          case 'nazna-shiki':
            return <NaznaShikiNode node={node} />;
          case 'break':
            return <BreakNode node={node} />;
          case 'delete':
            return <DeleteNode node={node} />;
          case 'emphasis':
            return <EmphasisNode node={node} />;
          case 'heading':
            return <HeadingNode node={node} />;
          case 'inlineCode':
            return <InlineCodeNode node={node} />;
          case 'link':
            return <LinkNode node={node} />;
          case 'list':
            return <ListNode node={node} />;
          case 'listItem':
            return <ListItemNode node={node} />;
          case 'paragraph':
            return <ParagraphNode node={node} />;
          case 'strong':
            return <StrongNode node={node} />;
          case 'text':
            return <TextNode node={node} />;
          case 'thematicBreak':
            return <ThematicBreakNode />;
          default:
            throw new Error(`Unexpected node type: ${JSON.stringify(node.type)}`);
        }
      })}
    </>
  );
}

function NaznaBlockquoteNode({ node }: { node: NaznaBlockquote }) {
  return (
    <blockquote cite={node.link}>
      <NodesRenderer nodes={node.children} />
      <footer>
        {node.by}
        {node.cite && (
          <>
            , <cite>{node.cite}</cite>
          </>
        )}
      </footer>
    </blockquote>
  );
}

function NaznaImageNode({ node }: { node: NaznaImage }) {
  return (
    <figure>
      <img src={node.url} alt={node.text} loading={node.loading} width={node.width} height={node.height} />
      <figcaption>{node.text}</figcaption>
    </figure>
  );
}

function NaznaSectionNode({ node }: { node: NaznaSection }) {
  return (
    <section>
      <NodesRenderer nodes={node.children} />
    </section>
  );
}

function NaznaShikiNode({ node }: { node: NaznaShiki }) {
  return <div data-lang={node.lang} dangerouslySetInnerHTML={{ __html: node.html }} />;
}

function BreakNode(_: { node: Break }) {
  return <br />;
}

function DeleteNode({ node }: { node: Delete }) {
  return (
    <s>
      <NodesRenderer nodes={node.children} />
    </s>
  );
}

function EmphasisNode({ node }: { node: Emphasis }) {
  return (
    <em>
      <NodesRenderer nodes={node.children} />
    </em>
  );
}

function HeadingNode({ node }: { node: Heading }) {
  const Level = (
    {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    } as const
  )[node.depth];

  return (
    <Level>
      <NodesRenderer nodes={node.children} />
    </Level>
  );
}

function InlineCodeNode({ node }: { node: InlineCode }) {
  return <code>{node.value}</code>;
}

function LinkNode({ node }: { node: Link }) {
  const parsed = URL.parse(node.url, pkg.homepage);
  const isInternal = parsed && parsed.origin === pkg.homepage;

  return (
    <a href={node.url} rel={isInternal ? undefined : 'noopener noreferrer'} target={isInternal ? undefined : '_blank'}>
      <NodesRenderer nodes={node.children} />
    </a>
  );
}

function ListNode({ node }: { node: List }) {
  return node.ordered ? (
    <ol>
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul>
      <NodesRenderer nodes={node.children} />
    </ul>
  );
}

function ListItemNode({ node }: { node: ListItem }) {
  return (
    <li>
      <>
        {node.children.map((child) => {
          if (child.type === 'paragraph') {
            return <NodesRenderer nodes={child.children} />;
          }
          return <NodesRenderer nodes={[child]} />;
        })}
      </>
    </li>
  );
}

function ParagraphNode({ node }: { node: Paragraph }) {
  return (
    <p>
      <NodesRenderer nodes={node.children} />
    </p>
  );
}

function StrongNode({ node }: { node: Strong }) {
  return (
    <strong>
      <NodesRenderer nodes={node.children} />
    </strong>
  );
}

function TextNode({ node }: { node: Text }) {
  return <>{node.value}</>;
}

function ThematicBreakNode() {
  return <hr />;
}
