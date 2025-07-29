import { ApiOptions, EngineClient } from '../core/engine-client';
import { Metric } from './models/metric';
import { MetricDefinition } from './models/metric-definition';
import { ReferenceCategory } from '../reference/models/reference-category';
import { PaginationQuery } from '../common/pagination-query';
import { PaginatedItems } from '../common/paginated-items';

export class MetricApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of metrics based on the provided filters.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:metric<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:metric<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get metrics
   * @param {Object} [query]                      Query parameters
   * @param {ReferenceCategory} [query.category]    Filter metrics by category. Use `ReferenceCategory` enum values.
   * @param {boolean} [query.localized]             If `true`, return localized metric names.
   * @param {boolean} [query.noCache]               If `true`, bypass server cache and fetch fresh data.
   * @param {number} [query.pageIndex]              Page index for pagination.
   * @param {number} [query.pageSize]               Page size for pagination.
   * @param {ApiOptions} [options]                Override HTTP request options.
   * @throws {EngineError}
   */
  public getMetrics(
    query?: {
      category?: ReferenceCategory;
      localized?: boolean;
      noCache?: boolean;
    } & PaginationQuery,
    options?: ApiOptions,
  ): Promise<PaginatedItems<Metric>> {
    return this.client.get<PaginatedItems<Metric>>({
      url: 'metrics',
      query,
      options,
    });
  }

  /**
   * It returns a list of metric definitions based on the provided category.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:metric<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:metric<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get metric definitions
   * @param {ReferenceCategory} [category]         Reference category
   * @param {Object} [query]            Query parameters
   * @param {boolean} [query.noCache]            If `true`, bypass server cache and fetch fresh data.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getMetricDefinitions(
    category: ReferenceCategory,
    query?: {
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<MetricDefinition[]> {
    return this.client.get<MetricDefinition[]>({
      url: 'metrics/definitions',
      query: { ...query, category },
      options,
    });
  }
}
