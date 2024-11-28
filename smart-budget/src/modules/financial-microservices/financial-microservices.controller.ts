import { Controller, Get, Query } from '@nestjs/common';
import { FinancialMicroservicesService } from './financial-microservices.service';

@Controller('financial-microservices')
// @UseGuards(JwtAuthGuard)
export class FinancialMicroservicesController {
  constructor(
    private readonly financialMicroservices: FinancialMicroservicesService,
  ) {}

  @Get('/exchange-rate')
  async getExchangeRate(
    @Query('currency') currency: string,
  ): Promise<{ rate: number }> {
    const rate = await this.financialMicroservices.getExchangeRate(currency);
    return { rate };
  }
}
