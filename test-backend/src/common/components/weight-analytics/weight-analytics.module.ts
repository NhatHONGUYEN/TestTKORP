import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightAnalyticsService } from './weight-analytics.service';
import { WeightAnalyticsResolver } from './weight-analytics.resolver';
import { Animal } from 'src/modules/animals/entities/animal.entity';
import { Owner } from 'src/modules/owners/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Owner])],
  providers: [WeightAnalyticsService, WeightAnalyticsResolver],
  exports: [WeightAnalyticsService],
})
export class WeightAnalyticsModule {}
