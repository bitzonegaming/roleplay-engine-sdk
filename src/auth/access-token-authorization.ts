import { Authorization } from './authorization';

export class AccessTokenAuthorization extends Authorization {
  constructor(private token: string) {
    super();
  }

  getAuthorizationToken(): string {
    return `Bearer ${this.token}`;
  }
}
