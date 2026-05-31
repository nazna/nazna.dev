interface Props {
  createdAt: Temporal.Instant;
  updatedAt: Temporal.Instant;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function formatToJapaneseDate(instant: Temporal.Instant): string {
  const { year, month, day, dayOfWeek } = instant.toZonedDateTimeISO('Asia/Tokyo');
  return `${year}年${month}月${day}日(${WEEKDAYS[dayOfWeek]})`;
}

export function Time(props: Props) {
  return (
    <time
      datetime={props.createdAt.toString({ timeZone: 'Asia/Tokyo' })}
      data-updated={`更新日: ${formatToJapaneseDate(props.updatedAt)}`}
    >
      {formatToJapaneseDate(props.createdAt)}
    </time>
  );
}
