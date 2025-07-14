import { ApiOptions, EngineClient } from '../core/engine-client';
import { ReferenceCategory } from '../reference/models/reference-category';
import { SegmentType, SegmentTypeCode } from './models/segment-type';
import { PaginationQuery } from '../common/pagination-query';
import { PaginatedItems } from '../common/paginated-items';
import { Segment } from './models/segment';
import { CreateSegmentDefinitionRequest } from './models/create-segment-definition-request';
import { SegmentDefinition } from './models/segment-definition';
import { PatchSegmentDefinitionRequest } from './models/patch-segment-definition-request';
import { AccessPolicyGroup } from './models/access-policy-group';
import { SegmentCategory } from './models/segment-category';

export class SegmentApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of segments based on segment definition ID, category, reference name, and type. If no parameters are provided, it returns all segments.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:segment<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:segment<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get segments
   * @param {Object} [query] Query parameters
   * @param {ReferenceCategory} [query.category] Filter by reference category.
   * @param {string} [query.referenceName] Filter by references name.
   * @param {boolean} [query.segmentDefinitionId] Filter by segment definition id.
   * @param {number} [query.pageIndex] Page index for pagination.
   * @param {number} [query.pageSize] Page size for pagination.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSegments(
    query?: {
      category?: ReferenceCategory;
      referenceName?: string;
      segmentDefinitionId?: string;
      type?: SegmentTypeCode;
    } & PaginationQuery,
    options?: ApiOptions,
  ): Promise<PaginatedItems<Segment>> {
    return this.client.get<PaginatedItems<Segment>>({
      url: 'segments',
      query,
      options,
    });
  }

  /**
   * It creates a new segment definition. The segment definition can be used to define segments that can be used in the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:segment_definition<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:segment_definition<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Create segment definition
   * @param {CreateSegmentDefinitionRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public createSegmentDefinition(
    request: CreateSegmentDefinitionRequest,
    options?: ApiOptions,
  ): Promise<SegmentDefinition> {
    return this.client.post<CreateSegmentDefinitionRequest, SegmentDefinition>({
      url: 'segments/definitions',
      data: request,
      options,
    });
  }

  /**
   * It returns the definitions of segments based on type and category. If no type or category is provided, it returns all segment definitions.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:segment_definition<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:segment_definition<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get segment definitions
   * @param {Object} [query] Query parameters
   * @param {ReferenceCategory} [query.category]  Filter definitions by reference category.
   * @param {SegmentTypeCode} [query.type]       Filter definitions by segment type code.
   * @param {boolean} [query.noCache]            If `true`, bypass server cache and fetch fresh data.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSegmentDefinitions(
    query?: {
      category?: ReferenceCategory;
      type?: SegmentTypeCode;
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<SegmentDefinition[]> {
    return this.client.get<SegmentDefinition[]>({
      url: 'segments/definitions',
      query,
      options,
    });
  }

  /**
   * It returns a segment definition by its ID. If no cache is specified, it will return the cached version if available.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:segment_definition<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:segment_definition<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get segment definition by ID
   * @param {string} segmentDefinitionId
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache]            If `true`, bypass server cache and fetch fresh data.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSegmentDefinitionById(
    segmentDefinitionId: string,
    query?: {
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<SegmentDefinition> {
    return this.client.get<SegmentDefinition>({
      url: `segments/definitions/${segmentDefinitionId}`,
      query,
      options,
    });
  }

  /**
   * It patches a segment definition by its ID. It allows updating the segment definition with new data.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:segment_definition<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:segment_definition<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Patch segment definition by ID
   * @param {string} segmentDefinitionId
   * @param {PatchSegmentDefinitionRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public patchSegmentDefinitionById(
    segmentDefinitionId: string,
    request: PatchSegmentDefinitionRequest,
    options?: ApiOptions,
  ): Promise<SegmentDefinition> {
    return this.client.patch<PatchSegmentDefinitionRequest, SegmentDefinition>({
      url: `segments/definitions/${segmentDefinitionId}`,
      data: request,
      options,
    });
  }

  /**
   * It removes a segment definition by its ID. This operation is irreversible and will delete the segment definition permanently.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:segment_definition<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:segment_definition<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Remove segment definition by ID
   * @param {string} segmentDefinitionId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public removeSegmentDefinitionById(
    segmentDefinitionId: string,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.delete<void>({
      url: `segments/definitions/${segmentDefinitionId}`,
      options,
    });
  }

  /**
   * It returns a list of access policies that can be used to control access to resources. If category is not specified, it returns ACCOUNT access policies.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key]<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get access policies
   * @param {ReferenceCategory} [category]
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getAccessPolicies(
    category: ReferenceCategory,
    options?: ApiOptions,
  ): Promise<AccessPolicyGroup[]> {
    return this.client.get<AccessPolicyGroup[]>({
      url: `segments/access-policies`,
      options,
    });
  }

  /**
   * It returns a list of segment categories that can be used to categorize segments.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key]<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get segment categories
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSegmentCategories(options?: ApiOptions): Promise<SegmentCategory[]> {
    return this.client.get<SegmentCategory[]>({
      url: `segments/categories`,
      options,
    });
  }

  /**
   * It returns a list of segment types that can be used to categorize segments by their type.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key]<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get segment types
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSegmentTypes(options?: ApiOptions): Promise<SegmentType[]> {
    return this.client.get<SegmentType[]>({
      url: `segments/types`,
      options,
    });
  }
}
