import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SVGValidationPipe, vectorStorage } from './vector.pipe';
import { VectorService } from './vector.service';
import { VData } from './vector.type';

@Controller('vector')
export class VectorController {
  constructor(private readonly service: VectorService) {}

  @Post('upload')
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

  @Patch('upload')
  async updateSVGFile(@Body() body: VData) {
    await this.service.updateVector(body);
  }

  @Delete(':id/bye')
  async deleteSVGFile(@Param('id') id: string) {
    await this.service.deleteVector(id);
  }

  @Get(':id')
  async getSVGFile(@Param('id') id: string) {
    return this.service.getVector(id);
  }

  @Get('all')
  async getSVGFileList() {
    return this.service.getVectorList();
  }
}
