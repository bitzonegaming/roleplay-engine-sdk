/**
 *
 * @export
 * @interface AuthorizeSessionRequest
 */
export interface AuthorizeSessionRequest {
  /**
   * Access token of the user. It is required to authorize the session.
   * @type {string}
   * @memberof AuthorizeSessionRequest
   */
  accessToken: string;
}
