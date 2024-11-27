import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExpenseCategory } from '../interfaces/expense.interface';

class ExpenseDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  income: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseDto)
  expenses: ExpenseDto[];

  @IsNotEmpty()
  @IsNumber()
  savingsGoalPercentage: number;

  @IsNotEmpty()
  @IsNumber()
  investmentGoalPercentage: number;
}
