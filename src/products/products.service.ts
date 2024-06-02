import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
   constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  async search(query: string): Promise<Product[]> {
    const lowerCaseQuery = query.toLowerCase();
    const products = await this.prismaService.product.findMany({
      where: {
        OR: [
          { name: { contains: lowerCaseQuery } },
          { category: { contains: lowerCaseQuery } },
      
        ],
      },
    });
    return products;
  }

}
