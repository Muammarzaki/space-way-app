import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SVGValidationPipe, vectorStorage } from './vector.pipe';
import { VectorService } from './vector.service';
import { VData } from './vector.type';
import { ProjectGuard } from '../project/project.guard';

@UseGuards(ProjectGuard)
@Controller('vector')
export class VectorController {
  constructor(private readonly service: VectorService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('vector', { storage: vectorStorage('vector') }),
  )
  async preUploadSVGFile(
    @UploadedFile(new SVGValidationPipe())
    file: Express.Multer.File,
    @Body() body: VData,
  ) {
    await this.service.saveVector(file, body);
  }

  @Patch()
  async updateSVGFile(@Body() body: VData) {
    await this.service.updateVector(body);
  }

  @Delete(':id/bye')
  async deleteSVGFile(@Param('id') id: string) {
    await this.service.deleteVector(id);
  }

  @Get(':id/find')
  async getSVGFile(@Param('id') id: string) {
    return this.service.getVector(id);
  }

  @Get('all')
  async getSVGFileList() {
    return this.service.getVectorList();
  }
}
