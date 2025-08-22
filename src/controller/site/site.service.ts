import { PrismaService } from '../../data/prisma.service';
import { Injectable } from '@nestjs/common';
import { Floor, Room, SData } from './site.type';

@Injectable()
export class SiteService {
  constructor(private readonly prisma: PrismaService) {}

  async createSite(site: SData) {
    await this.prisma.site.create({
      data: {
        id: site.id,
        name: site.name,
        type: site.type,
        projectId: site.projectId,
      },
    });
  }

  async updateSite(site: SData) {
    await this.prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        name: site.name,
        mapId: site.mapId,
      },
    });
  }

  async deleteSite(id: string) {
    await this.prisma.site.delete({
      where: {
        id: id,
      },
    });
  }

  getSites() {
    return this.prisma.site.findMany();
  }

  getSite(id: string) {
    return this.prisma.site.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createFloor(floor: Floor) {
    await this.prisma.floor.create({
      data: {
        id: floor.id,
        mapId: floor.mapId,
        level: floor.level,
        name: floor.name,
        siteId: floor.siteId,
      },
    });
  }

  async updateFloor(floor: Floor) {
    await this.prisma.floor.update({
      where: {
        id: floor.id,
      },
      data: {
        name: floor.name,
        level: floor.level,
        mapId: floor.mapId,
      },
    });
  }

  async deleteFloor(id: number) {
    await this.prisma.floor.delete({
      where: {
        id: id,
      },
    });
  }

  getFloors(siteId: string) {
    return this.prisma.floor.findMany({
      where: {
        siteId: siteId,
      },
    });
  }

  getFloor(id: number) {
    return this.prisma.floor.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createRoom(room: Room) {
    await this.prisma.room.create({
      data: {
        id: room.id,
        name: room.name,
        floorId: room.floorId,
        point: {
          create: {
            pointX: room.point.x,
            pointY: room.point.y,
          },
        },
      },
    });
  }

  async updateRoom(room: Room) {
    await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        name: room.name,
        floorId: room.floorId,
        point: {
          update: {
            pointX: room.point.x,
            pointY: room.point.y,
          },
        },
      },
    });
  }

  async deleteRoom(id: number) {
    await this.prisma.room.delete({
      where: {
        id: id,
      },
    });
  }

  getRooms(floorId: number) {
    return this.prisma.room.findMany({
      where: {
        floorId: floorId,
      },
    });
  }

  getRoom(id: number) {
    return this.prisma.room.findUnique({
      where: {
        id: id,
      },
    });
  }
}
