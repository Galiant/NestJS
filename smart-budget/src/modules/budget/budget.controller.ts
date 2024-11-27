import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
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
  async getBudgetHistory(@Query('userId') userId: string) {
    this.logger.verbose('Returns historical budget calculations for a user.');

    return await this.budgetService.getBudgetHistory(userId);
  }
}
