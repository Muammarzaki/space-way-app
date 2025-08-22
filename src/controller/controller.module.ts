import { Module } from '@nestjs/common';
import { VectorController } from './vector/vector.controller';
import { ProjectController } from './project/project.controller';
import { SiteController } from './site/site.controller';
import { MapController } from './map/map.controller';

@Module({
  controllers: [
    VectorController,
    ProjectController,
    SiteController,
    MapController,
  ],
})
export class ControllerModule {}
