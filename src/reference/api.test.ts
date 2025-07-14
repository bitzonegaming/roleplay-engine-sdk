import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { ReferenceApi } from './api';
import { Reference } from './models/reference';
import { Segment } from '../segment/models/segment';
import { ApplySegmentToReferenceRequest } from '../segment/models/apply-segment-to-reference-request';
import { ReferenceCategory } from './models/reference-category';
import { PaginatedItems } from '../common/paginated-items';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { SegmentTypeCode } from '../segment/models/segment-type';

describe('ReferenceApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: ReferenceApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new ReferenceApi(client);
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

  describe('getReferences()', () => {
    const mockPage: PaginatedItems<Reference> = {
      items: [
        {
          id: 'r1',
          name: 'RefOne',
          category: ReferenceCategory.Account,
          categoryName: 'Account',
          referenceId: 'ref1',
          enabled: true,
        } as Reference,
      ],
      pageIndex: 1,
      pageSize: 10,
      pageCount: 10,
      totalCount: 100,
    };

    it('should GET /references with all query params', async () => {
      const query = {
        category: ReferenceCategory.Account,
        name: 'RefOne',
        enabled: true,
        pageIndex: 1,
        pageSize: 10,
      };

      baseScope
        .get('/references')
        .query({
          category: ReferenceCategory.Account,
          name: 'RefOne',
          enabled: 'true',
          pageIndex: '1',
          pageSize: '10',
        })
        .reply(200, mockPage);

      const result = await api.getReferences(query);
      expect(result).toEqual(mockPage);
    });

    it('should include only provided query params', async () => {
      const query = { name: 'RefOnly' };

      baseScope.get('/references').query({ name: 'RefOnly' }).reply(200, mockPage);

      const result = await api.getReferences(query);
      expect(result).toEqual(mockPage);
    });
  });

  describe('getReferenceSegments()', () => {
    const categoryReferenceId = 'cat123';
    const mockSegments: Segment[] = [
      {
        id: 's1',
        name: 'SegOne',
        categoryName: 'Account',
        category: ReferenceCategory.Account,
        referenceId: 'ref1',
        segmentDefinitionId: 'SEGMENT_DEF_1',
        visible: true,
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        description: 'Segment One Description',
        policy: {
          accessPolicies: [],
        },
        referenceName: 'RefOne',
        style: {},
        type: SegmentTypeCode.Manual,
        typeName: 'Manual',
      } as Segment,
    ];

    it('should GET /references/:id/segments with all query params', async () => {
      baseScope
        .get(`/references/${categoryReferenceId}/segments`)
        .query({ noCache: 'true', visible: 'false' })
        .reply(200, mockSegments);

      const result = await api.getReferenceSegments(categoryReferenceId, {
        noCache: true,
        visible: false,
      });
      expect(result).toEqual(mockSegments);
    });

    it('should include only non-null query params', async () => {
      baseScope
        .get(`/references/${categoryReferenceId}/segments`)
        .query({ visible: 'true' })
        .reply(200, mockSegments);

      const result = await api.getReferenceSegments(categoryReferenceId, { visible: true });
      expect(result).toEqual(mockSegments);
    });
  });

  describe('applySegmentToReference()', () => {
    it('should PUT /references/:id/segments/:segId with correct body', async () => {
      const categoryReferenceId = 'cat123';
      const segmentDefinitionId = 'def456';
      const req: ApplySegmentToReferenceRequest = { validUntil: 176781234567 };

      baseScope
        .put(`/references/${categoryReferenceId}/segments/${segmentDefinitionId}`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.applySegmentToReference(categoryReferenceId, segmentDefinitionId, req);
    });
  });

  describe('removeSegmentFromReference()', () => {
    it('should DELETE /references/:id/segments/:segId', async () => {
      const categoryReferenceId = 'cat123';
      const segmentDefinitionId = 'def456';

      baseScope
        .delete(`/references/${categoryReferenceId}/segments/${segmentDefinitionId}`)
        .reply(204);

      await api.removeSegmentFromReference(categoryReferenceId, segmentDefinitionId);
    });
  });
});
