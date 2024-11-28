import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { FinancialMicroservicesController } from './financial-microservices.controller';
import { FinancialMicroservicesService } from './financial-microservices.service';

@Module({
  imports: [HttpModule, ConfigModule, AuthModule],
  providers: [FinancialMicroservicesService],
  controllers: [FinancialMicroservicesController],
  exports: [FinancialMicroservicesService],
})
export class FinancialMicroservicesModule {}
