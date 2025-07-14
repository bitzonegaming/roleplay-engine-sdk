/**
 *
 * @export
 * @interface DiscordUserAccountInfo
 */
export interface DiscordUserAccountInfo {
  /**
   *
   * @type {boolean}
   * @memberof DiscordUserAccountInfo
   */
  accountExists: boolean;
  /**
   *
   * @type {string}
   * @memberof DiscordUserAccountInfo
   */
  usernameRegex: string;
  /**
   *
   * @type {boolean}
   * @memberof DiscordUserAccountInfo
   */
  emailRequired: boolean;
  /**
   *
   * @type {string}
   * @memberof DiscordUserAccountInfo
   */
  userId: string;
  /**
   *
   * @type {boolean}
   * @memberof DiscordUserAccountInfo
   */
  isMemberOfGuild: boolean;
  /**
   *
   * @type {boolean}
   * @memberof DiscordUserAccountInfo
   */
  isWhitelisted: boolean;
  /**
   *
   * @type {Array<string>}
   * @memberof DiscordUserAccountInfo
   */
  roles: Array<string>;
  /**
   *
   * @type {string}
   * @memberof DiscordUserAccountInfo
   */
  username?: string;
}
