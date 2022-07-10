import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Category } from './category';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return await this.categoryService.getMany();
  }

  @Query(() => Category)
  async category(
    @Args('id')
    id: string,
  ) {
    return await this.categoryService.get(id);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args({ name: 'input', type: () => CreateCategoryDTO })
    data: CreateCategoryDTO,
  ) {
    return await this.categoryService.create(data);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args({ name: 'input', type: () => UpdateCategoryDTO })
    data: UpdateCategoryDTO,
  ) {
    return await this.categoryService.update(data);
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
