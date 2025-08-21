import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pin } from "lucide-react";

type PinnedIdeasSidebarProps = {
  pinnedPosts: {
    id: string;
    message: string;
  }[];
};

export function PinnedIdeasSidebar({ pinnedPosts }: PinnedIdeasSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pin className="h-5 w-5" />
          <span>Pinned Ideas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pinnedPosts.length > 0 ? (
          pinnedPosts.map((post) => (
            <div key={post.id} className="rounded-lg border bg-card p-3">
              <p className="text-sm">{post.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No pinned ideas yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
