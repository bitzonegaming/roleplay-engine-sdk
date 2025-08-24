import { ApiOptions, EngineClient } from '../core/engine-client';
import { PublicConfig } from './models/public-config';
import { Locale } from '../locale/models/locale';
import { Localization, LocalizationData } from '../localization/models/localization';
import { CharacterGender } from '../character/models/character-gender';
import { CharacterNationality } from '../character/models/character-nationality';
import { ResendEmailVerificationRequest } from './models/resend-email-verification-request';
import { VerifyEmailRequest } from './models/verify-email-request';
import { ForgotPasswordRequest } from './models/forgot-password-request';
import { ResetPasswordRequest } from './models/reset-password-request';
import { ServerTemplate } from '../template/models/server-template';

export class PublicApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * This endpoint retrieves public configuration for the server.
   * @summary Get public configuration
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getConfiguration(options?: ApiOptions): Promise<PublicConfig[]> {
    return this.client.get<PublicConfig[]>({ url: 'public/configuration', options });
  }

  /**
   * This endpoint retrieves enabled locales for the server.
   * @summary Get public locales
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getLocales(options?: ApiOptions): Promise<Locale[]> {
    return this.client.get<Locale[]>({ url: 'public/locales', options });
  }

  /**
   * This endpoint retrieves localization data for the server based on the provided path and user locale. If no path is specified, it returns the default localization for the user\'s locale.
   * @summary Get public localization
   * @param {string} [path]
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getLocalization(path?: string, options?: ApiOptions): Promise<LocalizationData> {
    return this.client.get<Localization>({ url: 'public/localization', query: { path }, options });
  }

  /**
   * This endpoint retrieves public character genders for the server.
   * @summary Get public character genders
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterGenders(options?: ApiOptions): Promise<CharacterGender[]> {
    return this.client.get<CharacterGender[]>({ url: 'public/characters/genders', options });
  }

  /**
   * This endpoint retrieves public character nationalities for the server.
   * @summary Get public character nationalities
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterNationalities(options?: ApiOptions): Promise<CharacterNationality[]> {
    return this.client.get<CharacterNationality[]>({
      url: 'public/characters/nationalities',
      options,
    });
  }

  /**
   * Resend an e-mail verification link to the specified e-mail address. This is useful if the user did not receive the original verification email or if it has expired.
   * @summary Resend e-mail verification
   * @param {ResendEmailVerificationRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public resendEmailVerification(
    request: ResendEmailVerificationRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.post<ResendEmailVerificationRequest, void>({
      url: 'public/accounts/email-verifications',
      data: request,
      options,
    });
  }

  /**
   * Verify the e-mail address associated with the account using the provided token. This is typically done after the user clicks on a verification link sent to their e-mail address.
   * @summary Verify e-mail address
   * @param {VerifyEmailRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public verifyEmail(request: VerifyEmailRequest, options?: ApiOptions): Promise<void> {
    return this.client.put<VerifyEmailRequest, void>({
      url: 'public/accounts/email-verifications',
      data: request,
      options,
    });
  }

  /**
   * Request a password reset for the specified e-mail address. This will send a password reset link to the user\'s e-mail, allowing them to set a new password.
   * @summary Forgot password
   * @param {ForgotPasswordRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public forgotPassword(request: ForgotPasswordRequest, options?: ApiOptions): Promise<void> {
    return this.client.post<ForgotPasswordRequest, void>({
      url: 'public/accounts/password-resets',
      data: request,
      options,
    });
  }

  /**
   * Reset the password for the account using the provided token. This is typically done after the user clicks on a password reset link sent to their e-mail address.
   * @summary Reset password
   * @param {ResetPasswordRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public resetPassword(request: ResetPasswordRequest, options?: ApiOptions): Promise<void> {
    return this.client.put<ResetPasswordRequest, void>({
      url: 'public/accounts/password-resets',
      data: request,
      options,
    });
  }

  /**
   * It returns a list of templates for the server.
   * @summary Get public templates
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getTemplates(options?: ApiOptions): Promise<ReadonlyArray<ServerTemplate>> {
    return this.client.get<ReadonlyArray<ServerTemplate>>({
      url: 'public/templates',
      options,
    });
  }
}
