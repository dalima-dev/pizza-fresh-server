import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: `Server is running! 🚀\n Please check ${baseUrl}/api for Swagger docs...`,
      docs: baseUrl + '/api',
    };
  }
}
