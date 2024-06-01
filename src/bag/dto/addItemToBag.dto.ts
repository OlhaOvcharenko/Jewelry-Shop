import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min,
    IsOptional
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

    @IsOptional()
    @IsString()
    size?: string;

    
    @IsOptional()
    @IsString()
    sessionId?: string;

}