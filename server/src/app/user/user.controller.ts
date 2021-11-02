import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  Body,
  Param,
  Get,
  Post,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto';
import { UserResponse, UsersResponse } from './responses';
import { MeResponse } from '../me/responses/me.response';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly service: UserService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get()
  // async index(): Promise<UsersResponse> {
  //   const users = await this.service.findAll();
  //   const res = new UsersResponse();
  //   res.users = users;
  //   return res;
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<UserResponse> {
  //   const user = await this.service.findOneById(Number(id));
  //   if (!user) {
  //     throw new NotFoundException();
  //   }

  //   return new UserResponse(user);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ type: MeResponse })
  @ApiUnprocessableEntityResponse()
  async create(@Body() user: CreateUserDTO): Promise<MeResponse> {
    return new MeResponse(await this.service.create(user));
  }
}
