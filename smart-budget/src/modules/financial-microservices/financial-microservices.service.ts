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

  async getExchangeRate(currency: string): Promise<any> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}&symbols=${currency}`;

    const response = await lastValueFrom(this.httpService.get(url));

    const responseData = response.data;

    if (!responseData) {
      throw new Error(`Unable to retrieve exchange rate for ${currency}`);
    }

    return {
      base: responseData.base,
      date: responseData.date,
      rates: responseData.rates,
    };
  }
}
