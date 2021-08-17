import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtSupabaseAuthGuard } from './guards/jwt-supabase-auth.guard';
import { LocalSupabaseAuthGuard } from './guards/local-supabase-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SupabaseStrategy } from './strategies/supabase.strategy';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [ConfigModule, SupabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    SupabaseStrategy,
    JwtStrategy,
    LocalSupabaseAuthGuard,
    JwtSupabaseAuthGuard,
  ],
  exports: [
    AuthService,
    SupabaseStrategy,
    JwtStrategy,
    LocalSupabaseAuthGuard,
    JwtSupabaseAuthGuard,
  ],
})
export class AuthModule {}
