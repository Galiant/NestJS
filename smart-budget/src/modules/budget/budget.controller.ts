import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budget')
export class BudgetController {
  private logger = new Logger('TaskController');
  constructor(private readonly budgetService: BudgetService) {}

  @Post('/calculate')
  async calculateBudget(
    @Body() createBudgetDto: CreateBudgetDto,
  ): Promise<Budget> {
    return await this.budgetService.calculateBudget(createBudgetDto);
  }

  @Get('/history')
  getBudgetHistory() {
    this.logger.verbose('Returns historical budget calculations for a user.');

    return this.budgetService.getBudgetHistory();
  }
}
