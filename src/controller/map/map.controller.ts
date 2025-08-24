import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MData } from './map.type';
import { MapService } from './map.service';
import { ProjectGuard } from '../project/project.guard';

@UseGuards(ProjectGuard)
@Controller('map')
export class MapController {
  constructor(private readonly service: MapService) {}

  @Post()
  async createMap(@Body() body: MData) {
    await this.service.createMap(body);
  }

  @Patch()
  async updateMap(@Body() body: MData) {
    await this.service.updateMap(body);
  }

  @Delete(':id/bye')
  async deleteMap(@Param('id') id: string) {
    await this.service.deleteMap(id);
  }

  @Get('all')
  async getMaps() {
    return this.service.getMaps();
  }

  @Get(':id/find')
  async getMap(@Param('id') id: string) {
    return this.service.getMap(id);
  }
}
