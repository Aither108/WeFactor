import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Flame className="w-6 h-6" />
      </div>
      <span className="text-xl font-bold">Wefactor</span>
    </div>
  );
}
