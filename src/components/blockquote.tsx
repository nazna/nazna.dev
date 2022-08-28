interface BlockquoteProps {
  body: string;
  description: string;
}

export const Blockquote = ({ body, description }: BlockquoteProps) => (
  <figure>
    <blockquote>
      <p>{body}</p>
    </blockquote>
    <figcaption>{description}</figcaption>
  </figure>
);
