import { Authorization } from './authorization';

export class SessionTokenAuthorization extends Authorization {
  constructor(
    private sessionId: string,
    private sessionToken: string,
  ) {
    super();
  }

  getAuthorizationToken(): string {
    const raw = `${this.sessionId}:${this.sessionToken}`;
    const base64 =
      typeof btoa !== 'undefined' ? btoa(raw) : Buffer.from(raw, 'utf8').toString('base64');
    return `Basic ${base64}`;
  }
}
