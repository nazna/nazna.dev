interface HeadProps {
  title: string;
}

export function Head(props: HeadProps) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="canonical" href="https://nanza.dev" />
      <title>nazna.dev</title>
      <meta name="description" content="nazna's website" />
      <meta name="og:title" content={props.title} />
      <meta name="og:type" content="blog" />
      <meta name="og:url" content="https://nazna.dev" />
      <meta name="og:image" content="https://nazna.dev/favicon.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@naznagg" />
      <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
    </>
  );
}
