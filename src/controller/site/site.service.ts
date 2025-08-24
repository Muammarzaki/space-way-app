import { PrismaService } from '../../data/prisma.service';
import { Injectable } from '@nestjs/common';
import { Floor, Room, SData } from './site.type';

@Injectable()
export class SiteService {
  constructor(private readonly prisma: PrismaService) {}

  async createSite(site: SData, projectId: string) {
    await this.prisma.site.create({
      data: {
        id: site.id,
        name: site.name,
        type: site.type,
        projectId: projectId ?? site.projectId,
      },
    });
  }

  async updateSite(site: SData, projectId: string) {
    await this.prisma.site.update({
      where: {
        id: site.id,
        projectId: projectId ?? site.projectId,
      },
      data: {
        name: site.name,
        mapId: site.mapId,
      },
    });
  }

  async deleteSite(id: string, projectId: string) {
    await this.prisma.site.delete({
      where: {
        id: id,
        projectId: projectId,
      },
    });
  }

  getSites(projectId: string) {
    return this.prisma.site.findMany({ where: { projectId: projectId } });
  }

  getSite(id: string, projectId: string) {
    return this.prisma.site.findUnique({
      where: {
        id: id,
        projectId: projectId,
      },
    });
  }

  async createFloor(floor: Floor, siteId: string) {
    await this.prisma.floor.create({
      data: {
        id: floor.id,
        mapId: floor.mapId,
        level: floor.level,
        name: floor.name,
        siteId: siteId ?? floor.siteId,
      },
    });
  }

  async updateFloor(floor: Floor, siteId: string) {
    await this.prisma.floor.update({
      where: {
        id: floor.id,
        siteId: siteId ?? floor.siteId,
      },
      data: {
        name: floor.name,
        level: floor.level,
        mapId: floor.mapId,
      },
    });
  }

  async deleteFloor(id: number, siteId: string) {
    await this.prisma.floor.delete({
      where: {
        id: id,
        siteId: siteId,
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

  getFloor(id: number, siteId: string) {
    return this.prisma.floor.findUnique({
      where: {
        id: id,
        siteId: siteId,
      },
    });
  }

  async createRoom(room: Room, floorId: number) {
    await this.prisma.room.create({
      data: {
        id: room.id,
        name: room.name,
        floorId: floorId ?? room.floorId,
        point: {
          create: {
            pointX: room.point.x,
            pointY: room.point.y,
          },
        },
      },
    });
  }

  async updateRoom(room: Room, floorId: number, siteId: string) {
    await this.prisma.room.update({
      where: {
        id: room.id,
        Floor: {
          id: floorId,
          siteId: siteId,
        },
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

  async deleteRoom(id: number, floorId: number, siteId: string) {
    await this.prisma.room.delete({
      where: {
        id: id,
        Floor: {
          id: floorId,
          siteId: siteId,
        },
      },
    });
  }

  getRooms(floorId: number, siteId: string) {
    return this.prisma.room.findMany({
      where: {
        Floor: {
          id: floorId,
          siteId: siteId,
        },
      },
    });
  }

  getRoom(id: number, floorId: number, siteId: string) {
    return this.prisma.room.findUnique({
      where: {
        id: id,
        Floor: {
          id: floorId,
          siteId: siteId,
        },
      },
    });
  }
}
