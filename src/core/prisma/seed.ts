import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import * as fs from 'fs';
import { shuffleArray } from '../../helpers';

const prisma = new PrismaClient();

const dataDir = join(__dirname, 'data');
const filesNames = fs.readdirSync(dataDir);
const files = filesNames.map((file: string) => ({
  name: file.split('.')[0],
  data: JSON.parse(fs.readFileSync(`${dataDir}/${file}`, 'utf-8')),
}));

async function main() {
  Promise.all(
    files.map(
      async (file) =>
        await prisma.category.create({
          data: {
            name: file.name,
            questions: {
              create: file.data.map((question) => ({
                content: question.default_size,
                answers: {
                  create: shuffleArray([
                    ...question.incorrects,
                    question.correct,
                  ]).map((answer) => ({
                    content: answer,
                    isCorrect: answer === question.correct,
                    url: question.url,
                  })),
                },
              })),
            },
          },
        }),
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
