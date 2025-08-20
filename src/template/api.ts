import { ApiOptions, EngineClient } from '../core/engine-client';
import { ServerTemplate } from './models/server-template';

export class TemplateApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of templates. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get templates
   * @param {Object} [query]                   Query parameters.
   * @param {boolean} [query.noCache]               If `true`, the request will not use the cache.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getTemplates(
    query: { noCache?: boolean },
    options?: ApiOptions,
  ): Promise<ReadonlyArray<ServerTemplate>> {
    return this.client.get<ReadonlyArray<ServerTemplate>>({
      url: 'templates',
      query,
      options,
    });
  }
}
