import { OrganizationType } from '@prisma/client';

export type OrgType = OrganizationType;

export class OrgData {
  id: string;
  name: string;
  type: string;
  address: string;
  email?: string;
  phone?: string;
  ownerId: string;
}

export class OrgMember {
  id: number;
  organizationId: string;
  role: string;
  userId: string;
  joinAt: Date;
}

export class Subscription {
  id: number;
  organizationId: string;
  planId: number;
  startAt: Date;
  endAt: Date;
  status: string;
}

export class Plan {
  id: number;
  name: string;
  price: number;
  durationDays: number;
}
