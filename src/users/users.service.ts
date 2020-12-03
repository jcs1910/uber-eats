import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    // check new user
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // make Error
        return 'There is a user using this email already';
      }
      const user = await this.users.create({ email, password, role });
      await this.users.save(user);
    } catch (e) {
      //make error
      return 'Could not create account';
    }
  }
}
