import { SiteType } from '@prisma/client';

export type SType = SiteType;

export class Point {
  id: number;
  x: number;
  y: number;
}

export class Room {
  id: number;
  name: string;
  floorId: number;
  point: Point;
}

export class Floor {
  id: number;
  name: string;
  level: number;
  mapId: string;
  siteId: string;
}

export class SData {
  id: string;
  name: string;
  type: SType;
  projectId: string;
  mapId: string;
}
