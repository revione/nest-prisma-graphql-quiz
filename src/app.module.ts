import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    CoreModule,
    CategoryModule,
    QuestionModule,
    AnswerModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
