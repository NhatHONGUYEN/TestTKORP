import { Module } from '@nestjs/common';
import { WeightAnalyticsService } from './weight-analytics.service';
import { WeightAnalyticsResolver } from './weight-analytics.resolver';

@Module({
  providers: [WeightAnalyticsService, WeightAnalyticsResolver],
})
export class WeightAnalyticsModule {}
