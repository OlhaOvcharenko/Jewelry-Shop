import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
   async getAll() {
     return this.userService.getAllUsers();
   }

   @Get('/:id')
   async getById(@Param('id') id: string){
    const user = await this.userService.getUserById(id)
    if (!user) throw new NotFoundException('User not found');
    return user;
   }
}
