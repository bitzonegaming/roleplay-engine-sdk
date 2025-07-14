import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { SegmentApi } from './api';
import { ReferenceCategory } from '../reference/models/reference-category';
import { SegmentType, SegmentTypeCode } from './models/segment-type';
import { PaginationQuery } from '../common/pagination-query';
import { PaginatedItems } from '../common/paginated-items';
import { SegmentDefinition } from './models/segment-definition';
import { CreateSegmentDefinitionRequest } from './models/create-segment-definition-request';
import { PatchSegmentDefinitionRequest } from './models/patch-segment-definition-request';
import { AccessPolicyGroup, AccessPolicyGroupCode } from './models/access-policy-group';
import { SegmentCategory } from './models/segment-category';
import { Segment } from './models/segment';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('SegmentApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: SegmentApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new SegmentApi(client);
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

  describe('getSegments()', () => {
    const mockPage: PaginatedItems<Segment> = {
      items: [
        {
          id: 's1',
          name: 'SegOne',
          category: ReferenceCategory.Account,
          referenceName: 'RefX',
          segmentDefinitionId: 'def123',
          type: SegmentTypeCode.Manual,
          typeName: 'Manual',
        } as Segment,
      ],
      pageIndex: 2,
      pageSize: 5,
      totalCount: 42,
      pageCount: 9,
    };

    it('should GET /segments with all query params', async () => {
      const query: {
        category?: ReferenceCategory;
        referenceName?: string;
        segmentDefinitionId?: string;
        type?: SegmentTypeCode;
      } & PaginationQuery = {
        category: ReferenceCategory.Account,
        referenceName: 'RefX',
        segmentDefinitionId: 'def123',
        type: SegmentTypeCode.Manual,
        pageIndex: 2,
        pageSize: 5,
      };

      baseScope
        .get('/segments')
        .query({
          category: ReferenceCategory.Account,
          referenceName: 'RefX',
          segmentDefinitionId: 'def123',
          type: SegmentTypeCode.Manual,
          pageIndex: '2',
          pageSize: '5',
        })
        .reply(200, mockPage);

      const result = await api.getSegments(query);
      expect(result).toEqual(mockPage);
    });

    it('should include only provided query params', async () => {
      const query = { referenceName: 'OnlyThis' };

      baseScope.get('/segments').query({ referenceName: 'OnlyThis' }).reply(200, mockPage);

      const result = await api.getSegments(query);
      expect(result).toEqual(mockPage);
    });
  });

  describe('createSegmentDefinition()', () => {
    it('should POST /segments/definitions with correct body and return definition', async () => {
      const req: CreateSegmentDefinitionRequest = {
        id: 'NEW_DEF',
        defaultName: 'New Definition',
        category: ReferenceCategory.Account,
        type: SegmentTypeCode.Manual,
        visible: true,
      };
      const mockDef: SegmentDefinition = {
        id: 'NEW_DEF',
        name: 'New Definition',
        category: ReferenceCategory.Account,
        categoryName: 'Account',
        type: SegmentTypeCode.Manual,
        typeName: 'Manual',
        visible: true,
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        policy: { accessPolicies: [] },
        style: {},
      };

      baseScope
        .post('/segments/definitions', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mockDef);

      const result = await api.createSegmentDefinition(req);
      expect(result).toEqual(mockDef);
    });
  });

  describe('getSegmentDefinitions()', () => {
    const mockDefs: SegmentDefinition[] = [
      {
        id: 'NEW_DEF',
        name: 'New Definition',
        category: ReferenceCategory.Account,
        categoryName: 'Account',
        type: SegmentTypeCode.Manual,
        typeName: 'Manual',
        visible: true,
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        policy: { accessPolicies: [] },
        style: {},
      },
    ];

    it('should GET /segments/definitions with all query params', async () => {
      baseScope
        .get('/segments/definitions')
        .query({
          category: ReferenceCategory.Account,
          type: SegmentTypeCode.Auto,
          noCache: 'true',
        })
        .reply(200, mockDefs);

      const result = await api.getSegmentDefinitions({
        category: ReferenceCategory.Account,
        type: SegmentTypeCode.Auto,
        noCache: true,
      });
      expect(result).toEqual(mockDefs);
    });

    it('should include only category and type when noCache omitted', async () => {
      baseScope
        .get('/segments/definitions')
        .query({
          category: ReferenceCategory.Account,
          type: SegmentTypeCode.Manual,
        })
        .reply(200, mockDefs);

      const result = await api.getSegmentDefinitions({
        category: ReferenceCategory.Account,
        type: SegmentTypeCode.Manual,
      });
      expect(result).toEqual(mockDefs);
    });
  });

  describe('getSegmentDefinitionById()', () => {
    const id = 'DEF_123';
    const mockDef: SegmentDefinition = {
      id,
      name: 'New Definition',
      category: ReferenceCategory.Account,
      categoryName: 'Account',
      type: SegmentTypeCode.Manual,
      typeName: 'Manual',
      visible: true,
      createdDate: 176781234567,
      lastModifiedDate: 176781234567,
      policy: { accessPolicies: [] },
      style: {},
    };

    it('should GET /segments/definitions/:id without query', async () => {
      baseScope.get(`/segments/definitions/${id}`).reply(200, mockDef);

      const result = await api.getSegmentDefinitionById(id);
      expect(result).toEqual(mockDef);
    });

    it('should include noCache query when provided', async () => {
      baseScope.get(`/segments/definitions/${id}`).query({ noCache: 'true' }).reply(200, mockDef);

      const result = await api.getSegmentDefinitionById(id, { noCache: true });
      expect(result).toEqual(mockDef);
    });
  });

  describe('patchSegmentDefinitionById()', () => {
    it('should PATCH /segments/definitions/:id with correct body', async () => {
      const id = 'DEF_123';
      const req: PatchSegmentDefinitionRequest = {
        visible: false,
      };
      const mockDef: SegmentDefinition = {
        id,
        name: 'New Definition',
        category: ReferenceCategory.Account,
        categoryName: 'Account',
        type: SegmentTypeCode.Manual,
        typeName: 'Manual',
        visible: true,
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        policy: { accessPolicies: [] },
        style: {},
      };

      baseScope
        .patch(`/segments/definitions/${id}`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockDef);

      const result = await api.patchSegmentDefinitionById(id, req);
      expect(result).toEqual(mockDef);
    });
  });

  describe('removeSegmentDefinitionById()', () => {
    it('should DELETE /segments/definitions/:id', async () => {
      const id = 'def123';

      baseScope.delete(`/segments/definitions/${id}`).reply(204);

      await api.removeSegmentDefinitionById(id);
    });
  });

  describe('getAccessPolicies()', () => {
    it('should GET /segments/access-policies ignoring category parameter', async () => {
      const mockPolicies: AccessPolicyGroup[] = [
        {
          name: 'group1',
          policies: [],
          code: AccessPolicyGroupCode.Account,
          description: 'description',
        } as AccessPolicyGroup,
      ];

      baseScope.get('/segments/access-policies').reply(200, mockPolicies);

      const result = await api.getAccessPolicies(ReferenceCategory.Account);
      expect(result).toEqual(mockPolicies);
    });
  });

  describe('getSegmentCategories()', () => {
    it('should GET /segments/categories and return list', async () => {
      const mockCats: SegmentCategory[] = [
        { code: ReferenceCategory.Account, name: 'Account' } as SegmentCategory,
      ];

      baseScope.get('/segments/categories').reply(200, mockCats);

      const result = await api.getSegmentCategories();
      expect(result).toEqual(mockCats);
    });
  });

  describe('getSegmentTypes()', () => {
    it('should GET /segments/types and return list', async () => {
      const mockTypes: SegmentType[] = [
        { code: SegmentTypeCode.Auto, name: 'Automatic' } as SegmentType,
      ];

      baseScope.get('/segments/types').reply(200, mockTypes);

      const result = await api.getSegmentTypes();
      expect(result).toEqual(mockTypes);
    });
  });
});
