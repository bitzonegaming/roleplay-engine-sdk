import { SessionInfoAccount } from './session-info-account';
import { SessionInfoCharacter } from './session-info-character';
import { AccountSignInMethod } from '../../account/models/account-sign-in-method';

/**
 *
 * @export
 * @interface SessionInfo
 */
export interface SessionInfo {
  /**
   *
   * @type {string}
   * @memberof SessionInfo
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfo
   */
  ipAddress: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfo
   */
  tokenHash: string;
  /**
   *
   * @type {AccountSignInMethod}
   * @memberof SessionInfo
   */
  signInMethod?: AccountSignInMethod;
  /**
   *
   * @type {SessionInfoAccount}
   * @memberof SessionInfo
   */
  account?: SessionInfoAccount;
  /**
   *
   * @type {SessionInfoCharacter}
   * @memberof SessionInfo
   */
  character?: SessionInfoCharacter;
}
