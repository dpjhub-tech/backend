import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const databaseUrl =
      config.get<string>('DATABASE_URL') || process.env.DATABASE_URL || '';
    super({
      adapter: new PrismaPg({
        connectionString: databaseUrl,
      }),
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      console.warn(
        'Prisma initial connection deferred:',
        err instanceof Error ? err.message : err,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
