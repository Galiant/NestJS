import { Controller, Get, Query } from '@nestjs/common';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get('evaluate')
  async evaluate(@Query() query: { age?: number; salary?: number }) {
    const facts = {
      age: query.age ? Number(query.age) : undefined,
      salary: query.salary ? Number(query.salary) : undefined,
    };
    const results = await this.rulesService.evaluate(facts);

    return results.events.map((event) => event.params.message);
  }
}
