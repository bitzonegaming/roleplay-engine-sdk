import { ApiOptions, EngineClient } from '../core/engine-client';
import { StartSessionRequest } from './models/start-session-request';
import { SessionWithToken } from './models/session-with-token';
import { AuthorizeSessionRequest } from './models/authorize-session-request';
import { SessionInfo } from './models/session-info';
import { LinkCharacterToSessionRequest } from './models/link-character-to-session-request';
import { Session, SessionEndReason } from './models/session';

export class SessionApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * Starts a new session for the given IP address. This endpoint is used to initiate a session in the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:session_start
   * @summary Start a new session
   * @param {string} sessionId
   * @param {StartSessionRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public startSession(
    sessionId: string,
    request: StartSessionRequest,
    options?: ApiOptions,
  ): Promise<SessionWithToken> {
    return this.client.post<StartSessionRequest, SessionWithToken>({
      url: `sessions/${sessionId}`,
      data: request,
      options,
    });
  }

  /**
   * Authorizes a session with the given access token. It associates the session with the account that owns the access token.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:session_authorize
   * @summary Authorize session
   * @param {string} sessionId
   * @param {AuthorizeSessionRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public authorizeSession(
    sessionId: string,
    request: AuthorizeSessionRequest,
    options?: ApiOptions,
  ): Promise<SessionInfo> {
    return this.client.put<AuthorizeSessionRequest, SessionInfo>({
      url: `sessions/${sessionId}/auth`,
      data: request,
      options,
    });
  }

  /**
   * Links a character to a session by its ID. This endpoint is used to associate a character with an active session in the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:session_authorize
   * @summary Link character to session
   * @param {string} sessionId
   * @param {LinkCharacterToSessionRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public linkCharacterToSession(
    sessionId: string,
    request: LinkCharacterToSessionRequest,
    options?: ApiOptions,
  ): Promise<SessionInfo> {
    return this.client.put<LinkCharacterToSessionRequest, SessionInfo>({
      url: `sessions/${sessionId}/character`,
      data: request,
      options,
    });
  }

  /**
   * Finishes a session by its ID. This endpoint is used to end a session in the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:session_finish
   * @summary Finish session
   * @param {string} sessionId
   * @param {Object} [query]                       Query parameters.
   * @param {SessionEndReason} [query.endReason]      A code indicating why the session was ended.
   * @param {string} [query.endReasonText]            A human-readable description of the end reason.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public finishSession(
    sessionId: string,
    query?: { endReason?: SessionEndReason; endReasonText?: string },
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.delete<void>({
      url: `sessions/${sessionId}`,
      query,
      options,
    });
  }

  /**
   * Retrieves a session by its ID. This endpoint is used to get the details of a specific session in the game server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:session<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:session<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get session by id
   * @param {string} sessionId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSessionById(sessionId: string, options?: ApiOptions): Promise<Session> {
    return this.client.get<Session>({
      url: `sessions/${sessionId}`,
      options,
    });
  }

  /**
   * Retrieves the active session information by its ID. This endpoint is used to get the details of an active session in the game server. Returns 404 if the session is not active.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:session<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:session<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get active session info
   * @param {string} sessionId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getActiveSessionInfo(sessionId: string, options?: ApiOptions): Promise<SessionInfo> {
    return this.client.get<SessionInfo>({
      url: `sessions/${sessionId}/info`,
      options,
    });
  }
}
