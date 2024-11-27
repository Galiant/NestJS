import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetResponseDto } from './dto/budget-response.dto';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budget')
export class BudgetController {
  private logger = new Logger('TaskController');
  constructor(private readonly budgetService: BudgetService) {}

  @Post('/calculate')
  async calculateBudget(
    @Body() createBudgetDto: CreateBudgetDto,
  ): Promise<BudgetResponseDto> {
    return await this.budgetService.calculateBudget(createBudgetDto);
  }

  @Get('/history')
  getBudgetHistory() {
    this.logger.verbose('Returns historical budget calculations for a user.');

    return this.budgetService.getBudgetHistory();
  }
}
