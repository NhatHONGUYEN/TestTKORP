import { Test, TestingModule } from '@nestjs/testing';
import { WeightAnalyticsService } from './weight-analytics.service';

describe('WeightAnalyticsService', () => {
  let service: WeightAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightAnalyticsService],
    }).compile();

    service = module.get<WeightAnalyticsService>(WeightAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
