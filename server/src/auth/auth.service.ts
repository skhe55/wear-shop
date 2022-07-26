import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from "../database/entities/users.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    private logger: Logger;

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
        this.logger = new Logger('Auth Service');
    }

    async login(userDto: CreateUserDto) {
        try {
            const user = await this.validateUser(userDto);
            return this.generateToken(user);
        } catch(error) {
            this.logger.log(`login: ${error}`);
            return null;
        }
    }

    async registration(userDto: CreateUserDto) {
        try {
            const candidate = await this.userService.getUserByLogin(userDto.login);
            if(candidate) {
                throw new HttpException('There is user with this login', HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcrypt.hash(userDto.password, Number(process.env.SALT_ROUNDS));
            const user = await this.userService.createUser({...userDto, password: hashPassword});
            return this.generateToken(user);
        } catch(error) {
            this.logger.log(`registration: ${error}`);
            return new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async generateToken(user: UserEntity) {
        try {
            const payload = {login: user.login, id: user.id, roles: user.roles};
            return {
                token: "Bearer " + this.jwtService.sign(payload)
            }
        } catch(error) {
            this.logger.log(`generateToken: ${error}`);
            return null;
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        try {
            const user = await this.userService.getUserByLogin(userDto.login);
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if(user && passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({message: 'Incorrect login or password'});
        } catch(error) {
            this.logger.log(`validateUser: ${error}`);
            return null;
        }
    }
}