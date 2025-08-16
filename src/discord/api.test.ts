import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { DiscordApi } from './api';
import { DiscordUserAccountInfo } from './models/discord-user-account-info';
import { ImplicitDiscordAuthRequest } from './models/implicit-discord-auth-request';
import { DiscordOAuthTokenRequest } from './models/discord-oauth-token-request';
import { GrantAccessResult } from '../account/models/grant-access-result';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { DiscordOAuthRedirectType } from './models/discord-oauth-redirect-type';
import { RedirectUri } from '../common/redirect-uri';

describe('DiscordApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: DiscordApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new DiscordApi(client);
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

  describe('getDiscordUserById()', () => {
    it('should fetch a Discord user by ID with correct headers', async () => {
      const discordUserId = 'user123';
      const mockResponse: DiscordUserAccountInfo = {
        accountExists: true,
        username: 'testuser',
        emailRequired: false,
        isMemberOfGuild: true,
        isWhitelisted: true,
        userId: 'user123',
        usernameRegex: '^[a-zA-Z0-9_]{3,16}$',
        roles: ['12346432'],
      };

      baseScope.get(`/discord/users/${discordUserId}`).reply(200, mockResponse);

      const result = await api.getDiscordUserById(discordUserId);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('authImplicitFlow()', () => {
    it('should perform implicit Discord auth and return grant access result', async () => {
      const req: ImplicitDiscordAuthRequest = {
        discordUserId: 'abc123',
      };

      const mockGrant: GrantAccessResult = {
        access_token: 'oauthToken',
        expires_in: 7200,
        account_id: 'account123',
        token_type: 'Bearer',
      };

      baseScope
        .post('/discord/auth', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockGrant);

      const result = await api.authImplicitFlow(req);

      expect(result).toEqual(mockGrant);
    });
  });

  describe('authOAuthFlow()', () => {
    it('should perform OAuth Discord auth and return grant access result', async () => {
      const req: DiscordOAuthTokenRequest = {
        code: 'oauthcode',
        redirectType: DiscordOAuthRedirectType.SCP,
      };
      const mockGrant: GrantAccessResult = {
        access_token: 'oauthToken',
        expires_in: 7200,
        account_id: 'account123',
        token_type: 'Bearer',
      };

      baseScope
        .post('/discord/oauth/token', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockGrant);

      const result = await api.authOAuthFlow(req);

      expect(result).toEqual(mockGrant);
    });
  });

  describe('getDiscordOAuthAuthorizeUrl()', () => {
    it('should get Discord OAuth authorize URL for GAME redirect type', async () => {
      const redirectType = DiscordOAuthRedirectType.Game;
      const mockResponse: RedirectUri = {
        uri: 'https://discord.com/api/oauth2/authorize?client_id=123&redirect_uri=http://localhost:3000/auth/discord&response_type=code&scope=identify',
      };

      baseScope
        .get(`/discord/oauth/authorize?redirectType=${redirectType}`)
        .reply(200, mockResponse);

      const result = await api.getDiscordOAuthAuthorizeUrl(redirectType);

      expect(result).toEqual(mockResponse);
    });

    it('should get Discord OAuth authorize URL for SCP redirect type', async () => {
      const redirectType = DiscordOAuthRedirectType.SCP;
      const mockResponse: RedirectUri = {
        uri: 'https://discord.com/api/oauth2/authorize?client_id=456&redirect_uri=http://localhost:3000/scp/auth/discord&response_type=code&scope=identify',
      };

      baseScope
        .get(`/discord/oauth/authorize?redirectType=${redirectType}`)
        .reply(200, mockResponse);

      const result = await api.getDiscordOAuthAuthorizeUrl(redirectType);

      expect(result).toEqual(mockResponse);
    });

    it('should pass options parameter correctly', async () => {
      const redirectType = DiscordOAuthRedirectType.Game;
      const mockResponse: RedirectUri = {
        uri: 'https://discord.com/api/oauth2/authorize?client_id=123&redirect_uri=http://localhost:3000/auth/discord&response_type=code&scope=identify',
      };

      baseScope
        .get(`/discord/oauth/authorize?redirectType=${redirectType}`)
        .reply(200, mockResponse);

      const result = await api.getDiscordOAuthAuthorizeUrl(redirectType);

      expect(result).toEqual(mockResponse);
    });
  });
});
