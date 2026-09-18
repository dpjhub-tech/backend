import { SupabaseService } from '../../common/supabase/supabase.service';
export declare class StorageService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    createSignedUrl(bucket: string, path: string, expiresIn?: number): Promise<{
        signedUrl: string;
        expiresIn: number;
    }>;
    createSignedUploadUrl(bucket: string, path: string): Promise<{
        signedUrl: string;
        token: string;
        path: string;
    }>;
    deleteFile(bucket: string, path: string): Promise<void>;
    getPublicUrl(bucket: string, path: string): string;
}
