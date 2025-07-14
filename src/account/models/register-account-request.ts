/**
 *
 * @export
 * @interface RegisterAccountRequest
 */
export interface RegisterAccountRequest {
  /**
   *
   * @type {string}
   * @memberof RegisterAccountRequest
   */
  username: string | null;
  /**
   *
   * @type {string}
   * @memberof RegisterAccountRequest
   */
  email?: string | null;
  /**
   *
   * @type {string}
   * @memberof RegisterAccountRequest
   */
  password: string | null;
  /**
   *
   * @type {string}
   * @memberof RegisterAccountRequest
   */
  confirmPassword: string | null;
  /**
   *
   * @type {string}
   * @memberof RegisterAccountRequest
   */
  locale?: string | null;
}
