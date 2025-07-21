import { ApiOptions, EngineClient } from '../core/engine-client';
import { CreateSoundRequest } from './models/create-sound-request';
import { Sound, SoundType } from './models/sound';
import { UpdateSoundRequest } from './models/update-sound-request';

export class SoundApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It creates a new sound for use on the server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Create sound
   * @param {CreateSoundRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public createSound(request: CreateSoundRequest, options?: ApiOptions): Promise<Sound> {
    return this.client.post<CreateSoundRequest, Sound>({
      url: 'sounds',
      data: request,
      options,
    });
  }

  /**
   * It updates an existing sound on the server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update sound
   * @param {string} soundId
   * @param {AccountAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateSound(
    soundId: string,
    request: UpdateSoundRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<UpdateSoundRequest, void>({
      url: `sounds/${soundId}`,
      data: request,
      options,
    });
  }

  /**
   * It returns a sound by its ID. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get sound by ID
   * @param {string} soundId
   * @param {Object} [query]                   Query parameters.
   * @param {boolean} [query.noCache]           If `true`, the request will not use the cache.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSoundById(
    soundId: string,
    query?: { noCache: boolean },
    options?: ApiOptions,
  ): Promise<Sound> {
    return this.client.get<Sound>({
      url: `sounds/${soundId}`,
      query,
      options,
    });
  }

  /**
   * It returns a list of sounds based on the provided filters. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get sounds
   * @param {Object} [query]                   Query parameters.
   * @param {SoundType} [query.type]                  Filter sounds by type (e.g., 'EXTERNAL', 'NATIVE').
   * @param {boolean} [query.enabled]               Filter sounds by their enabled status.
   * @param {boolean} [query.noCache]               If `true`, the request will not use the cache.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getSounds(
    query?: { type?: SoundType; enabled?: boolean; noCache: boolean },
    options?: ApiOptions,
  ): Promise<Sound[]> {
    return this.client.get<Sound[]>({
      url: `sounds`,
      query,
      options,
    });
  }

  /**
   * It enables a sound for the server by its ID.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Enable sound
   * @param {string} soundId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public enableSound(soundId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `sounds/${soundId}/enabled`,
      options,
    });
  }

  /**
   * It disables a sound for the server by its ID.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Disable sound
   * @param {string} soundId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public disableSound(soundId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `sounds/${soundId}/disabled`,
      options,
    });
  }
}
