import { CharacterAppearance } from './character-appearance';
import { CharacterMotives } from './character-motives';

/**
 *
 * @export
 * @interface Character
 */
export interface Character {
  /**
   *
   * @type {string}
   * @memberof Character
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  accountId: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  lastName: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  fullName: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  birthDate: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  gender: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  genderName: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  nationality?: string;
  /**
   *
   * @type {string}
   * @memberof Character
   */
  nationalityName?: string;
  /**
   *
   * @type {CharacterMotives}
   * @memberof Character
   */
  motives?: CharacterMotives;
  /**
   *
   * @type {CharacterAppearance}
   * @memberof Character
   */
  appearance?: CharacterAppearance;
  /**
   *
   * @type {boolean}
   * @memberof Character
   */
  isActive: boolean;
  /**
   *
   * @type {number}
   * @memberof Character
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Character
   */
  lastModifiedDate: number;
}
