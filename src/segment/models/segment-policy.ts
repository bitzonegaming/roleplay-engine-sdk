/**
 *
 * @export
 * @interface SegmentPolicy
 */
export interface SegmentPolicy {
  /**
   *
   * @type {Array<string>}
   * @memberof SegmentPolicy
   */
  accessPolicies: Array<string>;
  /**
   *
   * @type {object}
   * @memberof SegmentPolicy
   */
  vehicle?: object;
}
