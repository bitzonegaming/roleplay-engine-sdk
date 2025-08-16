import { ApiOptions, EngineClient } from '../core/engine-client';
import { DiscordUserAccountInfo } from './models/discord-user-account-info';
import { ImplicitDiscordAuthRequest } from './models/implicit-discord-auth-request';
import { GrantAccessResult } from '../account/models/grant-access-result';
import { DiscordOAuthTokenRequest } from './models/discord-oauth-token-request';
import { DiscordOAuthRedirectType } from './models/discord-oauth-redirect-type';
import { RedirectUri } from '../common/redirect-uri';

export class DiscordApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * Retrieves a Discord user with the guild membership information by their unique identifier. This endpoint is used to fetch Discord user details for a specific player.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:account
   * @summary Get Discord user by id
   * @param {string} discordUserId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getDiscordUserById(
    discordUserId: string,
    options?: ApiOptions,
  ): Promise<DiscordUserAccountInfo> {
    return this.client.get<DiscordUserAccountInfo>({
      url: `discord/users/${discordUserId}`,
      options,
    });
  }

  /**
   * This endpoint allows players to authenticate with Discord using the implicit flow. It returns a grant access result containing the player\'s account information and access token.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary Authorize with implicit Discord flow
   * @param {ImplicitDiscordAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public authImplicitFlow(
    request: ImplicitDiscordAuthRequest,
    options?: ApiOptions,
  ): Promise<GrantAccessResult> {
    return this.client.post<ImplicitDiscordAuthRequest, GrantAccessResult>({
      url: `discord/auth`,
      data: request,
      options,
    });
  }

  /**
   * This endpoint allows players to authenticate with Discord using OAuth tokens. It returns a grant access result containing the player\'s account information and access token.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary Authorize with Discord OAuth token
   * @param {DiscordOAuthTokenRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public authOAuthFlow(
    request: DiscordOAuthTokenRequest,
    options?: ApiOptions,
  ): Promise<GrantAccessResult> {
    return this.client.post<DiscordOAuthTokenRequest, GrantAccessResult>({
      url: `discord/oauth/token`,
      data: request,
      options,
    });
  }

  /**
   * This endpoint retrieves the OAuth authorization URL for Discord. It is used to initiate the OAuth flow for players to grant access to their Discord account. <br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary Authorize with Discord OAuth token
   * @param {DiscordOAuthRedirectType} redirectType
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getDiscordOAuthAuthorizeUrl(
    redirectType: DiscordOAuthRedirectType,
    options?: ApiOptions,
  ): Promise<RedirectUri> {
    return this.client.get<RedirectUri>({
      url: `discord/oauth/authorize?redirectType=${redirectType}`,
      options,
    });
  }
}
