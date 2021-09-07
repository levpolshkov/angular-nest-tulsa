import { Module } from '@nestjs/common';
import { BullhornService } from './bullhorn.service';

@Module({
  providers: [BullhornService]
})
export class BullhornModule {}
