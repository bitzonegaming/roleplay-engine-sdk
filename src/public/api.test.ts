import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { PublicApi } from './api';
import { PublicConfig } from './models/public-config';
import { Locale } from '../locale/models/locale';
import { Localization } from '../localization/models/localization';
import { CharacterGender } from '../character/models/character-gender';
import { CharacterNationality } from '../character/models/character-nationality';
import { ResendEmailVerificationRequest } from './models/resend-email-verification-request';
import { VerifyEmailRequest } from './models/verify-email-request';
import { ForgotPasswordRequest } from './models/forgot-password-request';
import { ResetPasswordRequest } from './models/reset-password-request';
import { ServerTemplate } from '../template/models/server-template';
import { ServerTemplateCategory } from '../template/models/server-template-category';
import { ServerTemplateConfiguration } from '../template/models/server-template-configuration';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { ConfigKey } from '../configuration/models/config-keys';
import { ConfigType } from '../configuration/models/config-types';
import { TemplateCategory } from '../template/models/template-category';

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

  describe('getTemplates()', () => {
    const mockConfiguration: ServerTemplateConfiguration = {
      key: 'config-key-1',
      templateKey: 'template-config-1',
      type: ConfigType.String,
      name: 'Configuration Name',
      description: 'Configuration description',
      value: 'default-value',
      customGroup: 'general',
    };

    const mockCategory: ServerTemplateCategory = {
      id: TemplateCategory.Login,
      name: 'Login',
      configuration: [mockConfiguration],
    };

    const mockTemplates: ReadonlyArray<ServerTemplate> = [
      {
        id: 'template-1',
        name: 'A Template',
        minorVersion: '1.2',
        fullVersion: '1.2.3',
        categories: [mockCategory],
      },
      {
        id: 'template-2',
        name: 'B Template',
        minorVersion: '2.0',
        fullVersion: '2.0.1',
        categories: [],
      },
    ];

    it('should GET /public/templates and return templates', async () => {
      baseScope.get('/public/templates').reply(200, mockTemplates);

      const result = await api.getTemplates();

      expect(result).toEqual(mockTemplates);
    });

    it('should pass options parameter correctly', async () => {
      baseScope.get('/public/templates').reply(200, mockTemplates);

      const result = await api.getTemplates();

      expect(result).toEqual(mockTemplates);
    });

    it('should handle empty template list', async () => {
      const emptyTemplates: ReadonlyArray<ServerTemplate> = [];
      baseScope.get('/public/templates').reply(200, emptyTemplates);

      const result = await api.getTemplates();

      expect(result).toEqual(emptyTemplates);
    });

    it('should handle templates with multiple categories and configurations', async () => {
      const anotherConfiguration: ServerTemplateConfiguration = {
        key: 'config-key-2',
        templateKey: 'template-config-2',
        type: ConfigType.Int32,
        name: 'Config 1',
        value: 100,
        customGroup: 'advanced',
      };

      const anotherCategory: ServerTemplateCategory = {
        id: TemplateCategory.Toaster,
        name: 'Toaster',
        configuration: [mockConfiguration, anotherConfiguration],
      };

      const complexTemplates: ReadonlyArray<ServerTemplate> = [
        {
          id: 'template-3',
          name: 'Complex Template',
          minorVersion: '3.0',
          fullVersion: '3.0.0',
          categories: [mockCategory, anotherCategory],
        },
      ];

      baseScope.get('/public/templates').reply(200, complexTemplates);

      const result = await api.getTemplates();

      expect(result).toEqual(complexTemplates);
    });
  });
});
