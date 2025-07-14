import { SegmentPolicy } from './segment-policy';
import { SegmentStyle } from './segment-style';
import { SegmentTypeCode } from './segment-type';
import { ReferenceCategory } from '../../reference/models/reference-category';

/**
 *
 * @export
 * @interface Segment
 */
export interface Segment {
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  segmentDefinitionId: string;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  name: string;
  /**
   *
   * @type {SegmentTypeCode}
   * @memberof Segment
   */
  type: SegmentTypeCode;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  typeName: string;
  /**
   *
   * @type {ReferenceCategory}
   * @memberof Segment
   */
  category: ReferenceCategory;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  categoryName: string;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  referenceId: string;
  /**
   *
   * @type {string}
   * @memberof Segment
   */
  referenceName: string;
  /**
   *
   * @type {SegmentPolicy}
   * @memberof Segment
   */
  policy: SegmentPolicy;
  /**
   *
   * @type {SegmentStyle}
   * @memberof Segment
   */
  style: SegmentStyle;
  /**
   *
   * @type {number}
   * @memberof Segment
   */
  validUntil?: number;
  /**
   *
   * @type {boolean}
   * @memberof Segment
   */
  visible: boolean;
  /**
   *
   * @type {number}
   * @memberof Segment
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Segment
   */
  lastModifiedDate: number;
}
