"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const link = navLinks.find(link => link.href === href);
    const label = link ? link.label : segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, label };
  });

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <Link href="/dashboard" className="hover:text-foreground">
        Dashboard
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          <Link href={breadcrumb.href} className="hover:text-foreground">
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
