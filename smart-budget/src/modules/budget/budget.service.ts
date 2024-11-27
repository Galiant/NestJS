import { BadRequestException, Injectable } from '@nestjs/common';
import { BudgetResponseDto } from './dto/budget-response.dto';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Expense, ExpenseBreakdown } from './interfaces/expense.interface';

@Injectable()
export class BudgetService {
  constructor() {}

  async calculateBudget(data: CreateBudgetDto): Promise<BudgetResponseDto> {
    const totalExpenses = this.calculateTotalExpenses(data.expenses);
    if (
      data.income <
      totalExpenses +
        data.income * (data.savingsGoalPercentage / 100) +
        data.income * (data.investmentGoalPercentage / 100)
    ) {
      throw new BadRequestException(
        'Income must be greater than total expenses, savings, and investments',
      );
    }
    const savings = this.calculateSavings(
      data.income,
      data.savingsGoalPercentage,
    );
    const investments = this.calculateInvestments(
      data.income,
      data.investmentGoalPercentage,
    );
    const disposableIncome =
      data.income - totalExpenses - savings - investments;
    return {
      userId: data.userId,
      income: data.income,
      totalExpenses,
      savings,
      investments,
      disposableIncome,
      expenseBreakdown: this.generateExpenseBreakdown(
        data.expenses,
        data.income,
      ),
    };
  }
  private calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
  private calculateSavings(income: number, percentage: number): number {
    return income * (percentage / 100);
  }
  private calculateInvestments(income: number, percentage: number): number {
    return income * (percentage / 100);
  }
  private generateExpenseBreakdown(
    expenses: Expense[],
    income: number,
  ): ExpenseBreakdown[] {
    return expenses.map((expense) => ({
      category: expense.category,
      amount: expense.amount,
      percentage: (expense.amount / income) * 100,
    }));
  }

  getBudgetHistory(): number {
    return 1;
  }
}
