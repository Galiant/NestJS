import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from '../auth/auth.module';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    {
      provide: TasksRepository,
      useFactory: (dataSource: DataSource) => {
        return new TasksRepository(dataSource);
      },
      inject: [DataSource],
    },
    TasksService,
  ],
  exports: [TasksRepository],
})
export class TasksModule {}
