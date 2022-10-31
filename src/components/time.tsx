interface TimeProps {
  publishedAt: string;
}

export function Time(props: TimeProps) {
  return (
    <time dateTime={props.publishedAt}>
      {new Intl.DateTimeFormat('ja-JP', { dateStyle: 'full' })
        .format(new Date(props.publishedAt))
        .replace(/(.)曜日$/, '($1)')}
    </time>
  );
}
