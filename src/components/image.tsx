interface ImageProps {
  src: string;
  alt: string;
  title: string;
  width: number | undefined;
  height: number | undefined;
  loading: 'eager' | 'lazy' | undefined;
}

export const Image = ({ src, alt, title, width, height, loading }: ImageProps) => (
  <figure>
    <img src={src} alt={alt} width={width} height={height} decoding="async" loading={loading} />
    <figcaption>{title}</figcaption>
  </figure>
);
