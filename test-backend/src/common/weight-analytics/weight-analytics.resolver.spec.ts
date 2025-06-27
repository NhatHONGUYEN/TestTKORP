import { Test, TestingModule } from '@nestjs/testing';
import { WeightAnalyticsResolver } from './weight-analytics.resolver';

describe('WeightAnalyticsResolver', () => {
  let resolver: WeightAnalyticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightAnalyticsResolver],
    }).compile();

    resolver = module.get<WeightAnalyticsResolver>(WeightAnalyticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
