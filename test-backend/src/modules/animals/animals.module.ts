import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Owner } from '../owners/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Owner])],
  providers: [AnimalsService, AnimalsResolver],
  exports: [AnimalsService],
})
export class AnimalsModule {}
