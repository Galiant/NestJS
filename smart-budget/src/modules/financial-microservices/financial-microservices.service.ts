import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FinancialMicroservicesService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('EXCHANGE_RATE_API_URL');
    this.apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
  }

  async getExchangeRate(currency: string): Promise<number> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}&symbols=${currency}`;

    const response = await lastValueFrom(this.httpService.get(url));

    const rate = response.data;
    if (!rate) {
      throw new Error(`Unable to retrieve exchange rate for ${currency}`);
    }

    return rate;
  }
}
