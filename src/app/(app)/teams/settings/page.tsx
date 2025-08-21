"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loadOrg, saveOrg, teamsSeed, type OrgState, type Role } from '@/lib/teams';

export default function TeamSettingsPage() {
  const [org, setOrg] = useState<OrgState>(teamsSeed);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => { setOrg(loadOrg()); }, []);
  useEffect(() => { saveOrg(org); }, [org]);

  function addRole() {
    if (!newRoleName.trim()) return;
    const newRole: Role = { id: `role-${Date.now()}`, name: newRoleName.trim() };
    setOrg(prev => ({ ...prev, roles: [...prev.roles, newRole] }));
    setNewRoleName('');
  }

  function removeRole(roleId: string) {
    setOrg(prev => ({ ...prev, roles: prev.roles.filter(r => r.id !== roleId) }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Org Settings</h1>
        <p className="text-muted-foreground">Manage roles for your organisation.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Roles</CardTitle>
          <CardDescription>Define roles for your organisation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="New role name" value={newRoleName} onChange={e => setNewRoleName(e.target.value)} />
            <Button onClick={addRole}>Add Role</Button>
          </div>
          <div className="space-y-2">
            {org.roles.map(role => (
              <div key={role.id} className="flex items-center justify-between rounded-lg border p-3">
                <p className="font-medium">{role.name}</p>
                <Button variant="destructive" size="sm" onClick={() => removeRole(role.id)}>Remove</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


