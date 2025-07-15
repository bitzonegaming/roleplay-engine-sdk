/**
 *
 * @export
 * @interface ExternalLoginPreAuthResult
 */
export interface ExternalLoginPreAuthResult {
  /**
   *
   * @type {string}
   * @memberof ExternalLoginPreAuthResult
   */
  externalId: string;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginPreAuthResult
   */
  username?: string | null;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginPreAuthResult
   */
  email?: string | null;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginPreAuthResult
   */
  accountId?: string | null;
  /**
   *
   * @type {boolean}
   * @memberof ExternalLoginPreAuthResult
   */
  emailInputRequired: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ExternalLoginPreAuthResult
   */
  usernameInputRequired: boolean;
}
