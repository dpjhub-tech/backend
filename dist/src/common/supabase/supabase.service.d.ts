import { ConfigService } from '@nestjs/config';
import { SupabaseClient, User } from '@supabase/supabase-js';
export declare class SupabaseService {
    private readonly config;
    private client;
    constructor(config: ConfigService);
    get admin(): SupabaseClient;
    getUserFromToken(accessToken: string): Promise<User | null>;
}
