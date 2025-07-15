/**
 *
 * @export
 * @interface ExternalLoginAuthRequest
 */
export interface ExternalLoginAuthRequest {
  /**
   *
   * @type {string}
   * @memberof ExternalLoginAuthRequest
   */
  username?: string;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginAuthRequest
   */
  email?: string;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginAuthRequest
   */
  password: string;
  /**
   *
   * @type {string}
   * @memberof ExternalLoginAuthRequest
   */
  locale?: string;
}
