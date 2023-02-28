import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email@mail.com', description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Qwerty123!', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 85, {
    message: 'Password should be longer than 8 symbols and less then 85',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password should have at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  readonly password: string;

  @ApiProperty({ example: 'name', description: 'Username' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}
