import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SupabaseService],
})
export class SupabaseModule {}
