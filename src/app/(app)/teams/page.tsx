"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loadOrg } from '@/lib/teams';

export default function TeamsIndexPage() {
  const org = loadOrg();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams & Organisation</h1>
          <p className="text-muted-foreground">Manage teams, members and collaborate.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {org.teams.map(t => (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Members: {t.members.length}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


