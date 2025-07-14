import { ApiOptions, EngineClient } from '../core/engine-client';
import { Metric } from './models/metric';
import { MetricDefinition } from './models/metric-definition';
import { ReferenceCategory } from '../reference/models/reference-category';

export class MetricApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of metrics based on the provided filters.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:metric<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:metric<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @param {string} [categoryReferenceId]     Filter by category reference ID.
   * @param {Object} [query]                   Query parameters
   * @param {string[]} [query.fullKeys]             Array of full metric keys to include.
   * @param {string} [query.scope]                  Filter metrics by scope.
   * @param {boolean} [query.localized]             If `true`, return localized metric names.
   * @param {boolean} [query.noCache]               If `true`, bypass server cache and fetch fresh data.
   * @param {ApiOptions} [options]                  Override HTTP request options.
   * @throws {EngineError}
   */
  public getMetrics(
    categoryReferenceId: string,
    query?: {
      fullKeys?: string[];
      scope?: string;
      localized?: boolean;
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<Metric[]> {
    return this.client.get<Metric[]>({
      url: 'metrics',
      query: { ...query, categoryReferenceId },
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
