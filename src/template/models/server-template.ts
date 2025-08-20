import { ServerTemplateCategory } from './server-template-category';

/**
 *
 * @export
 * @interface ServerTemplate
 */
export interface ServerTemplate {
  /**
   *
   * @type {string}
   * @memberof ServerTemplate
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof ServerTemplate
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof ServerTemplate
   */
  minorVersion: string;
  /**
   *
   * @type {string}
   * @memberof ServerTemplate
   */
  fullVersion: string;
  /**
   *
   * @type {Array<ServerTemplateCategory>}
   * @memberof ServerTemplate
   */
  categories: Array<ServerTemplateCategory>;
}
