import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalSupabaseAuthGuard extends AuthGuard('supabase') {}
