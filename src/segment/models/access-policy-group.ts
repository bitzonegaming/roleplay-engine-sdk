import { AccessPolicyItem } from './access-policy-item';

export enum AccessPolicyGroupCode {
  Scp = 'account_policy:group:scp',
  Configuration = 'account_policy:group:configuration',
  Localization = 'account_policy:group:localization',
  Account = 'account_policy:group:account',
  Character = 'account_policy:group:character',
  Reference = 'account_policy:group:reference',
  Session = 'account_policy:group:session',
  Segment = 'account_policy:group:segment',
}

/**
 *
 * @export
 * @interface AccessPolicyGroup
 */
export interface AccessPolicyGroup {
  /**
   *
   * @type {AccessPolicyGroupCode}
   * @memberof AccessPolicyGroup
   */
  code: AccessPolicyGroupCode;
  /**
   *
   * @type {string}
   * @memberof AccessPolicyGroup
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof AccessPolicyGroup
   */
  description: string;
  /**
   *
   * @type {Array<AccessPolicyItem>}
   * @memberof AccessPolicyGroup
   */
  policies: Array<AccessPolicyItem>;
}
