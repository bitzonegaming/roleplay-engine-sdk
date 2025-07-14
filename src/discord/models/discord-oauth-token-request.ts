/**
 *
 * @export
 * @interface DiscordOAuthTokenRequest
 */
export interface DiscordOAuthTokenRequest {
  /**
   * Authorization code received from Discord after user consent.
   * @type {string}
   * @memberof DiscordOAuthTokenRequest
   */
  code: string;
}
