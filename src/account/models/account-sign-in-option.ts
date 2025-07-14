/**
 *
 * @export
 * @interface AccountSignInOption
 */
export interface AccountSignInOption {
  /**
   *
   * @type {string}
   * @memberof AccountSignInOption
   */
  method: string;
  /**
   *
   * @type {string}
   * @memberof AccountSignInOption
   */
  externalId: string | null;
  /**
   *
   * @type {number}
   * @memberof AccountSignInOption
   */
  createdDate: number;
}
