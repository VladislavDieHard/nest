import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() dto: UserLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('/register')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
    ]),
  )
  registration(@UploadedFiles() files, @Body() dto: CreateUserDto) {
    console.log(dto)
    console.log(files)
    return this.authService.register(dto, files.image);
  }

}
