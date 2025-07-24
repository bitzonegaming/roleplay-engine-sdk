import { AccountSignInMethod } from '../../account/models/account-sign-in-method';

export enum SessionEndReason {
  SessionInitFailed = 'SESSION_INIT_FAILED',
  DroppedByServer = 'DROPPED_BY_SERVER',
  ReplacedByNewSession = 'REPLACED_BY_NEW_SESSION',
  ConnectionDropped = 'CONNECTION_DROPPED',
  Crashed = 'CRASHED',
  PlayerQuit = 'PLAYER_QUIT',
  KickedByAdmin = 'KICKED_BY_ADMIN',
  BannedByAdmin = 'BANNED_BY_ADMIN',
  KickedByServer = 'KICKED_BY_SERVER',
  BannedByServer = 'BANNED_BY_SERVER',
}

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
   * @type {SessionEndReason}
   * @memberof Session
   */
  endReason?: SessionEndReason;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  endReasonText?: string;
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
