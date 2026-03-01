import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.displayName = createUserDto.displayName;
    user.picture = createUserDto.picture || '';
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findByEmail(email: string): Promise<User | null> {
    console.log('-------------------- Searching for user with email:', email);

    return this.userRepo.findOneBy({ email });
  }

  findById(id: string): Promise<User | null> {
    console.log('-------------------- Searching for user with id:', id);
    return this.userRepo.findOneBy({ id });
  }
}
