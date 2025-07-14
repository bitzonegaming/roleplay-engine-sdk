/**
 *
 * @export
 * @interface GrantAccessResult
 */
export interface GrantAccessResult {
  /**
   *
   * @type {string}
   * @memberof GrantAccessResult
   */
  account_id: string;
  /**
   *
   * @type {string}
   * @memberof GrantAccessResult
   */
  access_token: string;
  /**
   *
   * @type {string}
   * @memberof GrantAccessResult
   */
  token_type: string;
  /**
   *
   * @type {number}
   * @memberof GrantAccessResult
   */
  expires_in: number;
}
