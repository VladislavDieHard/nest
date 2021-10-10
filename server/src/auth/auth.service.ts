import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/user.schema";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async login(dto: UserLoginDto): Promise<any> {
        const validatedUser = await this.validateUser(dto);
        const user = await this.userModel.findOne({username: validatedUser.username},{password: 0});
        return {
            ...await this.generateToken(validatedUser),
            user: user
        }
    }

    async register(dto: CreateUserDto, avatar) {
        const user = await this.userService.createUser(dto, avatar);
        return this.generateToken(user);
    }

    private async generateToken(user: any) {
        const payload = { username: user.username, id: user.user_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: UserLoginDto) {
        const user = await this.userService.getUserByName(userDto.username);
        const passwordEquals = await bcrypt.compareSync(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректное имя пользователя или пароль'});
    }
}
