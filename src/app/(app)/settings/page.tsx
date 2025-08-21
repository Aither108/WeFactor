"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useBeforeUnload } from "@/hooks/use-beforeunload";

export default function SettingsPage() {
  const [isDirty, setIsDirty] = useState(false);
  const [fullName, setFullName] = useState("Alex Turner");
  const [team, setTeam] = useState("Product Development");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST)");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  useBeforeUnload(isDirty);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsDirty(true);
  };

  const handleSwitchChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) => {
    setter(checked);
    setIsDirty(true);
  };

  const handleSaveChanges = () => {
    // In a real app, you'd save the data to a server here.
    setIsDirty(false);
    alert("Changes saved!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-muted rounded-full" />
            <Button variant="outline">Change Photo</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" value={fullName} onChange={handleInputChange(setFullName)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Input id="team" value={team} onChange={handleInputChange(setTeam)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" value={timezone} onChange={handleInputChange(setTimezone)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates via email.
              </p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={handleSwitchChange(setEmailNotifications)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="in-app-notifications">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified within WeFactor.
              </p>
            </div>
            <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={handleSwitchChange(setInAppNotifications)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={!isDirty}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
