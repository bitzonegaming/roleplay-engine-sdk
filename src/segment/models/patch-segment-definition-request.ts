import { SegmentPolicyRequest } from './segment-policy-request';
import { SegmentStyleRequest } from './segment-style-request';
import { JsonCondition } from '../../common/json-condition';

/**
 *
 * @export
 * @interface PatchSegmentDefinitionRequest
 */
export interface PatchSegmentDefinitionRequest {
  /**
   *
   * @type {SegmentPolicyRequest}
   * @memberof PatchSegmentDefinitionRequest
   */
  policy?: SegmentPolicyRequest | null;
  /**
   *
   * @type {SegmentStyleRequest}
   * @memberof PatchSegmentDefinitionRequest
   */
  style?: SegmentStyleRequest | null;
  /**
   *
   * @type {JsonCondition}
   * @memberof PatchSegmentDefinitionRequest
   */
  condition?: JsonCondition | null;
  /**
   *
   * @type {boolean}
   * @memberof PatchSegmentDefinitionRequest
   */
  enabled?: boolean | null;
  /**
   *
   * @type {boolean}
   * @memberof PatchSegmentDefinitionRequest
   */
  visible?: boolean | null;
}
