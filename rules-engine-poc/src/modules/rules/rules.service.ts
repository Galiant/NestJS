import { Injectable } from '@nestjs/common';
import { Engine } from 'json-rules-engine';

@Injectable()
export class RulesService {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();

    // Define rules
    this.engine.addRule({
      conditions: {
        all: [
          {
            fact: 'age',
            operator: 'greaterThanInclusive',
            value: 18,
          },
        ],
      },
      event: {
        type: 'isAdult',
        params: {
          message: 'User is an adult.',
        },
      },
    });
  }

  async evaluate(facts: Record<string, any>) {
    return await this.engine.run(facts);
  }

  addRule(rule: any) {
    this.engine.addRule(rule);
  }
}
