import { StorageService } from './storage.service';
import type { AuthenticatedUser } from '../../common/guards/supabase-auth.guard';
import { GetSignedUrlDto } from './dto/get-signed-url.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    getSignedUrl(user: AuthenticatedUser, query: GetSignedUrlDto): Promise<{
        signedUrl: string;
        expiresIn: number;
    }>;
}
