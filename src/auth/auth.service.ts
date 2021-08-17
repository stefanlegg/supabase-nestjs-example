import { Injectable } from '@nestjs/common';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async login(email: string, password: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.signIn({
      email,
      password,
    });

    if (session) {
      return session;
    }
    if (error) {
      console.log(error);
    }
    return null;
  }

  async register(email: string, password: string): Promise<Session | null> {
    const { session, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    if (session) {
      return session;
    }
    if (error) {
      console.log(error);
    }
    return session;
  }

  async logout(token: string): Promise<null> {
    const { error } = await this.supabaseService.client.auth.api.signOut(token);
    return null;
  }
}
