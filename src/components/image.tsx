export interface ImageProps {
  src: string;
  title: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | undefined;
}

export function Image(props: ImageProps) {
  return (
    <figure>
      <img
        src={props.src}
        alt={props.title}
        width={props.width}
        height={props.height}
        loading={props.loading}
        decoding="async"
      />
      <figcaption>{props.title}</figcaption>
    </figure>
  );
}
