import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';


export class LoginUserDto {

  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  email:string;


  @IsString()
  @IsStrongPassword()
  @ApiProperty({ example: 'StrongPassword123!', description: 'password' })
  password: string;


}