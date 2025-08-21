import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Goal,
  Kanban,
  Megaphone,
  UserCircle,
  Settings,
  Building,
  Briefcase,
} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  isBottom?: boolean;
  parent?: string;
};

export const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/surveys", label: "Surveys", icon: ClipboardList },
  { href: "/coaching", label: "1-on-1 Coaching", icon: Users },
  { href: "/goals", label: "Goals & Milestones", icon: Goal },
  { href: "/action-plan", label: "Action Plan & Points", icon: Kanban },
  { href: "/shout-outs", label: "Shout-outs", icon: Megaphone },
  { href: "/teams", label: "Teams & Org", icon: Building },
  {
    href: "/teams/management",
    label: "Team Management",
    icon: Users,
    parent: "/teams",
  },
  {
    href: "/teams/settings",
    label: "Org Settings",
    icon: Settings,
    parent: "/teams",
  },
  {
    href: "/settings",
    label: "Profile / Settings",
    icon: Settings,
    isBottom: true,
  },
];
