import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwtAuth.guard';
import { FinancialMicroservicesService } from './financial-microservices.service';

@Controller('financial-microservices')
@UseGuards(JwtAuthGuard)
export class FinancialMicroservicesController {
  constructor(
    private readonly financialMicroservices: FinancialMicroservicesService,
  ) {}

  @Get('/exchange-rate')
  async getExchangeRate(
    @Query('currency') currency: string,
  ): Promise<{ rates: number }> {
    const rates = await this.financialMicroservices.getExchangeRate(currency);
    return { rates };
  }
}
