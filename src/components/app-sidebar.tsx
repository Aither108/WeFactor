import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { MainNav, BottomNav } from "@/components/main-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

export function AppSidebar() {
  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <MainNav />
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Card className="shadow-none rounded-lg bg-sidebar-accent border-none">
          <CardHeader className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="https://placehold.co/100x100.png" alt="@alex" data-ai-hint="person" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">Alex Turner</CardTitle>
                <CardDescription>Gold Tier</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
             <div className="text-xs text-muted-foreground mb-2">Next tier: 450/1000 pts</div>
             <Progress value={45} className="h-2" />
          </CardContent>
        </Card>
        <SidebarSeparator />
        <BottomNav />
      </SidebarFooter>
    </>
  );
}
