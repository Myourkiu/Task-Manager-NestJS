import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthResponse } from "src/models/auth";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(
    @Body("username") username: string,
    @Body("password") password: string
  ): AuthResponse {
    return this.authService.signIn(username, password);
  }
}
