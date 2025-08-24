import { Authorization } from './authorization';

export class ApiKeyAuthorization extends Authorization {
  constructor(
    private apiKeyId: string,
    private apiKeySecret: string,
  ) {
    super();
  }

  getAuthorizationToken(): string {
    const raw = `${this.apiKeyId}:${this.apiKeySecret}`;
    const base64 =
      typeof btoa !== 'undefined' ? btoa(raw) : Buffer.from(raw, 'utf8').toString('base64');
    return `Basic ${base64}`;
  }
}
