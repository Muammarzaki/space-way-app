import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Floor, Room, SData } from './site.type';
import { SiteService } from './site.service';
import { SiteGuard, SkipSiteGuard } from './site.guard';
import { ProjectGuard } from '../project/project.guard';

@UseGuards(ProjectGuard, SiteGuard)
@Controller('site')
export class SiteController {
  constructor(private readonly service: SiteService) {}

  @Post()
  @SkipSiteGuard()
  async createSite(
    @Body() body: SData,
    @Headers('X-Project-Id') _projectId: string,
  ) {
    await this.service.createSite(body, _projectId);
  }

  @Patch()
  @SkipSiteGuard()
  async updateSite(
    @Body() body: SData,
    @Headers('X-Project-Id') _projectId: string,
  ) {
    await this.service.updateSite(body, _projectId);
  }

  @Delete(':id/bye')
  @SkipSiteGuard()
  async deleteSite(
    @Param('id') id: string,
    @Headers('X-Project-Id') _projectId: string,
  ) {
    await this.service.deleteSite(id, _projectId);
  }

  @Get('all')
  @SkipSiteGuard()
  async getSites(@Headers('X-Project-Id') _projectId: string) {
    return this.service.getSites(_projectId);
  }

  @Get(':id/find')
  @SkipSiteGuard()
  async getSite(
    @Param('id') id: string,
    @Headers('X-Project-Id') _projectId: string,
  ) {
    return this.service.getSite(id, _projectId);
  }

  @Post(':siteId/floor')
  async createFloor(@Param('siteId') _siteId: string, @Body() body: Floor) {
    body.siteId = _siteId;
    await this.service.createFloor(body, _siteId);
  }

  @Patch(':siteId/floor')
  async updateFloor(@Param('siteId') _siteId: string, @Body() body: Floor) {
    body.siteId = _siteId;
    await this.service.updateFloor(body, _siteId);
  }

  @Delete(':siteId/f/:floorId/bye')
  async deleteFloor(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.deleteFloor(floorId, _siteId);
  }

  @Get(':siteId/floor/all')
  async getFloors(@Param('siteId') siteId: string) {
    await this.service.getFloors(siteId);
  }

  @Get(':siteId/f/:floorId/find')
  async getFloor(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.getFloor(floorId, _siteId);
  }

  @Post(':siteId/f/:floorId/room')
  async createRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Body() body: Room,
  ) {
    body.floorId = _floorId;
    await this.service.createRoom(body, _floorId);
  }

  @Patch(':siteId/f/:floorId/room')
  async updateRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Body() body: Room,
  ) {
    body.floorId = _floorId;
    await this.service.updateRoom(body, _floorId, _siteId);
  }

  @Delete(':siteId/f/:floorId/r/:roomId/bye')
  async deleteRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    await this.service.deleteRoom(roomId, _floorId, _siteId);
  }

  @Get(':siteId/f/:floorId/room/all')
  async getRooms(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.getRooms(floorId, _siteId);
  }

  @Get(':siteId/f/:floorId/r/:roomId/find')
  async getRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    await this.service.getRoom(roomId, _floorId, _siteId);
  }
}
