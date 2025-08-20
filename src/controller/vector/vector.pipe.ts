import { diskStorage } from 'multer';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'node:fs';

export const vectorStorage = (folder: string) => {
  return diskStorage({
    destination: `./uploads/${folder}/`,
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    },
  });
};

@Injectable()
export class SVGValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number = 5 * 1024 * 1024) {}

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const removeFile = () => {
      try {
        fs.unlinkSync(file.path);
      } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.warn('Failed to remove invalid file:', e.message);
      }
    };

    if (file.mimetype !== 'image/svg+xml') {
      removeFile();
      throw new BadRequestException('Only SVG files are allowed');
    }

    if (file.size > this.maxSize) {
      removeFile();
      throw new BadRequestException(
        `File size must not exceed ${this.maxSize / (1024 * 1024)}MB`,
      );
    }

    return file;
  }
}
