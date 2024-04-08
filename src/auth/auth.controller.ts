import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('/register')
  create(@Body() userData: RegisterDTO){
    return this.authService.register(userData)
  }

}
