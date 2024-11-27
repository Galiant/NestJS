export enum ExpenseCategory {
  RENT = 'rent',
  UTILITIES = 'utilities',
  GROCERIES = 'groceries',
  ENTERTAINMENT = 'entertainment',
}

export interface Expense {
  category: ExpenseCategory;
  amount: number;
}

export interface ExpenseBreakdown extends Expense {
  percentage: number;
}
