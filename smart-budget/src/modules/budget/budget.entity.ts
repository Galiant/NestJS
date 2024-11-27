import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenseBreakdown } from './interfaces/expense.interface';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('decimal')
  income: number;

  @Column('decimal')
  totalExpenses: number;

  @Column('decimal')
  savings: number;

  @Column('decimal')
  investments: number;

  @Column('decimal')
  disposableIncome: number;

  @Column({ type: 'json', nullable: true })
  expenseBreakdown: ExpenseBreakdown[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
