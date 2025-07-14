import { ApiOptions, EngineClient } from '../core/engine-client';
import { Localization } from './models/localization';
import { LocalizationCustomization } from './models/localization-customization';

export class LocalizationApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns the localization data for the server based on the provided locale and path. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get localization
   * @param {Object} [query] Query parameters
   * @param {string} [query.locale] Locale code to fetch translations for.
   * @param {string} [query.path]   Path to the specific localization resource.
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {ApiOptions} [options] Override HTTP request options.
   * @throws {EngineError}
   */
  public getLocalization(
    query?: { locale?: string; path?: string; noCache?: boolean },
    options?: ApiOptions,
  ): Promise<Localization> {
    return this.client.get<Localization>({ url: 'localization', query, options });
  }

  /**
   * It updates the localization definitions for the server. The request body should contain a dictionary of localization definitions.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update localization definitions
   * @param {Localization} definitionsByLocale
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateLocalizationDefinitions(
    definitionsByLocale: Localization,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.patch<Localization, void>({
      url: 'localization/definitions',
      data: definitionsByLocale,
      options,
    });
  }

  /**
   * It customizes the localization for the server. The request body should contain a dictionary of localization customizations.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update localization customization
   * @param {LocalizationCustomization} customizationByLocale
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateLocalizationCustomization(
    customizationByLocale: LocalizationCustomization,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.patch<LocalizationCustomization, void>({
      url: 'localization/customization',
      data: customizationByLocale,
      options,
    });
  }
}
