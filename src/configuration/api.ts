import { ApiOptions, EngineClient } from '../core/engine-client';
import { Config } from './models/config';
import { ConfigGroup } from './models/config-group';
import { UpdateConfigurationRequest } from './models/update-configuration-request';

export class ConfigurationApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of configuration based on the provided filters.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get configuration
   * @param {Object} [query]                     Query parameters.
   * @param {boolean} [query.localized]          If `true`, return localized configuration values.
   * @param {boolean} [query.withOptions]        If `true`, include available option values.
   * @param {boolean} [query.onlyPublic]         If `true`, return only public configurations.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getConfiguration(
    query?: { localized?: boolean; withOptions?: boolean; onlyPublic?: boolean },
    options?: ApiOptions,
  ): Promise<Config[]> {
    return this.client.get<Config[]>({
      url: 'configuration',
      query,
      options,
    });
  }

  /**
   * It returns a list of grouped configuration based on the provided filters.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get grouped configuration
   * @param {Object} [query]                     Query parameters.
   * @param {boolean} [query.localized]          If `true`, return localized configuration values.
   * @param {boolean} [query.withOptions]        If `true`, include available option values.
   * @param {boolean} [query.onlyPublic]         If `true`, return only public configurations.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getGroupedConfiguration(
    query?: { localized?: boolean; withOptions?: boolean; onlyPublic?: boolean },
    options?: ApiOptions,
  ): Promise<ConfigGroup[]> {
    return this.client.get<ConfigGroup[]>({
      url: 'configuration/grouped',
      query,
      options,
    });
  }

  /**
   * It updates the server configuration. The request body should contain a dictionary of configuration values.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update configuration
   * @param {UpdateConfigurationRequest} [request]
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateConfiguration(
    request: UpdateConfigurationRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.patch<UpdateConfigurationRequest, void>({
      url: 'configuration',
      data: request,
      options,
    });
  }
}
