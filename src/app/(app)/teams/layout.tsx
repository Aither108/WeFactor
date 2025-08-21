import { SubNav } from "@/components/sub-nav";

const subNavLinks = [
  { href: "/teams", label: "Overview" },
  { href: "/teams/collab", label: "Collaboration" },
  { href: "/teams/management", label: "Management" },
  { href: "/teams/settings", label: "Settings" },
];

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <SubNav links={subNavLinks} />
      {children}
    </div>
  );
}


