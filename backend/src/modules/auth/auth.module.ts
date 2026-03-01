// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '@modules/auth/google.strategy';
import { AuthController } from '@modules/auth/auth.controller';

@Module({
  imports: [PassportModule.register({ session: false })],
  providers: [GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
