import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'email@mail.com', description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Qwerty123!', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
