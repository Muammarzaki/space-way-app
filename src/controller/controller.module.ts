import { Module } from '@nestjs/common';
import { VectorController } from './vector/vector.controller';
import { ProjectController } from './project/project.controller';
import { SiteController } from './site/site.controller';
import { MapController } from './map/map.controller';
import { AccountController } from './account/account.controller';
import { OrganizationController } from './organization/organization.controller';

@Module({
  controllers: [
    VectorController,
    ProjectController,
    SiteController,
    MapController,
    AccountController,
    OrganizationController,
  ],
})
export class ControllerModule {}
