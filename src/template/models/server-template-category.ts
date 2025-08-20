import { ServerTemplateConfiguration } from './server-template-configuration';
import { TemplateCategory } from './template-category';

/**
 *
 * @export
 * @interface ServerTemplateCategory
 */
export interface ServerTemplateCategory {
  /**
   *
   * @type {string}
   * @memberof ServerTemplateCategory
   */
  id: TemplateCategory;
  /**
   *
   * @type {string}
   * @memberof ServerTemplateCategory
   */
  name: string;
  /**
   *
   * @type {Array<ServerTemplateConfiguration>}
   * @memberof ServerTemplateCategory
   */
  configuration: Array<ServerTemplateConfiguration>;
}
