import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (payload) {
      // We have a valid user token
      const auth = req.headers['authorization'];
      const token = auth.split(' ')[1];
      // Check that supabase accepts the token
      const { data: user, error } =
        await this.supabaseService.client.auth.api.getUser(token);
      // Update supabase to act as the user
      if (user) {
        this.supabaseService.client.auth.setAuth(token);
      } else {
        if (error) {
          console.log(error);
        }
        // Set auth to the anon key.
        this.supabaseService.client.auth.setAuth(
          this.configService.get('SUPABASE_KEY'),
        );
      }
    } else {
      // Set auth to the anon key.
      this.supabaseService.client.auth.setAuth(
        this.configService.get('SUPABASE_KEY'),
      );
    }
    return payload;
  }
}
