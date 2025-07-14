/**
 *
 * @export
 * @interface SessionInfoCharacter
 */
export interface SessionInfoCharacter {
  /**
   *
   * @type {string}
   * @memberof SessionInfoCharacter
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfoCharacter
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfoCharacter
   */
  lastName: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfoCharacter
   */
  fullName: string;
  /**
   *
   * @type {number}
   * @memberof SessionInfoCharacter
   */
  linkedDate: number;
  /**
   *
   * @type {Array<string>}
   * @memberof SessionInfoCharacter
   */
  segmentDefinitionIds: Array<string>;
}
