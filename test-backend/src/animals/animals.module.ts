import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';

@Module({
  providers: [AnimalsService, AnimalsResolver]
})
export class AnimalsModule {}
