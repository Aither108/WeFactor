"use client";

import Link from "next/link";
import { usePathname } from "@/hooks/use-pathname";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type SubNavProps = {
  links: {
    href: string;
    label: string;
  }[];
};

export function SubNav({ links }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({ variant: isActive ? "default" : "outline" }),
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
