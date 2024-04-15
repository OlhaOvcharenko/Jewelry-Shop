import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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


}
