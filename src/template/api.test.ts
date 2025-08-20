import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { TemplateApi } from './api';
import { ServerTemplate } from './models/server-template';
import { ServerTemplateCategory } from './models/server-template-category';
import { ServerTemplateConfiguration } from './models/server-template-configuration';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { TemplateCategory } from './models/template-category';
import { ConfigType } from '../configuration/models/config-types';

describe('TemplateApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: TemplateApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new TemplateApi(client);
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

    it('should fetch templates without cache', async () => {
      baseScope.get('/templates').query({ noCache: 'true' }).reply(200, mockTemplates);

      const result = await api.getTemplates({ noCache: true });

      expect(result).toEqual(mockTemplates);
    });

    it('should fetch templates with cache (noCache false)', async () => {
      baseScope.get('/templates').query({ noCache: 'false' }).reply(200, mockTemplates);

      const result = await api.getTemplates({ noCache: false });

      expect(result).toEqual(mockTemplates);
    });

    it('should fetch templates without query parameters', async () => {
      baseScope.get('/templates').reply(200, mockTemplates);

      const result = await api.getTemplates({});

      expect(result).toEqual(mockTemplates);
    });

    it('should pass options parameter correctly', async () => {
      baseScope.get('/templates').query({ noCache: 'true' }).reply(200, mockTemplates);

      const result = await api.getTemplates({ noCache: true });

      expect(result).toEqual(mockTemplates);
    });

    it('should handle empty template list', async () => {
      const emptyTemplates: ReadonlyArray<ServerTemplate> = [];
      baseScope.get('/templates').reply(200, emptyTemplates);

      const result = await api.getTemplates({});

      expect(result).toEqual(emptyTemplates);
    });

    it('should handle templates with multiple categories', async () => {
      const anotherCategory: ServerTemplateCategory = {
        id: TemplateCategory.Toaster,
        name: 'Toaster',
        configuration: [
          {
            key: 'config-key-2',
            templateKey: 'template-config-2',
            type: ConfigType.Int32,
            name: 'Radius',
            value: 100,
            customGroup: 'advanced',
          },
        ],
      };

      const templatesWithMultipleCategories: ReadonlyArray<ServerTemplate> = [
        {
          id: 'template-3',
          name: 'Complex Template',
          minorVersion: '3.0',
          fullVersion: '3.0.0',
          categories: [mockCategory, anotherCategory],
        },
      ];

      baseScope.get('/templates').reply(200, templatesWithMultipleCategories);

      const result = await api.getTemplates({});

      expect(result).toEqual(templatesWithMultipleCategories);
    });
  });
});
