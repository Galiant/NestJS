import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { Engine } from 'json-rules-engine';
import * as path from 'path';

@Injectable()
export class RulesService implements OnModuleInit {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
  }

  async onModuleInit() {
    await this.loadRules();
  }

  private async loadRules() {
    const rulesDirectory = path.join(__dirname, 'rules');
    const ruleFiles = fs.readdirSync(rulesDirectory);

    for (const file of ruleFiles) {
      if (file.endsWith('.rule.js')) {
        const rule = await import(path.join(rulesDirectory, file));
        this.engine.addRule(rule.default || rule);
      }
    }
  }

  async evaluate(facts: Record<string, any>) {
    return await this.engine.run(facts);
  }

  addRule(rule: any) {
    this.engine.addRule(rule);
  }
}
