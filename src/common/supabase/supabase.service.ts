import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient | null = null;

  constructor(private readonly config: ConfigService) {}

  /** Service-role client for Nest-side privileged operations (bypasses RLS). */
  get admin(): SupabaseClient {
    if (!this.client) {
      const url = this.config.get<string>('SUPABASE_URL');
      const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
      if (!url || !key) {
        throw new InternalServerErrorException(
          'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured',
        );
      }
      this.client = createClient(url, key);
    }
    return this.client;
  }

  async getUserFromToken(accessToken: string): Promise<User | null> {
    const { data, error } = await this.admin.auth.getUser(accessToken);
    if (error || !data.user) return null;
    return data.user;
  }
}
