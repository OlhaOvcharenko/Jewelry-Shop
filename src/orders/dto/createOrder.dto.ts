import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Length,
    ArrayNotEmpty,
    Min
} from 'class-validator';
  
export class CreateOrderDTO {
    @IsNotEmpty()
    @Length(4, 20)
    @IsString()
    clientName: string;
  
    @IsNotEmpty()
    @Length(4, 20)
    @IsString()
    clientSurname: string;
  
    @IsNotEmpty()
    @Length(10, 20)
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @Length(9, 20) 
    @IsString()
    phone: string;

    @IsNotEmpty()
    @Length(5, 30)
    @IsString()
    address: string;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    finalAmount: number;
  
    @ArrayNotEmpty()
    @IsUUID("4", { each: true })
    productIds: string[]; 
  }