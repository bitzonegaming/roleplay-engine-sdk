/**
 *
 * @export
 * @interface AccountBan
 */
export interface AccountBan {
  /**
   *
   * @type {string}
   * @memberof AccountBan
   */
  reason: string;
  /**
   *
   * @type {number}
   * @memberof AccountBan
   */
  date: number;
  /**
   *
   * @type {number}
   * @memberof AccountBan
   */
  endDate: number;
  /**
   *
   * @type {string}
   * @memberof AccountBan
   */
  executorUser: string;
}
