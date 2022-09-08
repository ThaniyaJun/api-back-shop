
import { Body, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, Req, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Ok } from 'src/shared/common/http-response';
import { CreatProductDTO, ProducDetailtDTO, ProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('/v1/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Get('/list')
    async getListPrd() {
        try {
            const product = await this.productService.getAllPrd();
            const dto = plainToInstance(ProductDTO, product)
            return dto;
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    async getDetailPrd(@Param('id') prdId: string) {
        try {
            const product = await this.productService.getById(prdId);
            const dto = plainToInstance(ProducDetailtDTO, product)
            return dto;
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async creatProduct(@Body() creatProductDTO: CreatProductDTO) {
        try {
            const newPrd = await this.productService.createPrd(creatProductDTO);
            return newPrd;
        } catch (error) {
            throw error;
        }
    }

    @Put()
    async updateProduct(@Body() UpdateProduct: UpdateProductDTO) {
        try {
            const newData = await this.productService.updatePrd(UpdateProduct);
            return newData;
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    async name(@Param('id') prdId: string) {
        try {
            const newData = await this.productService.deletePrd(prdId);
            return newData;
        } catch (error) {
            throw error;
        }
    }
}
