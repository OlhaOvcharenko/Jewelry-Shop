import { IsNotEmpty, IsString, Length, IsEmail} from "class-validator";
import { Match } from "src/utils/match.decorator";

export class RegisterDTO {
  
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(9, 20) 
  phone: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  @Match('password')
  passwordRepeat: string;


}