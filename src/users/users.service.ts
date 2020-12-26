import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile';
import { Verification } from './entities/verification.entitiy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // check new user
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user using this email already',
        };
      }
      const user = await this.users.create({ email, password, role });
      await this.users.save(user);

      // send an verification code
      const code = await this.verifications.create({ user });
      await this.verifications.save(code);

      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create account',
      };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(userId: number, { email, password }: EditProfileInput) {
    const user = await this.users.findOne(userId);

    if (email) {
      user.email = email;
      user.verified = false;
      // send an verification code
      const code = await this.verifications.create({ user });
      await this.verifications.save(code);
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
