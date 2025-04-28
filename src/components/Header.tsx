import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-foreground/10">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-8">
          <Link href="/" 
                className="text-foreground hover:opacity-80 transition-opacity font-medium">
            Home
          </Link>
          <Link href="/about" 
                className="text-foreground hover:opacity-80 transition-opacity font-medium">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}