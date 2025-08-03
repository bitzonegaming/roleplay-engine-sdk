import { MetricScopeDefinition } from './metric-scope-definition';
import { MetricValueType } from './metric-value-type';
import { MetricMainKey } from './metric-main-key';

/**
 * @export
 * @interface Metric
 */
export type Metric = {
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  categoryReferenceId: string;
  /**
   *
   * @type {MetricMainKey}
   * @memberof Metric
   */
  key: MetricMainKey;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  subKey?: string;
  /**
   *
   * @type {MetricScopeDefinition}
   * @memberof Metric
   */
  scope?: MetricScopeDefinition;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  description?: string;
} & (
  | {
      /**
       *
       * @type {MetricValueType.Number}
       * @memberof Metric
       */
      valueType: MetricValueType.Number;
      /**
       *
       * @type {number}
       * @memberof Metric
       */
      value: number;
    }
  | {
      /**
       *
       * @type {MetricValueType.Date}
       * @memberof Metric
       */
      valueType: MetricValueType.Date;
      /**
       *
       * @type {number}
       * @memberof Metric
       */
      value: number;
    }
  | {
      /**
       *
       * @type {MetricValueType.String}
       * @memberof Metric
       */
      valueType: MetricValueType.String;
      /**
       *
       * @type {string}
       * @memberof Metric
       */
      value: string;
    }
  | {
      /**
       *
       * @type {MetricValueType.Boolean}
       * @memberof Metric
       */
      valueType: MetricValueType.Boolean;
      /**
       *
       * @type {boolean}
       * @memberof Metric
       */
      value: boolean;
    }
  | {
      /**
       *
       * @type {MetricValueType.List}
       * @memberof Metric
       */
      valueType: MetricValueType.List;
      /**
       *
       * @type {object[]}
       * @memberof Metric
       */
      value: object[];
    }
  | {
      /**
       *
       * @type {MetricValueType.Set}
       * @memberof Metric
       */
      valueType: MetricValueType.Set;
      /**
       *
       * @type {Map<string, object>}
       * @memberof Metric
       */
      value: Map<string, object>;
    }
);
