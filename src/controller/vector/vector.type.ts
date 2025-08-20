export type VFile = Express.Multer.File;

export type VFileArray = Express.Multer.File[];

export class VData {
  id: string;
  alt?: string;
  displayName?: string;
  vector?: VFile;
  ratio?: number;
}
