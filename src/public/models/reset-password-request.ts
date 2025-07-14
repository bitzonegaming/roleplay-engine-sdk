/**
 *
 * @export
 * @interface ResetPasswordRequest
 */
export interface ResetPasswordRequest {
  /**
   * Email address of the user requested to reset the password.
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  email?: string | null;
  /**
   * Token received from the password reset link sent to the user\'s email. It is required to verify the request.
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  token?: string | null;
  /**
   * New password for the user. It should meet the password policy requirements.
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  newPassword?: string | null;
  /**
   * Confirmation of the new password. It must match the newPassword field.
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  confirmNewPassword?: string | null;
}
