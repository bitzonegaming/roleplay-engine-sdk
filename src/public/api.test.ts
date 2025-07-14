import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { PublicApi } from './api';
import { PublicConfig } from './models/public-config';
import { Locale } from '../locale/models/locale';
import { Localization } from '../localization/models/localization';
import { CharacterGender } from '../character/models/character-gender';
import { CharacterNationality } from '../character/models/character-nationality';
import { DiscordOAuthRedirectType } from '../discord/models/discord-oauth-redirect-type';
import { RedirectUri } from '../common/redirect-uri';
import { ResendEmailVerificationRequest } from './models/resend-email-verification-request';
import { VerifyEmailRequest } from './models/verify-email-request';
import { ForgotPasswordRequest } from './models/forgot-password-request';
import { ResetPasswordRequest } from './models/reset-password-request';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { ConfigKey } from '../configuration/models/config-keys';
import { ConfigType } from '../configuration/models/config-types';

describe('PublicApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: PublicApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new PublicApi(client);
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

  describe('getConfiguration()', () => {
    const mockConfigs: PublicConfig[] = [
      {
        key: ConfigKey.Name,
        value: 'Roleplay Server',
        type: ConfigType.String,
        editable: true,
      } as PublicConfig,
    ];

    it('should GET /public/configuration and return public configs', async () => {
      baseScope.get('/public/configuration').reply(200, mockConfigs);

      const result = await api.getConfiguration();
      expect(result).toEqual(mockConfigs);
    });
  });

  describe('getLocales()', () => {
    const mockLocales: Locale[] = [
      { code: 'en-US', name: 'English', enabled: true, order: 1, iconUrl: '' } as Locale,
    ];

    it('should GET /public/locales and return locales', async () => {
      baseScope.get('/public/locales').reply(200, mockLocales);

      const result = await api.getLocales();
      expect(result).toEqual(mockLocales);
    });
  });

  describe('getLocalization()', () => {
    const mockLoc: Localization = { welcome: 'Hello' } as Localization;

    it('should GET /public/localization with path query', async () => {
      const path = 'home';
      baseScope.get('/public/localization').query({ path }).reply(200, mockLoc);

      const result = await api.getLocalization(path);
      expect(result).toEqual(mockLoc);
    });

    it('should GET /public/localization with no path when omitted', async () => {
      baseScope.get('/public/localization').query({}).reply(200, mockLoc);

      const result = await api.getLocalization();
      expect(result).toEqual(mockLoc);
    });
  });

  describe('getCharacterGenders()', () => {
    const mockGenders: CharacterGender[] = [
      { id: 'FEMALE', enabled: true, order: 1, name: 'Female' } as CharacterGender,
    ];

    it('should GET /public/characters/genders and return genders', async () => {
      baseScope.get('/public/characters/genders').reply(200, mockGenders);

      const result = await api.getCharacterGenders();
      expect(result).toEqual(mockGenders);
    });
  });

  describe('getCharacterNationalities()', () => {
    const mockNats: CharacterNationality[] = [
      { id: 'n1', name: 'Atlantean', enabled: true, order: 1 } as CharacterNationality,
    ];

    it('should GET /public/characters/nationalities and return nationalities', async () => {
      baseScope.get('/public/characters/nationalities').reply(200, mockNats);

      const result = await api.getCharacterNationalities();
      expect(result).toEqual(mockNats);
    });
  });

  describe('getDiscordOAuthAuthorizeUrl()', () => {
    const mockUri: RedirectUri = { uri: 'https://discord.com/oauth2/authorize' } as RedirectUri;

    it('should GET /public/discord/oauth/authorize with redirectType', async () => {
      const redirectType = DiscordOAuthRedirectType.Game;
      baseScope.get('/public/discord/oauth/authorize').query({ redirectType }).reply(200, mockUri);

      const result = await api.getDiscordOAuthAuthorizeUrl(redirectType);
      expect(result).toEqual(mockUri);
    });
  });

  describe('resendEmailVerification()', () => {
    it('should POST /public/accounts/email-verifications with body', async () => {
      const req: ResendEmailVerificationRequest = { email: 'user@example.com' };

      baseScope
        .post('/public/accounts/email-verifications', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.resendEmailVerification(req);
    });
  });

  describe('verifyEmail()', () => {
    it('should PUT /public/accounts/email-verifications with body', async () => {
      const req: VerifyEmailRequest = { token: 'verify123' };

      baseScope
        .put('/public/accounts/email-verifications', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.verifyEmail(req);
    });
  });

  describe('forgotPassword()', () => {
    it('should POST /public/accounts/password-resets with body', async () => {
      const req: ForgotPasswordRequest = { email: 'user@example.com' };

      baseScope
        .post('/public/accounts/password-resets', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.forgotPassword(req);
    });
  });

  describe('resetPassword()', () => {
    it('should PUT /public/accounts/password-resets with body', async () => {
      const req: ResetPasswordRequest = {
        token: 'reset123',
        newPassword: 'newPass',
        confirmNewPassword: 'newPass',
      };

      baseScope
        .put('/public/accounts/password-resets', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.resetPassword(req);
    });
  });
});
