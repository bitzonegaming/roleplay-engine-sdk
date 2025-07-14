/**
 *
 * @export
 * @interface ChangeMyPasswordRequest
 */
export interface ChangeMyPasswordRequest {
  /**
   * Current password of the user. It is required to change the password.
   * @type {string}
   * @memberof ChangeMyPasswordRequest
   */
  currentPassword?: string | null;
  /**
   * New password for the user. It must meet the password policy requirements.
   * @type {string}
   * @memberof ChangeMyPasswordRequest
   */
  newPassword?: string | null;
  /**
   * Confirmation of the new password. It must match the newPassword field.
   * @type {string}
   * @memberof ChangeMyPasswordRequest
   */
  confirmNewPassword?: string | null;
}
