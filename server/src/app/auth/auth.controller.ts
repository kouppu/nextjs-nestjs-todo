import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { AuthResponse } from './responses';
import { LoginUserDTO } from './dto';

@Controller({ path: '/auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse()
  async login(@Request() req: { user: User }) {
    const auth = await this.authService.login(req.user);
    return new AuthResponse(auth.accessToken);
  }
}
