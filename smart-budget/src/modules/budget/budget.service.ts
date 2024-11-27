import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Expense, ExpenseBreakdown } from './interfaces/expense.interface';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async calculateBudget(data: CreateBudgetDto): Promise<Budget> {
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

    const budget = this.budgetRepository.create({
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
    });

    return await this.budgetRepository.save(budget);
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

  async getBudgetHistory(userId: string): Promise<Budget[]> {
    const userData = await this.budgetRepository.find({
      where: {
        userId,
      },
    });

    if (!userData) {
      throw new NotFoundException(`Data with user ID ${userId} not found`);
    }

    return userData;
  }
}
