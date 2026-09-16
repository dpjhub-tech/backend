import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';

@Injectable()
export class StorageService {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Generates a short-lived signed download/preview URL for private storage objects.
   * @param bucket The storage bucket (e.g. 'verification-docs')
   * @param path File path inside bucket
   * @param expiresIn Expiry duration in seconds (defaults to 3600 = 1 hour)
   */
  async createSignedUrl(
    bucket: string,
    path: string,
    expiresIn = 3600,
  ): Promise<{ signedUrl: string; expiresIn: number }> {
    const { data, error } = await this.supabaseService.admin.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error || !data?.signedUrl) {
      throw new NotFoundException(
        `Failed to generate signed URL for "${path}": ${error?.message || 'File not found'}`,
      );
    }

    return {
      signedUrl: data.signedUrl,
      expiresIn,
    };
  }

  /**
   * Generates a signed upload URL that allows secure direct-to-storage upload from the browser.
   */
  async createSignedUploadUrl(
    bucket: string,
    path: string,
  ): Promise<{ signedUrl: string; token: string; path: string }> {
    const { data, error } = await this.supabaseService.admin.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (error || !data) {
      throw new InternalServerErrorException(
        `Failed to generate upload URL: ${error?.message}`,
      );
    }

    return {
      signedUrl: data.signedUrl,
      token: data.token,
      path: data.path,
    };
  }

  /**
   * Deletes a file from Supabase storage.
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await this.supabaseService.admin.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete file from storage: ${error.message}`,
      );
    }
  }

  /**
   * Returns standard public URL for public bucket assets.
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabaseService.admin.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
