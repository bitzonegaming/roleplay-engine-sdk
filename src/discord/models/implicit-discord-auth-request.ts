/**
 *
 * @export
 * @interface ImplicitDiscordAuthRequest
 */
export interface ImplicitDiscordAuthRequest {
  /**
   * Discord user ID of the authenticated user.
   * @type {string}
   * @memberof ImplicitDiscordAuthRequest
   */
  discordUserId: string;
  /**
   * Username of the authenticated user. It should not be null if it is first time user is authenticated.
   * @type {string}
   * @memberof ImplicitDiscordAuthRequest
   */
  username?: string | null;
  /**
   * Email of the authenticated user. It should not be null if it is first time user is authenticated and email is required.
   * @type {string}
   * @memberof ImplicitDiscordAuthRequest
   */
  email?: string | null;
  /**
   * Locale of the authenticated user.
   * @type {string}
   * @memberof ImplicitDiscordAuthRequest
   */
  locale?: string;
}
