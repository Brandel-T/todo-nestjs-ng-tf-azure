import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '@modules/auth/google.strategy';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/users/users.module';

@Module({
  imports: [PassportModule.register({ session: false }), UserModule],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
