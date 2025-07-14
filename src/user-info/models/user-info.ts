/**
 *
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
  /**
   *
   * @type {string}
   * @memberof UserInfo
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof UserInfo
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof UserInfo
   */
  email?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof UserInfo
   */
  accountPolicies: Array<string>;
}
