import { ReferenceCategory } from '../../reference/models/reference-category';

/**
 *
 * @export
 * @interface SegmentCategory
 */
export interface SegmentCategory {
  /**
   *
   * @type {ReferenceCategory}
   * @memberof SegmentCategory
   */
  code: ReferenceCategory;
  /**
   *
   * @type {string}
   * @memberof SegmentCategory
   */
  name: string;
  /**
   *
   * @type {boolean}
   * @memberof SegmentCategory
   */
  supportsAccessPolicies: boolean;
}
