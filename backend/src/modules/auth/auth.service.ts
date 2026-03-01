import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/users/users.service';
import { User } from '@modules/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      return null;

    return user;
  }
}
