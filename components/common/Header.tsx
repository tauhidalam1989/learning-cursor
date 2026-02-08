import Link from 'next/link';
import { navLinks } from './nav-config';

export function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur" role="banner">
      <nav
        className="container mx-auto px-4 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-semibold focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2">
          Logo
        </Link>
        <ul className="flex gap-6" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-gray-600 hover:text-gray-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
