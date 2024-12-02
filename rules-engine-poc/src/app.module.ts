import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RulesController } from './modules/rules/rules.controller';
import { RulesModule } from './modules/rules/rules.module';
import { RulesService } from './modules/rules/rules.service';

@Module({
  imports: [RulesModule],
  controllers: [AppController, RulesController],
  providers: [AppService, RulesService],
})
export class AppModule {}
