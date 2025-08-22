import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PData } from './project.type';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  async createProject(@Body() body: PData) {
    await this.service.createProject(body);
  }

  @Patch()
  async updateProject(@Body() body: PData) {
    await this.service.updateProjectName(body);
  }

  @Delete(':id/bye')
  async deleteProject(@Body() body: PData) {
    await this.service.deleteProject(body.id);
  }

  @Get('all')
  async getProjects() {
    return this.service.getProjects();
  }

  @Get(':id/find')
  async getProject(@Body() body: PData) {
    return this.service.getProject(body.id);
  }
}
