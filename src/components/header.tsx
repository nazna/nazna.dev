import pkg from '../../package.json' with { type: 'json' };

export function Header() {
  return (
    <header>
      <nav>
        <a href="/" class="google-sans">
          {pkg.name}
        </a>
      </nav>
    </header>
  );
}
