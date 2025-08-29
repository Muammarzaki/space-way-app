import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../data/prisma.service';
import { OrgData, OrgMember, Plan } from './organization.type';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(org: OrgData, ownerId: string) {
    await this.prisma.organization.create({
      data: {
        id: org.id,
        name: org.name,
        address: org.address,
        phone: org.phone,
        email: org.email,
        organizationType: org.type,
        ownerId: ownerId ?? org.ownerId,
      },
    });
  }

  async updateOrganization(org: OrgData) {
    await this.prisma.organization.update({
      where: {
        id: org.id,
      },
      data: {
        name: org.name,
        address: org.address,
        phone: org.phone,
        email: org.email,
      },
    });
  }

  async deleteOrganization(orgId: string) {
    await this.prisma.organization.delete({
      where: {
        id: orgId,
      },
    });
  }

  getOrganizations() {
    return this.prisma.organization.findMany();
  }

  getOrganization(org: string) {
    return this.prisma.organization.findUnique({
      where: {
        id: org,
      },
    });
  }

  createMember(member: OrgMember) {
    return this.prisma.member.create({
      data: {
        id: member.id,
        organizationId: member.organizationId,
        userId: member.userId,
        role: member.role,
      },
    });
  }

  async updateMemberRole(memberId: number, newRole: string) {
    return this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        role: newRole,
      },
    });
  }

  getMembers(orgId: string) {
    return this.prisma.member.findMany({
      where: {
        organizationId: orgId,
      },
    });
  }

  async getMember(memberId: number, orgId: string) {
    return this.prisma.member.findUnique({
      where: {
        id: memberId,
        organizationId: orgId,
      },
    });
  }

  async deleteMember(memberId: number) {
    return this.prisma.member.delete({
      where: {
        id: memberId,
      },
    });
  }

  async createPlan(planData: Plan) {
    await this.prisma.plan.create({
      data: {
        id: planData.id,
        name: planData.name,
        price: planData.price,
        durationDays: planData.durationDays,
      },
    });
  }

  async updatePlan(planData: Plan) {
    await this.prisma.plan.update({
      where: {
        id: planData.id,
      },
      data: {
        name: planData.name,
        price: planData.price,
        durationDays: planData.durationDays,
      },
    });
  }

  async deletePlan(planId: number) {
    await this.prisma.plan.delete({
      where: {
        id: planId,
      },
    });
  }

  getPlans() {
    return this.prisma.plan.findMany();
  }

  getPlan(planId: number) {
    return this.prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });
  }

  async createSubscription(organizationId: string, planId: number) {
    const plan = await this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    await this.prisma.subscription.create({
      data: {
        organizationId: organizationId,
        planId: planId,
        endDate: new Date(Date.now() + plan.durationDays),
      },
    });
  }

  async updateSubscription(orgId: string) {
    const subscription = await this.getSubscriptionByOrganizationId(orgId);

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const plan = await this.getPlan(subscription.planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    await this.prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        endDate: new Date(Date.now() + plan.durationDays),
      },
    });
  }

  async updateSubscriptionPlan(id: number, planId: number) {
    const plan = await this.getPlan(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    await this.prisma.subscription.update({
      where: {
        id: id,
      },
      data: {
        planId: planId,
        endDate: new Date(Date.now() + plan.durationDays),
      },
    });
  }

  getSubscriptionByOrganizationId(orgId: string) {
    return this.prisma.subscription.findUnique({
      where: {
        organizationId: orgId,
      },
    });
  }
}
