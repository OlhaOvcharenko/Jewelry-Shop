import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
   async getAll() {
     return this.userService.getAllUsers();
   }

   @Get('/:id')
   async getById(@Param('id', new ParseUUIDPipe()) id: string){
    const user = await this.userService.getUserById(id)
   }
}
