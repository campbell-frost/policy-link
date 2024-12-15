export type Policy = {
  id: string;
  userId: string;
  name: string;
  purpose: string;
  procedure: string;
  policyStatement: string;
  equipment: string;
  addendums: string;
  active: boolean;
} | null;

export type User = {
  id: string;
  email: string;
  password: string;
} | null;

export type Session = {
  id: string;
  token: string;
  expiresAt: number;
} | null;