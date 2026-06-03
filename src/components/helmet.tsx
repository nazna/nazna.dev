interface Props {
  title: string;
  description: string;
  url: string;
}

export function Helmet(props: Props) {
  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="theme-color" content="oklch(0.97 0.003 265)" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.url} />
      <meta property="og:image" content="https://nazna.dev/favicon.svg" />
      <meta property="og:image:width" content="460" />
      <meta property="og:image:height" content="460" />
      <meta property="og:image:alt" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@naznagg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@18,700&display=swap&text=Hello~ I'm nazna.dev"
        rel="stylesheet"
      />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
      <link rel="canonical" href={props.url} />
    </head>
  );
}
