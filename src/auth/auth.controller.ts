import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './decorators/token.decorator';
import { JwtSupabaseAuthGuard } from './guards/jwt-supabase-auth.guard';
import { LocalSupabaseAuthGuard } from './guards/local-supabase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Request() req) {
    const { email, password } = req.body;
    await this.authService.register(email, password);
    return email;
  }

  @UseGuards(LocalSupabaseAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { access_token, ...session } = req.user;
    return { access_token };
  }

  @UseGuards(JwtSupabaseAuthGuard)
  @Post('logout')
  async logout(@Token() token: string) {
    return this.authService.logout(token);
  }
}
