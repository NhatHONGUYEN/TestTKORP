import { Resolver, Query } from '@nestjs/graphql';
import { WeightAnalyticsService } from './weight-analytics.service';
import {
  OwnerHeaviestAnimal,
  OwnerAnimalsWeight,
} from '../types/statistics.types';

@Resolver()
export class WeightAnalyticsResolver {
  constructor(
    private readonly weightAnalyticsService: WeightAnalyticsService,
  ) {}

  @Query(() => OwnerHeaviestAnimal)
  async ownerWithHeaviestAnimal(): Promise<OwnerHeaviestAnimal> {
    return await this.weightAnalyticsService.findOwnerWithHeaviestAnimal();
  }

  @Query(() => OwnerAnimalsWeight)
  async ownerWithHeaviestAnimalsGroup(): Promise<OwnerAnimalsWeight> {
    return await this.weightAnalyticsService.findOwnerWithHeaviestAnimalsGroup();
  }
}
