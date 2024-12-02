import { Controller, Get, Query } from '@nestjs/common';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get('evaluate')
  async evaluate(@Query() query: { age: number }) {
    const facts = { age: Number(query.age) };
    const results = await this.rulesService.evaluate(facts);

    return results.events.map((event) => event.params.message);
  }
}
