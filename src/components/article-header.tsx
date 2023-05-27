import { Time } from './time.tsx';

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
