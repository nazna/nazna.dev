import { Time } from './time.js';

interface ArticleHeaderProps {
  title: string;
  publishedAt: string;
}

export function ArticleHeader(props: ArticleHeaderProps) {
  return (
    <header>
      <Time publishedAt={props.publishedAt} />
      <h1>{props.title}</h1>
    </header>
  );
}
