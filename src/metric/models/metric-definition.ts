import { ReferenceCategory } from '../../reference/models/reference-category';
import { MetricKeyType, MetricSubKeyType } from './metric-key-type';
import { MetricValueType } from './metric-value-type';

/**
 *
 * @export
 * @interface MetricDefinition
 */
export interface MetricDefinition {
  /**
   *
   * @type {ReferenceCategory}
   * @memberof MetricDefinition
   */
  category: ReferenceCategory;
  /**
   *
   * @type {string}
   * @memberof MetricDefinition
   */
  categoryName: string;
  /**
   *
   * @type {string}
   * @memberof MetricDefinition
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof MetricDefinition
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof MetricDefinition
   */
  key: string;
  /**
   *
   * @type {MetricKeyType}
   * @memberof MetricDefinition
   */
  keyType: MetricKeyType;
  /**
   *
   * @type {MetricSubKeyType}
   * @memberof MetricDefinition
   */
  subKeyType: MetricSubKeyType;
  /**
   *
   * @type {MetricValueType}
   * @memberof MetricDefinition
   */
  valueType: MetricValueType;
}
