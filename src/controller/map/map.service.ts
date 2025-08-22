import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../data/prisma.service';
import { MData } from './map.type';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async createMap(map: MData) {
    await this.prisma.map.create({
      data: {
        id: map.id,
        name: map.name,
        sVGFileId: map.sVGFileId,
      },
    });
  }

  async updateMap(map: MData) {
    await this.prisma.map.update({
      where: {
        id: map.id,
      },
      data: {
        id: map.name,
      },
    });
  }

  async deleteMap(id: string) {
    await this.prisma.map.delete({
      where: {
        id: id,
      },
    });
  }

  getMaps() {
    return this.prisma.map.findMany();
  }

  getMap(id: string) {
    return this.prisma.map.findUnique({
      where: {
        id: id,
      },
    });
  }
}
