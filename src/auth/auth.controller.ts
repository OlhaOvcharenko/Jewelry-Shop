import { Body, Controller, Post, Request } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('/register')
  create(@Body() userData: RegisterDTO){
    return this.authService.register(userData)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
    async login(@Request() req) {
    return req.user;
  }

}
