/**
 *
 * @export
 * @interface PaginatedItems<T>
 */
export interface PaginatedItems<T> {
  /**
   *
   * @type {number}
   * @memberof PaginatedItems<T>
   */
  pageIndex: number;
  /**
   *
   * @type {number}
   * @memberof PaginatedItems<T>
   */
  pageSize: number;
  /**
   *
   * @type {number}
   * @memberof PaginatedItems<T>
   */
  pageCount: number;
  /**
   *
   * @type {number}
   * @memberof PaginatedItems<T>
   */
  totalCount: number;
  /**
   *
   * @type {Array<T>}
   * @memberof PaginatedItems<T>
   */
  items: Array<T>;
}
