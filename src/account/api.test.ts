import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { AccountApi } from './api';
import { RegisterAccountRequest } from './models/register-account-request';
import { Account } from './models/account';
import { AccountAuthRequest } from './models/account-auth-request';
import { GrantAccessResult } from './models/grant-access-result';
import { Character } from '../character/models/character';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { ExternalLoginAuthRequest } from './models/external-login-auth-request';
import { ExternalLoginPreAuthResult } from './models/external-login-pre-auth-result';
import { ExternalLoginPreAuthRequest } from './models/external-login-pre-auth-request';

describe('AccountApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: AccountApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new AccountApi(client);
  });

  beforeEach(() => {
    baseScope = withCommonHeaders(nock(apiUrl), {
      serverId,
      applicationName,
      locale,
      authorizationToken,
    });
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
    nock.cleanAll();
  });

  describe('registerAccount()', () => {
    it('should POST /accounts with correct body and return Account', async () => {
      const req: RegisterAccountRequest = {
        email: 'user@example.com',
        username: 'newuser',
        password: 'P@ssw0rd',
        locale: 'en-US',
        confirmPassword: 'P@ssw0rd',
      };
      const mockAccount: Account = {
        id: 'acc123',
        email: 'user@example.com',
        username: 'newuser',
        locale: 'en-US',
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
      };

      baseScope
        .post('/accounts', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mockAccount);

      const result = await api.registerAccount(req);
      expect(result).toEqual(mockAccount);
    });
  });

  describe('authWithPassword()', () => {
    it('should POST /accounts/auth and return GrantAccessResult', async () => {
      const req: AccountAuthRequest = {
        username: 'existinguser',
        password: 'secret',
      };
      const mockGrant: GrantAccessResult = {
        access_token: 'tok123',
        expires_in: 3600,
        account_id: 'acc123',
        token_type: 'Bearer',
      };

      baseScope
        .post('/accounts/auth', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockGrant);

      const result = await api.authWithPassword(req);
      expect(result).toEqual(mockGrant);
    });
  });

  describe('getAccountById()', () => {
    const accountId = 'acc123';
    const mockAccount: Account = {
      id: accountId,
      email: 'user@example.com',
      username: 'user',
      createdDate: 176781234567,
      lastModifiedDate: 176781234567,
      locale: 'en-US',
    };

    it('should GET /accounts/:id without query and return Account', async () => {
      baseScope.get(`/accounts/${accountId}`).reply(200, mockAccount);

      const result = await api.getAccountById(accountId);
      expect(result).toEqual(mockAccount);
    });

    it('should include includeSignInOptions query when provided', async () => {
      baseScope
        .get(`/accounts/${accountId}`)
        .query({ includeSignInOptions: 'true' })
        .reply(200, mockAccount);

      const result = await api.getAccountById(accountId, { includeSignInOptions: true });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('getAccountCharacters()', () => {
    const accountId = 'acc123';
    const mockChars: Character[] = [
      {
        id: 'c1',
        firstName: 'John',
        lastName: 'Doe',
        accountId: 'acc123',
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        birthDate: '1990-09-10',
      } as Character,
    ];

    it('should GET /accounts/:id/characters without query', async () => {
      baseScope.get(`/accounts/${accountId}/characters`).reply(200, mockChars);

      const result = await api.getAccountCharacters(accountId);
      expect(result).toEqual(mockChars);
    });

    it('should include all provided query params', async () => {
      const query = { includeAppearance: true, includeMotives: false, onlyActive: true };
      baseScope
        .get(`/accounts/${accountId}/characters`)
        .query({
          includeAppearance: 'true',
          includeMotives: 'false',
          onlyActive: 'true',
        })
        .reply(200, mockChars);

      const result = await api.getAccountCharacters(accountId, query);
      expect(result).toEqual(mockChars);
    });

    it('should include only non-null query params', async () => {
      baseScope
        .get(`/accounts/${accountId}/characters`)
        .query({ includeAppearance: 'true' })
        .reply(200, mockChars);

      const result = await api.getAccountCharacters(accountId, { includeAppearance: true });
      expect(result).toEqual(mockChars);
    });
  });

  describe('preAuthExternalLogin()', () => {
    it('should POST /accounts/external-login/pre-auth and return pre-auth result', async () => {
      const req: ExternalLoginPreAuthRequest = {
        email: 'user@email.com',
        password: 'p@ss',
      };
      const mockResult: ExternalLoginPreAuthResult = {
        externalId: 'external123',
        email: 'user@email.com',
        username: undefined,
        emailInputRequired: false,
        usernameInputRequired: true,
      };

      baseScope
        .post('/accounts/external-login/pre-auth', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockResult);

      const result = await api.preAuthExternalLogin(req);
      expect(result).toEqual(mockResult);
    });
  });

  describe('authExternalLogin()', () => {
    it('should POST /accounts/external-login/auth and return GrantAccessResult', async () => {
      const req: ExternalLoginAuthRequest = {
        email: 'user@email.com',
        password: 'p@ss',
      };
      const mockGrant: GrantAccessResult = {
        access_token: 'xtok456',
        expires_in: 7200,
        account_id: 'acc456',
        token_type: 'Bearer',
      };

      baseScope
        .post('/accounts/external-login/auth', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockGrant);

      const result = await api.authExternalLogin(req);
      expect(result).toEqual(mockGrant);
    });
  });
});
