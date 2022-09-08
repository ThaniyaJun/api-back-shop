import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProductDTO {
    @Expose() prdId: number;
    @Expose() prdName: string;
    @Expose() prdDesc: string;
    prdPrice: number;
    qty: number;
}


@Expose()
export class ProducDetailtDTO {
    prdId: number;
    prdName: string;
    prdDesc: string;
    prdPrice: number;
    qty: number;
}

@Exclude()
export class CreatProductDTO {
    // @Expose() prdId: number;
    @Expose() prdName: string;
    @Expose() prdDesc: string;
    @Expose() prdPrice: number;
    @Expose() qty: number;
} 

@Exclude()
export class UpdateProductDTO {
    @Expose() prdId: number;
    @Expose() prdName: string;
    @Expose() prdDesc: string;
    @Expose() prdPrice: number;
    @Expose() qty: number;
} 