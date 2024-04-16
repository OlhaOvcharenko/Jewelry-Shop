import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async register(registrationData: RegisterDTO){
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const userData = {
      name:registrationData.name,
      surname: registrationData.surname,
      email: registrationData.email,
      phone: registrationData.phone,
      country: registrationData.country,
      city: registrationData.city
    };
    return this.userService.create(userData, hashedPassword);
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password.hashedPassword))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async createSession(user: any) {
    const payload = { email: user.email, sub: user.id };
  
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    });
  
    return {
      access_token: accessToken,
    };
  }


}
