/**
 *
 * @export
 * @interface VerifyEmailRequest
 */
export interface VerifyEmailRequest {
  /**
   * Email address of the user requested to verify their email.
   * @type {string}
   * @memberof VerifyEmailRequest
   */
  email?: string | null;
  /**
   * Token received from the email verification link sent to the user\'s email. It is required to verify the request.
   * @type {string}
   * @memberof VerifyEmailRequest
   */
  token?: string | null;
}
