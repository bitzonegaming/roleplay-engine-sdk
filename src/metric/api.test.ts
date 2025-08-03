import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { MetricApi } from './api';
import { Metric } from './models/metric';
import { MetricDefinition } from './models/metric-definition';
import { ReferenceCategory } from '../reference/models/reference-category';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { PaginatedItems } from '../common/paginated-items';
import { MetricValueType } from './models/metric-value-type';
import { MetricMainKey } from './models/metric-main-key';

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
    const mockMetricsPage: PaginatedItems<Metric> = {
      items: [
        {
          id: 'm1',
          categoryReferenceId: 'catRefId1',
          key: MetricMainKey.Age,
          value: 42,
          valueType: MetricValueType.Number,
          name: 'Metric1',
        },
        {
          id: 'm2',
          categoryReferenceId: 'catRefId2',
          key: MetricMainKey.EmailVerified,
          value: true,
          valueType: MetricValueType.Boolean,
          name: 'Metric2',
        },
      ],
      totalCount: 2,
      pageCount: 1,
      pageIndex: 1,
      pageSize: 10,
    };

    it('should GET /metrics with all query params', async () => {
      const query = {
        category: ReferenceCategory.Account,
        localized: true,
        noCache: false,
        pageIndex: 1,
        pageSize: 10,
      };

      baseScope
        .get('/metrics')
        .query({
          category: ReferenceCategory.Account,
          localized: 'true',
          noCache: 'false',
          pageIndex: '1',
          pageSize: '10',
        })
        .reply(200, mockMetricsPage);

      const result = await api.getMetrics(query);
      expect(result).toEqual(mockMetricsPage);
    });

    it('should GET /metrics with only category when no other query params', async () => {
      const query = { category: ReferenceCategory.Account };

      baseScope
        .get('/metrics')
        .query({ category: ReferenceCategory.Account })
        .reply(200, mockMetricsPage);

      const result = await api.getMetrics(query);
      expect(result).toEqual(mockMetricsPage);
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
