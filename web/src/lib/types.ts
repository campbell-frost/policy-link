import { UUID } from 'crypto';

export type Policy = {
  ID: UUID;
  UserId: UUID;
  Name: string;
  Purpose: string;
  Procedure: string;
  PolicyStatement: string;
  Equipment: string;
  Addendums: string;
  Active: boolean;
} | null;

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
} | null;