/**
 *
 * @export
 * @interface ResendEmailVerificationRequest
 */
export interface ResendEmailVerificationRequest {
  /**
   * Email address of the user requesting to resend the email verification. It is required to send the verification link.
   * @type {string}
   * @memberof ResendEmailVerificationRequest
   */
  email?: string | null;
}
