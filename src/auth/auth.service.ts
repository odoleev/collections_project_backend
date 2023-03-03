import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginReturn } from './types/login-return.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto): Promise<LoginReturn> {
    const user = await this.validateUser(userDto);
    return {
      tokens: await this.generateTokens(
        user._id as string,
        user.email,
        user.roles,
      ),
      username: user.username,
      role: user.roles,
      banStatus: user.banStatus,
      id: user.id,
    };
  }

  async registration(userDto: CreateUserDto): Promise<string> {
    const userCheck = await this.usersService.getUserByEmail(userDto.email);
    if (userCheck) {
      throw new HttpException(
        'User with such email is already existing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await this.hashData(userDto.password);
    await this.usersService.createUser({
      ...userDto,
      password: hash,
    });
    return 'New user successfully created!';
  }

  async logout(userId: string) {
    await this.usersService.setHashedRtNull(userId);
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches)
      throw new HttpException('Token validation error', HttpStatus.BAD_REQUEST);

    return this.generateTokens(user._id as string, user.email, user.roles);
  }

  private async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.usersService.updateHashRt(userId, hash);
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(userId: string, email: string, roles: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: process.env.ACCESS_KEY,
          expiresIn: 60 * 60 * 3,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: process.env.REFRESH_KEY,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'No user with such email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  private async generateTokens(
    id: string,
    email: string,
    roles: string,
  ): Promise<Tokens> {
    const tokens = await this.getTokens(id, email, roles);
    await this.updateRtHash(id, tokens.refreshToken);
    return tokens;
  }
}
