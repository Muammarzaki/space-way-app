import { Module } from '@nestjs/common';
import { VectorController } from './vector/vector.controller';

@Module({
  controllers: [VectorController],
})
export class ControllerModule {}
