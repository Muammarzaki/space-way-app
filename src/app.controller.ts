import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SVGValidationPipe, vectorStorage } from './vector.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file/svg/upload')
  @UseInterceptors(
    FileInterceptor('vector', { storage: vectorStorage('vector') }),
  )
  preUploadSVGFile(
    @UploadedFile(new SVGValidationPipe())
    file: Express.Multer.File,
  ) {
    return 'oke';
  }
}
