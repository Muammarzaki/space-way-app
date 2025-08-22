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
import { Floor, Room, SData } from './site.type';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly service: SiteService) {}

  @Post()
  async createSite(@Body() body: SData) {
    await this.service.createSite(body);
  }

  @Patch()
  async updateSite(@Body() body: SData) {
    await this.service.updateSite(body);
  }

  @Delete(':id/bye')
  async deleteSite(@Param('id') id: string) {
    await this.service.deleteSite(id);
  }

  @Get('all')
  async getSites() {
    return this.service.getSites();
  }

  @Get(':id/find')
  async getSite(@Param('id') id: string) {
    return this.service.getSite(id);
  }

  @Post(':siteId/floor')
  async createFloor(@Param('siteId') siteId: string, @Body() body: Floor) {
    body.siteId = siteId;
    await this.service.createFloor(body);
  }

  @Patch(':siteId/floor')
  async updateFloor(@Param('siteId') siteId: string, @Body() body: Floor) {
    body.siteId = siteId;
    await this.service.updateFloor(body);
  }

  @Delete(':siteId/:floorId/bye')
  async deleteFloor(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.deleteFloor(floorId);
  }

  @Get(':siteId/floor/all')
  async getFloors(@Param('siteId') siteId: string) {
    await this.service.getFloors(siteId);
  }

  @Get(':siteId/:floorId/find')
  async getFloor(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.getFloor(floorId);
  }

  @Post(':siteId/:floorId/room')
  async createRoom(
    @Param('siteId') _iteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
    @Body() body: Room,
  ) {
    body.floorId = floorId;
    await this.service.createRoom(body);
  }

  @Patch(':siteId/:floorId/room')
  async updateRoom(
    @Param('siteId') _iteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
    @Body() body: Room,
  ) {
    body.floorId = floorId;
    await this.service.updateRoom(body);
  }

  @Delete(':siteId/:floorId/:roomId/bye')
  async deleteRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    await this.service.deleteRoom(roomId);
  }

  @Get(':siteId/:floorId/room/all')
  async getRooms(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) floorId: number,
  ) {
    await this.service.getRooms(floorId);
  }

  @Get(':siteId/:floorId/:roomId/find')
  async getRoom(
    @Param('siteId') _siteId: string,
    @Param('floorId', ParseIntPipe) _floorId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    await this.service.getRoom(roomId);
  }
}
