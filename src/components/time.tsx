interface TimeProps {
  publishedAt: string;
}

export const Time = ({ publishedAt }: TimeProps) => (
  <time dateTime={publishedAt}>
    {new Intl.DateTimeFormat('ja-JP', { dateStyle: 'full' }).format(new Date(publishedAt)).replace(/(.)曜日$/, '($1)')}
  </time>
);
