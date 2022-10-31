interface ImageProps {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  loading?: 'eager' | 'lazy';
}

export function Image(props: ImageProps) {
  return (
    <figure>
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading}
        decoding="async"
      />
      <figcaption>{props.title}</figcaption>
    </figure>
  );
}
