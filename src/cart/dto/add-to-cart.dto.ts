import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min
} from 'class-validator';
  
export class addToCartDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    totalAmount: number;
}