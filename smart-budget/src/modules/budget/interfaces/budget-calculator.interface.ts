import { Injectable } from '@nestjs/common';

export interface IBudgetCalculator {
  calculateBudget(): number;
}

@Injectable()
export class BudgetCalculator implements IBudgetCalculator {
  calculateBudget(): number {
    return 0;
  }
}
