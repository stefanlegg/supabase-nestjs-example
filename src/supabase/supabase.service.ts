import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    // Create a single supabase client for interacting with the database
    this.client = createClient(
      configService.get('SUPABASE_URL'),
      configService.get('SUPABASE_KEY'),
    );
  }
}
