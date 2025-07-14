export enum SegmentTypeCode {
  Manual = 'MANUAL',
  Auto = 'AUTO',
}

/**
 *
 * @export
 * @interface SegmentType
 */
export interface SegmentType {
  /**
   *
   * @type {SegmentTypeCode}
   * @memberof SegmentType
   */
  code: SegmentTypeCode;
  /**
   *
   * @type {string}
   * @memberof SegmentType
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof SegmentType
   */
  description: string;
  /**
   *
   * @type {boolean}
   * @memberof SegmentType
   */
  supportsMetrics: boolean;
}
