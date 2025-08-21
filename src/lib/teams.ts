export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Role = {
  id: string;
  name: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  status?: {
    emoji: string;
    message: string;
  };
};

export type OrgState = {
  teams: Team[];
  roles: Role[];
};

export const teamsSeed: OrgState = {
  teams: [
    {
      id: 't-marketing',
      name: 'Marketing',
      description: 'Owns growth, campaigns, and brand.',
      members: [
        { id: 'm-alex', name: 'Alex Turner', email: 'alex@example.com', role: 'Manager' },
        { id: 'm-sam', name: 'Sam Lee', email: 'sam@example.com', role: 'Specialist' },
      ],
    },
    {
      id: 't-product',
      name: 'Product',
      description: 'Product strategy and design.',
      members: [
        { id: 'm-jane', name: 'Jane Doe', email: 'jane@example.com', role: 'PM' },
      ],
    },
  ],
  roles: [
    { id: "admin", name: "Admin" },
    { id: "manager", name: "Manager" },
    { id: "member", name: "Member" },
  ],
};

export const ORG_STORAGE_KEY = 'wefactor-org';

export function loadOrg(): OrgState {
  try {
    const raw = localStorage.getItem(ORG_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as OrgState;
  } catch {}
  return teamsSeed;
}

export function saveOrg(state: OrgState) {
  try { localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(state)); } catch {}
}


