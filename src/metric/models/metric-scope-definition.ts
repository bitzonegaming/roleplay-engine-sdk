import { MetricScopeType } from './metric-scope-type';

/**
 *
 * @export
 * @interface MetricScopeDefinition
 */
export interface MetricScopeDefinition {
  /**
   *
   * @type {string}
   * @memberof MetricScopeDefinition
   */
  id: string;
  /**
   *
   * @type {MetricScopeType}
   * @memberof MetricScopeDefinition
   */
  type: MetricScopeType;
  /**
   *
   * @type {string}
   * @memberof MetricScopeDefinition
   */
  key: string;
  /**
   *
   * @type {string}
   * @memberof MetricScopeDefinition
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof MetricScopeDefinition
   */
  description?: string;
}
