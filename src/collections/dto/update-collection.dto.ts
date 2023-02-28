import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty({ example: 'Name', description: 'Collection name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Some text', description: 'Collection description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'Coins', description: 'Collection theme' })
  @IsNotEmpty()
  @IsString()
  readonly theme: string;

  @ApiProperty({ example: 'url/image', description: `Image url` })
  @IsOptional()
  readonly imgUrl: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string1 field of item',
  })
  @IsOptional()
  readonly string1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string2 field of item',
  })
  @IsOptional()
  readonly string2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string3 field of item',
  })
  @IsOptional()
  readonly string3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number1 field of item',
  })
  @IsOptional()
  readonly number1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number2 field of item',
  })
  @IsOptional()
  readonly number2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number3 field of item',
  })
  @IsOptional()
  readonly number3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text1 field of item',
  })
  @IsOptional()
  readonly text1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text2 field of item',
  })
  @IsOptional()
  readonly text2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text3 field of item',
  })
  @IsOptional()
  readonly text3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date1 field of item',
  })
  @IsOptional()
  readonly date1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date2 field of item',
  })
  @IsOptional()
  readonly date2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date3 field of item',
  })
  @IsOptional()
  readonly date3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean1 field of item',
  })
  @IsOptional()
  readonly boolean1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean2 field of item',
  })
  @IsOptional()
  readonly boolean2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean3 field of item',
  })
  @IsOptional()
  readonly boolean3descr: string;
}
