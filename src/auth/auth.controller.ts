import { Body, Controller, Post, Request, Response, Delete } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('/register')
  create(@Body() userData: RegisterDTO){
    return this.authService.register(userData)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
    async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    res.cookie('auth', tokens, { httpOnly: true });
    res.send({
      message: 'success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
    async logout(@Response() res) {
    res.clearCookie('auth',{ httpOnly: true });
    res.send({
      message: 'success',
    });
  }
}
