import { AccountSignInMethod } from '../../account/models/account-sign-in-method';

/**
 *
 * @export
 * @interface Session
 */
export interface Session {
  /**
   *
   * @type {string}
   * @memberof Session
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  ipAddress: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  accountId?: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  characterId?: string;
  /**
   *
   * @type {AccountSignInMethod}
   * @memberof Session
   */
  signInMethod?: AccountSignInMethod;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  endDate?: number;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  authorizedDate?: number;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  lastHeartbeatDate?: number;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  characterLinkedDate?: number;
  /**
   *
   * @type {boolean}
   * @memberof Session
   */
  isActive: boolean;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Session
   */
  lastModifiedDate: number;
}
