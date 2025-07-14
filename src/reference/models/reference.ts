import { ReferenceCategory } from './reference-category';

/**
 *
 * @export
 * @interface Reference
 */
export interface Reference {
  /**
   *
   * @type {string}
   * @memberof Reference
   */
  id: string;
  /**
   *
   * @type {ReferenceCategory}
   * @memberof Reference
   */
  category: ReferenceCategory;
  /**
   *
   * @type {string}
   * @memberof Reference
   */
  categoryName: string;
  /**
   *
   * @type {string}
   * @memberof Reference
   */
  referenceId: string;
  /**
   *
   * @type {string}
   * @memberof Reference
   */
  name: string;
  /**
   *
   * @type {boolean}
   * @memberof Reference
   */
  enabled: boolean;
}

export function generateCategoryReferenceId(
  category: ReferenceCategory,
  referenceId: string,
): string {
  return `${category}:${referenceId}`;
}
