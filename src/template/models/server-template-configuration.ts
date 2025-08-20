import { ServerTemplateConfigType } from './server-template-config-type';
import { ConfigTypeValueMap } from '../../configuration/models/config-types';

/**
 * Base interface for ServerTemplateConfiguration
 * @interface ServerTemplateConfigurationBase
 */
interface ServerTemplateConfigurationBase<T extends ServerTemplateConfigType> {
  /**
   *
   * @type {string}
   * @memberof ServerTemplateConfigurationBase
   */
  key: string;
  /**
   *
   * @type {string}
   * @memberof ServerTemplateConfigurationBase
   */
  templateKey: string;
  /**
   *
   * @type {T}
   * @memberof ServerTemplateConfigurationBase
   */
  type: T;
  /**
   *
   * @type {string}
   * @memberof ServerTemplateConfigurationBase
   */
  name: string;
  /**
   *
   * @type {string | null}
   * @memberof ServerTemplateConfigurationBase
   */
  description?: string;
  /**
   *
   * @type {ConfigTypeValueMap[T]}
   * @memberof ServerTemplateConfigurationBase
   */
  value: ConfigTypeValueMap[T];
  /**
   *
   * @type {string}
   * @memberof ServerTemplateConfigurationBase
   */
  customGroup: string;
}

/**
 * Union type for all possible ServerTemplateConfiguration types
 * @export
 * @type ServerTemplateConfiguration
 */
export type ServerTemplateConfiguration = {
  [K in ServerTemplateConfigType]: ServerTemplateConfigurationBase<K>;
}[ServerTemplateConfigType];
