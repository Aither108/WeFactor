"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { loadOrg, saveOrg, teamsSeed, type OrgState, type Team, type TeamMember } from '@/lib/teams';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TeamManagementPage() {
  const [org, setOrg] = useState<OrgState>(teamsSeed);
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('Member');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  useEffect(() => { setOrg(loadOrg()); }, []);
  useEffect(() => { saveOrg(org); }, [org]);

  function addTeam() {
    if (!teamName.trim()) return;
    const t: Team = { id: `t-${Date.now()}`, name: teamName.trim(), description: teamDesc.trim(), members: [] };
    setOrg(prev => ({ ...prev, teams: [t, ...prev.teams] }));
    setTeamName(''); setTeamDesc('');
  }
  function addMember() {
    if (!selectedTeamId || !memberName.trim()) return;
    const m: TeamMember = { id: `u-${Date.now()}`, name: memberName.trim(), email: memberEmail.trim(), role: memberRole };
    setOrg(prev => ({ ...prev, teams: prev.teams.map(t => t.id === selectedTeamId ? { ...t, members: [m, ...t.members] } : t) }));
    setMemberName(''); setMemberEmail(''); setMemberRole('Member');
  }
  function removeTeam(teamId: string) {
    setOrg(prev => ({ ...prev, teams: prev.teams.filter(t => t.id !== teamId) }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground">Create teams, assign members and manage existing teams.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Team</CardTitle>
          <CardDescription>Define a new team in your organisation.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-1">
            <Input placeholder="Team Name" value={teamName} onChange={e=>setTeamName(e.target.value)} />
          </div>
          <div className="md:col-span-1">
            <Textarea placeholder="Description" value={teamDesc} onChange={e=>setTeamDesc(e.target.value)} />
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={addTeam}>Add Team</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Member</CardTitle>
          <CardDescription>Tag users into a team and set their role.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          <div className="md:col-span-1">
            <Label className="text-xs">Team</Label>
            <select className="w-full h-10 rounded-md border px-3" value={selectedTeamId} onChange={e=>setSelectedTeamId(e.target.value)}>
              <option value="">Select team…</option>
              {org.teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <Label className="text-xs">Full name</Label>
            <Input placeholder="Full name" value={memberName} onChange={e=>setMemberName(e.target.value)} />
          </div>
          <div className="md:col-span-1">
            <Label className="text-xs">Email</Label>
            <Input placeholder="Email" value={memberEmail} onChange={e=>setMemberEmail(e.target.value)} />
          </div>
          <div className="md:col-span-1">
            <Label className="text-xs">Role</Label>
            <select className="w-full h-10 rounded-md border px-3" value={memberRole} onChange={e=>setMemberRole(e.target.value)}>
              {org.roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={addMember}>Add Member</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Overview of teams and members.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {org.teams.map(t => (
            <div key={t.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{t.members.length} members</Badge>
                  <Button variant="outline" size="sm">Manage</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the team.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeTeam(t.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
