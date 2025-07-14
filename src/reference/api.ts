import { ApiOptions, EngineClient } from '../core/engine-client';
import { ReferenceCategory } from './models/reference-category';
import { PaginatedItems } from '../common/paginated-items';
import { Reference } from './models/reference';
import { PaginationQuery } from '../common/pagination-query';
import { Segment } from '../segment/models/segment';
import { ApplySegmentToReferenceRequest } from '../segment/models/apply-segment-to-reference-request';

export class ReferenceApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a paginated list of references based on the provided filters.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key]<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get references
   * @param {Object} [query] Query parameters
   * @param {ReferenceCategory} [query.category] Filter by reference category.
   * @param {string} [query.name] Filter references by name.
   * @param {boolean} [query.enabled] Filter by enabled status.
   * @param {number} [query.pageIndex] Page index for pagination.
   * @param {number} [query.pageSize] Page size for pagination.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getReferences(
    query?: {
      category?: ReferenceCategory;
      name?: string;
      enabled?: boolean;
    } & PaginationQuery,
    options?: ApiOptions,
  ): Promise<PaginatedItems<Reference>> {
    return this.client.get<PaginatedItems<Reference>>({
      url: 'references',
      query,
      options,
    });
  }

  /**
   * It returns the segments of a reference.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key]<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get reference segments
   * @param {string} categoryReferenceId
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache]
   * @param {boolean} [query.visible] If 'true', it only returns visible segments
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getReferenceSegments(
    categoryReferenceId: string,
    query?: { noCache?: boolean; visible?: boolean },
    options?: ApiOptions,
  ): Promise<Segment[]> {
    return this.client.get<Segment[]>({
      url: `references/${categoryReferenceId}/segments`,
      query,
      options,
    });
  }

  /**
   * It applies a segment to the reference. The segment definition type must be MANUAL. Auto segments cannot be applied to references manually.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:segment<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:segment<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Apply segment to reference
   * @param {string} categoryReferenceId
   * @param {string} segmentDefinitionId
   * @param {ApplySegmentToReferenceRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public applySegmentToReference(
    categoryReferenceId: string,
    segmentDefinitionId: string,
    request: ApplySegmentToReferenceRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<ApplySegmentToReferenceRequest, void>({
      url: `references/${categoryReferenceId}/segments/${segmentDefinitionId}`,
      data: request,
      options,
    });
  }

  /**
   * It removes a segment from the reference. The segment definition type must be MANUAL. Auto segments cannot be removed from references manually.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:segment<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:segment<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Remove segment from reference
   * @param {string} categoryReferenceId
   * @param {string} segmentDefinitionId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public removeSegmentFromReference(
    categoryReferenceId: string,
    segmentDefinitionId: string,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.delete<void>({
      url: `references/${categoryReferenceId}/segments/${segmentDefinitionId}`,
      options,
    });
  }
}
