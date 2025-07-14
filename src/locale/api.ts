import { ApiOptions, EngineClient } from '../core/engine-client';
import { Locale } from './models/locale';
import { UpdateLocaleOrderRequest } from './models/update-locale-order-request';
import { AddLocaleRequest } from './models/add-locale-request';

export class LocaleApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It returns a list of locales based on the provided filters. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get locales
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.enabled] Filter by enabled status.
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {ApiOptions} [options] Override HTTP request options.
   * @throws {EngineError}
   */
  public getLocales(
    query?: { enabled?: boolean; noCache?: boolean },
    options?: ApiOptions,
  ): Promise<Locale[]> {
    return this.client.get<Locale[]>({ url: 'locales', query, options });
  }

  /**
   * It adds a new locale to the server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Add locale
   * @param {AddLocaleRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public addLocale(request: AddLocaleRequest, options?: ApiOptions): Promise<Locale> {
    return this.client.post<AddLocaleRequest, Locale>({
      url: `locales`,
      data: request,
      options,
    });
  }

  /**
   * It enables a locale for the server by its code.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Enable locale
   * @param {string} locale
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public enableLocale(locale: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `locales/${locale}/enabled`,
      options,
    });
  }

  /**
   * It disables a locale for the server by its code.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Disable locale
   * @param {string} locale
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public disableLocale(locale: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `locales/${locale}/disabled`,
      options,
    });
  }

  /**
   * It changes the order of a locale for the server by its code.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:localization<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:localization<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update locale order
   * @param {string} locale
   * @param {UpdateLocaleOrderRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateLocaleOrder(
    locale: string,
    request: UpdateLocaleOrderRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<UpdateLocaleOrderRequest, void>({
      url: `locales/${locale}/order`,
      data: request,
      options,
    });
  }
}
