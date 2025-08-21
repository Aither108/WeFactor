import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WeFactor. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="text-sm hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-foreground">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm hover:text-foreground">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
