// src/core/engine-client.test.ts
import nock from 'nock';
import { ApiOptions, EngineClient } from './engine-client';
import { Authorization } from '../auth/authorization';
import { ClientConfigs } from './client-configs';

class DummyAuth implements Authorization {
  getAuthorizationToken() {
    return 'Bearer dummy-token';
  }
}

const configs: ClientConfigs = {
  apiUrl: 'http://mock-api',
  applicationName: 'myApp',
  serverId: 'srv123',
  locale: 'en-US',
  timeout: 5000,
};

describe('EngineClient', () => {
  let client: EngineClient;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient(configs, new DummyAuth());
  });

  beforeEach(() => {
    baseScope = nock(configs.apiUrl);
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Pending mocks: ' + nock.pendingMocks());
    }
    nock.cleanAll();
  });

  describe('appendQuery()', () => {
    it('builds URL with only non-null values and array serialized by comma', () => {
      const url = client['appendQuery']('path', { a: 1, b: null, c: [2, 3] });
      expect(url).toBe('path?a=1&c=2%2C3');
    });

    it('returns original when query undefined', () => {
      expect(client['appendQuery']('path', undefined)).toBe('path');
    });
  });

  describe('getHeaders()', () => {
    it('includes standard and auth headers plus correlationId', () => {
      const opts: ApiOptions = { characterId: 'char456' };
      const headers = client['getHeaders'](opts);

      expect(headers.get('Accept-Language')).toBe(configs.locale);
      expect(headers.get('x-agent-name')).toBe(configs.applicationName);
      expect(headers.get('x-server-id')).toBe(configs.serverId);
      expect(headers.get('Authorization')).toBe('Bearer dummy-token');
      expect(headers.get('x-character-id')).toBe('char456');
      expect(typeof headers.get('x-correlationid')).toBe('string');
    });
  });

  describe('HTTP methods', () => {
    const commonMatchers = (scope: nock.Scope) =>
      scope
        .matchHeader('Accept-Language', configs.locale as string)
        .matchHeader('x-agent-name', configs.applicationName)
        .matchHeader('x-server-id', configs.serverId)
        .matchHeader('Authorization', 'Bearer dummy-token')
        .matchHeader('x-correlationid', (val) => val.length > 0);

    it('get() should send query and return data', async () => {
      commonMatchers(baseScope).get('/items').query({ foo: 'bar', list: '1,2' }).reply(200, {
        ok: true,
      });

      const data = await client.get<{ ok: boolean }>({
        url: 'items',
        query: { foo: 'bar', list: [1, 2] },
        options: { characterId: undefined },
      });

      expect(data).toEqual({ ok: true });
    });

    it('post() should send body, query and return data', async () => {
      const body = { x: 10 };
      commonMatchers(baseScope)
        .post('/submit?flag=true', (sent) => {
          expect(sent).toEqual(body);
          return true;
        })
        .reply(201, { id: 42 });

      const data = await client.post<typeof body, { id: number }>({
        url: 'submit',
        data: body,
        query: { flag: true },
        options: {},
      });

      expect(data).toEqual({ id: 42 });
    });

    it('put() should send body and return data', async () => {
      const body = { name: 'foo' };
      commonMatchers(baseScope)
        .put('/resource/1', (sent) => {
          expect(sent).toEqual(body);
          return true;
        })
        .reply(200, { success: true });

      const data = await client.put<typeof body, { success: boolean }>({
        url: 'resource/1',
        data: body,
        options: {},
      });

      expect(data).toEqual({ success: true });
    });

    it('patch() should send body and return data', async () => {
      const body = { patch: 'delta' };
      commonMatchers(baseScope)
        .patch('/resource/2', (sent) => {
          expect(sent).toEqual(body);
          return true;
        })
        .reply(200, { patched: true });

      const data = await client.patch<typeof body, { patched: boolean }>({
        url: 'resource/2',
        data: body,
        options: {},
      });

      expect(data).toEqual({ patched: true });
    });

    it('delete() should send query and return data', async () => {
      commonMatchers(baseScope).delete('/remove?id=99').reply(200, { removed: true });

      const data = await client.delete<{ removed: boolean }>({
        url: 'remove',
        query: { id: 99 },
        options: {},
      });

      expect(data).toEqual({ removed: true });
    });
  });

  describe('error handling', () => {
    const commonMatchers = (scope: nock.Scope) =>
      scope
        .matchHeader('Accept-Language', configs.locale as string)
        .matchHeader('x-agent-name', configs.applicationName)
        .matchHeader('x-server-id', configs.serverId)
        .matchHeader('Authorization', 'Bearer dummy-token')
        .matchHeader('x-correlationid', (val) => val.length > 0);

    it('rejects with EngineError on HTTP error', async () => {
      commonMatchers(baseScope)
        .get('/fail')
        .reply(400, {
          key: 'BAD_REQUEST',
          message: 'Bad request',
          params: {
            someParam: 'value',
          },
        });

      await expect(client.get({ url: '/fail' })).rejects.toThrow('Bad request');
    });
  });
});
