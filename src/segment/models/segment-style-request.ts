import { SegmentColorRequest } from './segment-color-request';

/**
 *
 * @export
 * @interface SegmentStyleRequest
 */
export interface SegmentStyleRequest {
  /**
   *
   * @type {SegmentColorRequest}
   * @memberof SegmentStyleRequest
   */
  color?: SegmentColorRequest | null;
}
