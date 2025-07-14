/**
 *
 * @export
 * @interface ApplySegmentToReferenceRequest
 */
export interface ApplySegmentToReferenceRequest {
  /**
   * Optional timestamp in milliseconds when the segment should be valid until. If not provided, the segment will be valid indefinitely.
   * @type {number}
   * @memberof ApplySegmentToReferenceRequest
   */
  validUntil?: number | null;
}
