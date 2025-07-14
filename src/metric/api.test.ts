import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { MetricApi } from './api';
import { Metric } from './models/metric';
import { MetricDefinition } from './models/metric-definition';
import { ReferenceCategory } from '../reference/models/reference-category';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('MetricApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: MetricApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new MetricApi(client);
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

  describe('getMetrics()', () => {
    const mockMetrics: Metric[] = [
      { id: 'm1', key: 'key1', value: 42, valueType: 'NUMBER', name: 'Metric1' } as Metric,
      { id: 'm2', key: 'key2', value: true, valueType: 'BOOLEAN', name: 'Metric2' } as Metric,
    ];

    it('should GET /metrics with all query params including categoryReferenceId', async () => {
      const categoryReferenceId = 'cat123';
      const query = {
        fullKeys: ['key1', 'key2'],
        scope: 'scopeX',
        localized: true,
        noCache: false,
      };

      baseScope
        .get('/metrics')
        .query({
          categoryReferenceId,
          fullKeys: 'key1,key2',
          scope: 'scopeX',
          localized: 'true',
          noCache: 'false',
        })
        .reply(200, mockMetrics);

      const result = await api.getMetrics(categoryReferenceId, query);
      expect(result).toEqual(mockMetrics);
    });

    it('should include only categoryReferenceId when no other query params', async () => {
      const categoryReferenceId = 'cat456';

      baseScope.get('/metrics').query({ categoryReferenceId }).reply(200, mockMetrics);

      const result = await api.getMetrics(categoryReferenceId);
      expect(result).toEqual(mockMetrics);
    });
  });

  describe('getMetricDefinitions()', () => {
    const mockDefs: MetricDefinition[] = [{ key: 'def1', name: 'Def1' } as MetricDefinition];

    it('should GET /metrics/definitions with category and noCache query', async () => {
      const category: ReferenceCategory = ReferenceCategory.Account;
      const query = { noCache: true };

      baseScope
        .get('/metrics/definitions')
        .query({
          category,
          noCache: 'true',
        })
        .reply(200, mockDefs);

      const result = await api.getMetricDefinitions(category, query);
      expect(result).toEqual(mockDefs);
    });

    it('should include only category when noCache is omitted', async () => {
      const category: ReferenceCategory = ReferenceCategory.Account;

      baseScope.get('/metrics/definitions').query({ category }).reply(200, mockDefs);

      const result = await api.getMetricDefinitions(category);
      expect(result).toEqual(mockDefs);
    });
  });
});
