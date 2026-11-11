import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  getJwtSecret(): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    return secret || 'dev-secret-no-leer';
  }
}
