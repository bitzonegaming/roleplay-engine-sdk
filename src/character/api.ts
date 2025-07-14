import { ApiOptions, EngineClient } from '../core/engine-client';
import { CharacterGender } from './models/character-gender';
import { CharacterNationality } from './models/character-nationality';
import { CreateCharacterNationalityRequest } from './models/create-character-nationality-request';
import { CreateCharacterGenderRequest } from './models/create-character-gender-request';
import { UpdateCharacterNationalityOrderRequest } from './models/update-character-nationality-order-request';
import { UpdateCharacterGenderOrderRequest } from './models/update-character-gender-order-request';
import { UpdateCharacterBasicInfoRequest } from './models/update-character-basic-info-request';
import { Character } from './models/character';

export class CharacterApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * Creates a new character nationality<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Create character nationality
   * @param {CreateCharacterNationalityRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public createCharacterNationality(
    request: CreateCharacterNationalityRequest,
    options?: ApiOptions,
  ): Promise<CharacterNationality> {
    return this.client.post<CreateCharacterNationalityRequest, CharacterNationality>({
      url: 'characters/nationalities',
      data: request,
      options,
    });
  }

  /**
   * Retrieves all character nationalities<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get character nationalities
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {boolean} [query.enabled] Filter by enabled status.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterNationalities(
    query?: {
      noCache?: boolean;
      enabled?: boolean;
    },
    options?: ApiOptions,
  ): Promise<CharacterNationality[]> {
    return this.client.get<CharacterNationality[]>({
      url: 'characters/nationalities',
      query,
      options,
    });
  }

  /**
   * Retrieves a character nationality by its unique identifier<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get character nationality by ID
   * @param {string} characterNationalityId
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterNationalityById(
    characterNationalityId: string,
    query?: {
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<CharacterNationality> {
    return this.client.get<CharacterNationality>({
      url: `characters/nationalities/${characterNationalityId}`,
      query,
      options,
    });
  }

  /**
   * Enables a character nationality, making it available for use<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Enable character nationality
   * @param {string} characterNationalityId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public enableCharacterNationality(
    characterNationalityId: string,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/nationalities/${characterNationalityId}/enabled`,
      options,
    });
  }

  /**
   * Disables a character nationality, making it unavailable for use<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Disable character nationality
   * @param {string} characterNationalityId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public disableCharacterNationality(
    characterNationalityId: string,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/nationalities/${characterNationalityId}/disabled`,
      options,
    });
  }

  /**
   * Updates the order of a character nationality<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update character nationality order
   * @param {string} characterNationalityId
   * @param {UpdateCharacterNationalityOrderRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateCharacterNationalityOrder(
    characterNationalityId: string,
    request: UpdateCharacterNationalityOrderRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<UpdateCharacterNationalityOrderRequest, void>({
      url: `characters/nationalities/${characterNationalityId}/order`,
      data: request,
      options,
    });
  }

  /**
   * Creates a new character gender<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Create character gender
   * @param {CreateCharacterNationalityRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public createCharacterGender(
    request: CreateCharacterGenderRequest,
    options?: ApiOptions,
  ): Promise<CharacterNationality> {
    return this.client.post<CreateCharacterGenderRequest, CharacterGender>({
      url: 'characters/genders',
      data: request,
      options,
    });
  }

  /**
   * Retrieves all character genders<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get character genders
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {boolean} [query.enabled] Filter by enabled status.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterGenders(
    query?: {
      noCache?: boolean;
      enabled?: boolean;
    },
    options?: ApiOptions,
  ): Promise<CharacterGender[]> {
    return this.client.get<CharacterGender[]>({
      url: 'characters/genders',
      query,
      options,
    });
  }

  /**
   * Retrieves a character gender by its unique identifier<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get character gender by ID
   * @param {string} characterGenderId
   * @param {Object} [query] Query parameters
   * @param {boolean} [query.noCache] If `true`, bypass server cache and fetch fresh data.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCharacterGenderById(
    characterGenderId: string,
    query?: {
      noCache?: boolean;
    },
    options?: ApiOptions,
  ): Promise<CharacterGender> {
    return this.client.get<CharacterGender>({
      url: `characters/genders/${characterGenderId}`,
      query,
      options,
    });
  }

  /**
   * Enables a character gender, making it available for use<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Enable character gender
   * @param {string} characterGenderId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public enableCharacterGender(characterGenderId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/genders/${characterGenderId}/enabled`,
      options,
    });
  }

  /**
   * Disables a character gender, making it unavailable for use<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Disable character gender
   * @param {string} characterGenderId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public disableCharacterGender(characterGenderId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/genders/${characterGenderId}/disabled`,
      options,
    });
  }

  /**
   * Updates the order of a character gender<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:configuration<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:configuration<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update character gender order
   * @param {string} characterGenderId
   * @param {UpdateCharacterGenderOrderRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateCharacterGenderOrder(
    characterGenderId: string,
    request: UpdateCharacterGenderOrderRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<UpdateCharacterGenderOrderRequest, void>({
      url: `characters/genders/${characterGenderId}/order`,
      data: request,
      options,
    });
  }

  /**
   * Updates the basic information of a character<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:character<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:character<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update character basic info
   * @param {string} characterId
   * @param {UpdateCharacterBasicInfoRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateCharacterBasicInfo(
    characterId: string,
    request: UpdateCharacterBasicInfoRequest,
    options?: ApiOptions,
  ): Promise<Character> {
    return this.client.patch<UpdateCharacterBasicInfoRequest, Character>({
      url: `characters/${characterId}/basic-info`,
      data: request,
      options,
    });
  }

  /**
   * Activates a character, making it available for gameplay<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:character<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:character<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Activate character
   * @param {string} characterId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public activateCharacter(characterId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/${characterId}/activated`,
      options,
    });
  }

  /**
   * Deactivates a character, making it unavailable for gameplay<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:character<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:character<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Deactivate character
   * @param {string} characterId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public deactivateCharacter(characterId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `characters/${characterId}/deactivated`,
      options,
    });
  }
}
