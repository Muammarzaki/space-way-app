import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../data/prisma.service';
import { VData, VFile } from './vector.type';

@Injectable()
export class VectorService {
  constructor(private readonly prisma: PrismaService) {}

  async saveVector(file: VFile, data: VData) {
    await this.prisma.sVGFile.create({
      data: {
        id: file.filename,
        alt: data.alt ?? '',
        sizeKb: file.size,
        ratio: data.ratio ?? 1,
        mimetype: file.mimetype,
        path: file.path,
        displayName: data.displayName ?? file.filename,
      },
    });
  }

  async updateVector(data: VData) {
    await this.prisma.sVGFile.update({
      where: {
        id: data.id,
      },
      data: {
        alt: data.alt,
        displayName: data.displayName,
        ratio: data.ratio,
      },
    });
  }

  async deleteVector(id: string) {
    await this.prisma.sVGFile.delete({
      where: {
        id: id,
      },
    });
  }

  async getVector(id: string) {
    return this.prisma.sVGFile.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getVectorList() {
    return this.prisma.sVGFile.findMany();
  }
}
