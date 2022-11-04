interface BlockquoteProps {
  body: string;
  description: string;
}

export function Blockquote(props: BlockquoteProps) {
  return (
    <figure>
      <blockquote>
        <p>{props.body}</p>
      </blockquote>
      <figcaption>{props.description}</figcaption>
    </figure>
  );
}
