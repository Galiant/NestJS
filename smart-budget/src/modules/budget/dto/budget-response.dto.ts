import { IsArray, IsNumber, IsString } from 'class-validator';
import { ExpenseBreakdown } from '../interfaces/expense.interface';

export class BudgetResponseDto {
  @IsString()
  userId: string;

  @IsNumber()
  income: number;

  @IsNumber()
  totalExpenses: number;

  @IsNumber()
  savings: number;

  @IsNumber()
  investments: number;

  @IsNumber()
  disposableIncome: number;

  @IsArray()
  expenseBreakdown: ExpenseBreakdown[];
}
