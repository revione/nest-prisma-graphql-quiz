import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMany() {
    return await this.prismaService.category.findMany({
      include: { questions: { include: { answers: true } } },
    });
  }

  async get(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      include: { questions: { include: { answers: true } } },
    });

    if (!category)
      throw new NotFoundException(`La categoria con el id ${id} no existe`);

    return category;
  }

  async create(data: CreateCategoryDTO) {
    return await this.prismaService.category.create({
      data,
      include: { questions: { include: { answers: true } } },
    });
  }

  async update(data: UpdateCategoryDTO) {
    return await this.prismaService.category.update({
      where: { id: data.id },
      data,
      include: { questions: { include: { answers: true } } },
    });
  }

  async delete(id: string) {
    return await this.get(id).then(async (category) => {
      await this.prismaService.category.delete({ where: { id: category.id } });
    });
  }
}
