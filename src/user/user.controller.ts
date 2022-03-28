import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { JwtGuard, RolesGuard } from 'src/common/guards';
import { NotFoundInterceptor } from 'src/common/interceptos';

import { UserService } from './user.service';
import { GetUserByEmailDTO, GetUserByIdDTO } from './dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RolesGuard) // Is called after the JwtGuard, that is why we need to add it before JwtGuard
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new NotFoundInterceptor('User not found'))
  @Roles(Role.USER)
  @Get(':id')
  async findOneById(@Param() getUserByIdDTO: GetUserByIdDTO) {
    return await this.userService.findOne({ where: getUserByIdDTO });
  }

  @UseInterceptors(new NotFoundInterceptor('User not found'))
  @Roles(Role.USER)
  @Post()
  async findOneByEmail(@Body() getUserByEmailDTO: GetUserByEmailDTO) {
    return await this.userService.findOne({ where: getUserByEmailDTO });
  }
}
