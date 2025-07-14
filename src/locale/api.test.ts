import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { LocaleApi } from './api';
import { Locale } from './models/locale';
import { AddLocaleRequest } from './models/add-locale-request';
import { UpdateLocaleOrderRequest } from './models/update-locale-order-request';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('LocaleApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const authorization = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = authorization.getAuthorizationToken();
  let client: EngineClient;
  let api: LocaleApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, authorization);
    api = new LocaleApi(client);
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
    nock.cleanAll();
  });

  beforeEach(() => {
    baseScope = withCommonHeaders(nock(apiUrl), {
      serverId,
      applicationName,
      locale,
      authorizationToken,
    });
  });

  describe('getLocales()', () => {
    it('should include all query params', async () => {
      baseScope
        .get('/locales')
        .query({ enabled: 'true', noCache: 'false' })
        .reply(200, [
          {
            code: 'en-US',
            name: 'English',
            iconUrl: 'https://icon.com/united-states.svg',
            enabled: true,
            order: 1,
          },
        ] as Locale[]);

      const result = await api.getLocales({ enabled: true, noCache: false });

      expect(result).toEqual([
        {
          code: 'en-US',
          name: 'English',
          iconUrl: 'https://icon.com/united-states.svg',
          enabled: true,
          order: 1,
        },
      ]);
    });

    it('should include only non-null query params', async () => {
      baseScope
        .get('/locales')
        .query({ enabled: 'true' })
        .reply(200, [
          {
            code: 'en-US',
            name: 'English',
            iconUrl: 'https://icon.com/united-states.svg',
            enabled: true,
            order: 1,
          },
        ] as Locale[]);

      const result = await api.getLocales({ enabled: true });

      expect(result).toEqual([
        {
          code: 'en-US',
          name: 'English',
          iconUrl: 'https://icon.com/united-states.svg',
          enabled: true,
          order: 1,
        },
      ]);
    });
  });

  describe('addLocale()', () => {
    it('should add a locale', async () => {
      const req: AddLocaleRequest = {
        code: 'fr-FR',
        defaultName: 'French',
        iconUrl: 'https://icon.com/france.svg',
      };

      baseScope
        .post('/locales', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, {
          code: 'fr-FR',
          name: 'French',
          enabled: true,
          order: 2,
          iconUrl: 'https://icon.com/france.svg',
        } as Locale);

      const created = await api.addLocale(req);

      expect(created).toEqual({
        code: 'fr-FR',
        name: 'French',
        enabled: true,
        order: 2,
        iconUrl: 'https://icon.com/france.svg',
      });
    });
  });

  describe('enableLocale()', () => {
    it('should enable locale', async () => {
      const code = 'en-US';
      baseScope.put(`/locales/${code}/enabled`).reply(204);

      await api.enableLocale(code);
    });
  });

  describe('disableLocale()', () => {
    it('should disable locale', async () => {
      const code = 'en-US';
      baseScope.put(`/locales/${code}/disabled`).reply(204);

      await api.disableLocale(code);
    });
  });

  describe('updateLocaleOrder()', () => {
    it('should update locale order', async () => {
      const code = 'en-US';
      const orderReq: UpdateLocaleOrderRequest = { order: 5 };

      baseScope
        .put(`/locales/${code}/order`, (body) => {
          expect(body).toEqual(orderReq);
          return true;
        })
        .reply(204);

      await api.updateLocaleOrder(code, orderReq);
    });
  });
});
