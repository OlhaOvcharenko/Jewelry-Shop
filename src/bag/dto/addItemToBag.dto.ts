import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min,
    isInt
} from 'class-validator';
  
export class AddItemToBagDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsString()
    sessionId?: string;

}