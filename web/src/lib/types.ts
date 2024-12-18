export type Policy = {
  id: string;
  userId: string;
  name?: string;
  purpose?: string;
  procedure?: string;
  policyStatement?: string;
  equipment?: string;
  addendums?: string;
  active?: boolean;
  attachments?: string;
  references?: string;
  relatedLinks?: string;
  originationDate?: string;
  effectiveDate?: string;
  lastApproved?: string;
  lastRevised?: string;
  nextReview?: string;
  ownerId?: string;
  area?: string;
  signatures: Signature[];
} | null;

export type User = {
  id: string;
  email: string;
  password: string;
} | null;

export type Session = {
  id: string;
  token: string;
  expiresAt: string;
} | null;

export type Signature = {
  id: string;
  policyId: string;
  signedAt: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
} | null;