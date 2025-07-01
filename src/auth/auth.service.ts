import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AuthResponse } from 'src/models/auth';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private jwtExpirationInSeconds: number;
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.jwtExpirationInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')!;
    }

    async signIn(username: string, password: string) : Promise<AuthResponse>{
        const foundUser = await this.userService.findByUsername(username);

        if(foundUser == undefined)
            throw new NotFoundException('User not found');

        if(!compareSync(password, foundUser.password))
            throw new HttpException('Password not match', HttpStatus.UNAUTHORIZED)

        const payload = {sub: foundUser.id, username: foundUser.username}
        const token = this.jwtService.sign(payload)

        return {token: token, expiresIn: this.jwtExpirationInSeconds}
    }
}
