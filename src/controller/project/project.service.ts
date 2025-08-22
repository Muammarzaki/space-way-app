import { PrismaService } from '../../data/prisma.service';
import { Injectable } from '@nestjs/common';
import { PData } from './project.type';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(project: PData) {
    await this.prisma.project.create({
      data: {
        id: project.id,
        organizationId: project.organizationId,
        name: project.name,
      },
    });
  }

  async updateProjectName(project: PData) {
    await this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
      },
    });
  }

  async deleteProject(id: string) {
    await this.prisma.project.delete({
      where: {
        id: id,
      },
    });
  }

  getProjects() {
    return this.prisma.project.findMany();
  }

  getProject(id: string) {
    return this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }
}
