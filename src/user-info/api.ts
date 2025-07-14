import { ApiOptions, EngineClient } from '../core/engine-client';
import { UserInfo } from './models/user-info';

export class UserInfoApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * Returns the user information of the authenticated user, including account policies, username, and email.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get user info
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getUserInfo(options?: ApiOptions): Promise<UserInfo> {
    return this.client.get<UserInfo>({
      url: 'user-info',
      options,
    });
  }
}
