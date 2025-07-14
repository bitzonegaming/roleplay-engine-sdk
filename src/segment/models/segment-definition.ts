import { SegmentPolicy } from './segment-policy';
import { SegmentStyle } from './segment-style';
import { JsonCondition } from '../../common/json-condition';
import { ReferenceCategory } from '../../reference/models/reference-category';
import { SegmentTypeCode } from './segment-type';

/**
 *
 * @export
 * @interface SegmentDefinition
 */
export interface SegmentDefinition {
  /**
   *
   * @type {string}
   * @memberof SegmentDefinition
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof SegmentDefinition
   */
  name: string;
  /**
   *
   * @type {SegmentTypeCode}
   * @memberof SegmentDefinition
   */
  type: SegmentTypeCode;
  /**
   *
   * @type {string}
   * @memberof SegmentDefinition
   */
  typeName: string;
  /**
   *
   * @type {ReferenceCategory}
   * @memberof SegmentDefinition
   */
  category: ReferenceCategory;
  /**
   *
   * @type {string}
   * @memberof SegmentDefinition
   */
  categoryName: string;
  /**
   *
   * @type {SegmentPolicy}
   * @memberof SegmentDefinition
   */
  policy: SegmentPolicy;
  /**
   *
   * @type {SegmentStyle}
   * @memberof SegmentDefinition
   */
  style: SegmentStyle;
  /**
   *
   * @type {boolean}
   * @memberof SegmentDefinition
   */
  visible: boolean;
  /**
   *
   * @type {JsonCondition}
   * @memberof SegmentDefinition
   */
  condition?: JsonCondition;
  /**
   *
   * @type {number}
   * @memberof SegmentDefinition
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof SegmentDefinition
   */
  lastModifiedDate: number;
}
