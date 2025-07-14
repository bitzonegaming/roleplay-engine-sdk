import { AccountBan } from './account-ban';
import { AccountEmailVerification } from './account-email-verification';
import { AccountSessionAuthInfo } from './account-session-auth-info';
import { AccountSignInOption } from './account-sign-in-option';

/**
 *
 * @export
 * @interface Account
 */
export interface Account {
  /**
   *
   * @type {string}
   * @memberof Account
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  locale: string;
  /**
   *
   * @type {string}
   * @memberof Account
   */
  email?: string;
  /**
   *
   * @type {AccountEmailVerification}
   * @memberof Account
   */
  emailVerification?: AccountEmailVerification;
  /**
   *
   * @type {number}
   * @memberof Account
   */
  lastAuthDate?: number;
  /**
   *
   * @type {AccountSessionAuthInfo}
   * @memberof Account
   */
  lastSessionAuthInfo?: AccountSessionAuthInfo;
  /**
   *
   * @type {AccountBan}
   * @memberof Account
   */
  ban?: AccountBan;
  /**
   *
   * @type {Array<AccountSignInOption>}
   * @memberof Account
   */
  signInOptions?: Array<AccountSignInOption>;
  /**
   *
   * @type {number}
   * @memberof Account
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Account
   */
  lastModifiedDate: number;
}
