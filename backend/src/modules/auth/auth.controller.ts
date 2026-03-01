import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req) {
    // redirige vers
    console.log(_req);
    return Promise.resolve(_req);
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    // l’utilisateur est dans req.user
    console.log(req.user);
    return req.user;
  }
}
