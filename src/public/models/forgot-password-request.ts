/**
 *
 * @export
 * @interface ForgotPasswordRequest
 */
export interface ForgotPasswordRequest {
  /**
   * Email address of the user requesting a password reset. It is required to send the reset link.
   * @type {string}
   * @memberof ForgotPasswordRequest
   */
  email?: string | null;
}
