import { DiscordOAuthRedirectType } from './discord-oauth-redirect-type';

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

  /**
   * Redirect type where the user was sent after consent. (GAME or SCP)
   * @type {DiscordOAuthRedirectType}
   * @memberof DiscordOAuthTokenRequest
   */
  redirectType: DiscordOAuthRedirectType;
}
