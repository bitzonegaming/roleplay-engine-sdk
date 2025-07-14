import { JsonCondition } from '../../common/json-condition';
import { SegmentPolicyRequest } from './segment-policy-request';
import { SegmentStyleRequest } from './segment-style-request';

/**
 *
 * @export
 * @interface CreateSegmentDefinitionRequest
 */
export interface CreateSegmentDefinitionRequest {
  /**
   *
   * @type {string}
   * @memberof CreateSegmentDefinitionRequest
   */
  id?: string | null;
  /**
   *
   * @type {string}
   * @memberof CreateSegmentDefinitionRequest
   */
  defaultName?: string | null;
  /**
   *
   * @type {string}
   * @memberof CreateSegmentDefinitionRequest
   */
  type?: string | null;
  /**
   *
   * @type {string}
   * @memberof CreateSegmentDefinitionRequest
   */
  category?: string | null;
  /**
   *
   * @type {SegmentPolicyRequest}
   * @memberof CreateSegmentDefinitionRequest
   */
  policy?: SegmentPolicyRequest | null;
  /**
   *
   * @type {SegmentStyleRequest}
   * @memberof CreateSegmentDefinitionRequest
   */
  style?: SegmentStyleRequest | null;
  /**
   *
   * @type {JsonCondition}
   * @memberof CreateSegmentDefinitionRequest
   */
  condition?: JsonCondition | null;
  /**
   *
   * @type {boolean}
   * @memberof CreateSegmentDefinitionRequest
   */
  visible: boolean;
}
