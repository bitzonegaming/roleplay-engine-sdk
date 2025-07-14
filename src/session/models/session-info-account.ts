/**
 *
 * @export
 * @interface SessionInfoAccount
 */
export interface SessionInfoAccount {
  /**
   *
   * @type {string}
   * @memberof SessionInfoAccount
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof SessionInfoAccount
   */
  username: string;
  /**
   *
   * @type {Array<string>}
   * @memberof SessionInfoAccount
   */
  segmentDefinitionIds: Array<string>;
  /**
   *
   * @type {number}
   * @memberof SessionInfoAccount
   */
  authorizedDate: number;
}
