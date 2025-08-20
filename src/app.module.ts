import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [DataModule, ControllerModule],
})
export class AppModule {}
