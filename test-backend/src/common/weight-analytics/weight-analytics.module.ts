import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../../modules/animals/entities/animal.entity';
import { Owner } from '../../modules/owners/entities/owner.entity';
import { WeightAnalyticsService } from './weight-analytics.service';
import { WeightAnalyticsResolver } from './weight-analytics.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Owner])],
  providers: [WeightAnalyticsService, WeightAnalyticsResolver],
  exports: [WeightAnalyticsService],
})
export class WeightAnalyticsModule {}
