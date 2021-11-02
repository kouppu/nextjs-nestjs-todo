import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Request,
  Body,
  Get,
  Patch,
  UseGuards,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UpdateMeDTO } from './dto';
import { MeResponse } from './responses/me.response';
import { User } from 'src/entities/user.entity';
import { MeService } from './me.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('me')
@ApiTags('Me')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class MeController {
  constructor(private readonly service: MeService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiOkResponse({ type: MeResponse })
  async find(@Request() req: { user: User }): Promise<MeResponse> {
    return new MeResponse(await this.service.find(req.user.id));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  @ApiOperation({ summary: 'Update authenticated user' })
  @ApiBody({ type: UpdateMeDTO })
  @ApiOkResponse({ type: MeResponse })
  @ApiUnprocessableEntityResponse()
  async update(
    @Request() req: { user: User },
    @Body() updateProperty: UpdateMeDTO,
  ): Promise<MeResponse> {
    return new MeResponse(
      await this.service.update(req.user.id, updateProperty),
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete()
  @ApiOperation({ summary: 'Delete authenticated user' })
  @ApiNoContentResponse()
  async delete(@Request() req: { user: User }): Promise<void> {
    this.service.delete(req.user.id);
  }
}
