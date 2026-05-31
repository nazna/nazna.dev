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
      <meta name="og:type" content="blog" />
      <meta name="og:title" content={props.title} />
      <meta name="og:url" content={props.url} />
      <meta name="og:image" content="https://nazna.dev/favicon.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@naznagg" />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
      <link rel="canonical" href={props.url} />
    </head>
  );
}
