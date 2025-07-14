import { AccessPolicy } from './access-policy';

/**
 *
 * @export
 * @interface AccessPolicyItem
 */
export interface AccessPolicyItem {
  /**
   *
   * @type {string}
   * @memberof AccessPolicyItem
   */
  code: AccessPolicy;
  /**
   *
   * @type {string}
   * @memberof AccessPolicyItem
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof AccessPolicyItem
   */
  description: string;
}
