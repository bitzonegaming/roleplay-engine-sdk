import { ApiOptions, EngineClient } from '../core/engine-client';
import { RegisterAccountRequest } from './models/register-account-request';
import { Account } from './models/account';
import { AccountAuthRequest } from './models/account-auth-request';
import { GrantAccessResult } from './models/grant-access-result';
import { Character } from '../character/models/character';
import { ExternalLoginPreAuthRequest } from './models/external-login-pre-auth-request';
import { ExternalLoginPreAuthResult } from './models/external-login-pre-auth-result';
import { ExternalLoginAuthRequest } from './models/external-login-auth-request';

export class AccountApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * Registers a new account in the game server. This endpoint is used to create a new player account.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:account<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:account<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Register a new account
   * @param {RegisterAccountRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public registerAccount(request: RegisterAccountRequest, options?: ApiOptions): Promise<Account> {
    return this.client.post<RegisterAccountRequest, Account>({
      url: 'accounts',
      data: request,
      options,
    });
  }

  /**
   * Authenticates a player using their password. This endpoint is used to log in a player to the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary Authenticate with password
   * @param {AccountAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public authWithPassword(
    request: AccountAuthRequest,
    options?: ApiOptions,
  ): Promise<GrantAccessResult> {
    return this.client.post<AccountAuthRequest, GrantAccessResult>({
      url: 'accounts/auth',
      data: request,
      options,
    });
  }

  /**
   * Retrieves an account by its unique identifier. This endpoint is used to fetch account details for a specific player.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:account<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:account<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get account by id
   * @param {string} accountId
   * @param {Object} [query]                   Query parameters.
   * @param {boolean} [query.includeSignInOptions]  If `true`, include activated sign-in options in the response.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getAccountById(
    accountId: string,
    query?: { includeSignInOptions?: boolean },
    options?: ApiOptions,
  ): Promise<Account> {
    return this.client.get<Account>({
      url: `accounts/${accountId}`,
      query,
      options,
    });
  }

  /**
   * Retrieves all characters associated with a specific account. This endpoint is used to list characters for a player.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:character<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:character<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get account characters
   * @param {string} accountId
   * @param {Object} [query]                   Query parameters.
   * @param {boolean} [query.includeAppearance]      If `true`, include character appearance details in the response.
   * @param {boolean} [query.includeMotives]         If `true`, include character motives data in the response.
   * @param {boolean} [query.onlyActive]             If `true`, return only characters that are currently active.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getAccountCharacters(
    accountId: string,
    query?: { includeAppearance?: boolean; includeMotives?: boolean; onlyActive?: boolean },
    options?: ApiOptions,
  ): Promise<Character[]> {
    return this.client.get<Character[]>({
      url: `accounts/${accountId}/characters`,
      query,
      options,
    });
  }

  /**
   * Pre-authenticates a player for external login. This endpoint is used to initiate the external login flow.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary External login pre-authentication
   * @param {ExternalLoginPreAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public preAuthExternalLogin(
    request: ExternalLoginPreAuthRequest,
    options?: ApiOptions,
  ): Promise<ExternalLoginPreAuthResult> {
    return this.client.post<ExternalLoginPreAuthRequest, ExternalLoginPreAuthResult>({
      url: 'accounts/external-login/pre-auth',
      data: request,
      options,
    });
  }

  /**
   * Authenticates a player using external login credentials. This endpoint is used to complete the external login flow.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:player_auth
   * @summary External login authentication
   * @param {ExternalLoginAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public authExternalLogin(
    request: ExternalLoginAuthRequest,
    options?: ApiOptions,
  ): Promise<GrantAccessResult> {
    return this.client.post<ExternalLoginPreAuthRequest, GrantAccessResult>({
      url: 'accounts/external-login/auth',
      data: request,
      options,
    });
  }
}
