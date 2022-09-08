import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity as Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreatProductDTO, UpdateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    public async getAllPrd(): Promise<Product[]> {
        const rows = await this.productRepository.find();
        return rows;
    }

    public async getById(id: string): Promise<Product> {
        const rows = await this.productRepository.findOne(id);
        return rows;
    }

    public async createPrd(creatProduct: CreatProductDTO): Promise<Product> {
        try {
            const product = this.productRepository.create(creatProduct);
            const resp = await this.productRepository.save(product);
            return resp;
        } catch (error) {
            return error;
        }
    }

    public async updatePrd(updateProduct: UpdateProductDTO): Promise<boolean> {
        try {
            const { prdId } = updateProduct;
            const product = this.productRepository.create(updateProduct);
            await this.productRepository.update({ prdId: prdId }, product)
            return true;
        } catch (error) {
            return false;
        }
    }

    public async deletePrd(id: string): Promise<boolean> {
        try {
            await this.productRepository.softDelete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
}
