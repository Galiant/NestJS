import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budget]), AuthModule],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
