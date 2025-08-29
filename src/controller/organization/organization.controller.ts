import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrgData, OrgMember, Plan, Subscription } from './organization.type';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}
  @Post()
  async createOrganization(@Body() body: OrgData) {
    await this.service.createOrganization(body, '');
  }

  @Patch()
  async updateOrganization(@Body() body: OrgData) {
    await this.service.updateOrganization(body);
  }

  @Delete(':id/bye')
  async deleteOrganization(@Param('id') id: string) {
    await this.service.deleteOrganization(id);
  }

  @Get('all')
  async getOrganizations() {
    return this.service.getOrganizations();
  }

  @Get(':id/find')
  async getOrganization(@Param('id') id: string) {
    return this.service.getOrganization(id);
  }

  @Post(':orgId/member')
  async createOrganizationMember(
    @Param('orgId') _orgId: string,
    @Body() member: OrgMember,
  ) {
    await this.service.createMember(member);
  }

  @Patch('member')
  async updateOrganizationMember(
    @Body('role') newRole: string,
    @Body('memberId', ParseIntPipe) memberId: number,
  ) {
    await this.service.updateMemberRole(memberId, newRole);
  }

  @Delete('member/:id/bye')
  async deleteOrganizationMember(@Param('id', ParseIntPipe) memberId: number) {
    await this.service.deleteMember(memberId);
  }

  @Get(':orgId/member/all')
  async getAllMembers(@Param('orgId') _orgId: string) {
    return this.service.getMembers(_orgId);
  }

  @Get(':orgId/member/:id/find')
  async getMember(
    @Param('orgId') _orgId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.getMember(id, _orgId);
  }

  @Post('subscription')
  async createSubscription(@Body() body: Subscription) {
    await this.service.createSubscription(body.organizationId, body.planId);
  }

  @Patch('subscription/plan')
  async updateSubscriptionPlan(@Body() body: Subscription) {
    await this.service.updateSubscriptionPlan(body.id, body.planId);
  }

  @Patch(':orgId/subscription/extend')
  async extendSubscription(@Param('orgId') orgId: string) {
    await this.service.updateSubscription(orgId);
  }

  @Get(':orgId/subscription')
  getSubscription(@Param('orgId') orgId: string) {
    return this.service.getSubscriptionByOrganizationId(orgId);
  }

  @Post('plan')
  async createPlan(@Body() body: Plan) {
    await this.service.createPlan(body);
  }

  @Patch('plan')
  async updatePlan(@Body() body: Plan) {
    await this.service.updatePlan(body);
  }

  @Delete('plan/:id/bye')
  async deletePlan(@Param('id', ParseIntPipe) id: number) {
    await this.service.deletePlan(id);
  }

  @Get('plan/all')
  async getPlans() {
    return this.service.getPlans();
  }

  @Get('plan/:id/find')
  async getPlan(@Param('id', ParseIntPipe) id: number) {
    return this.service.getPlan(id);
  }
}
