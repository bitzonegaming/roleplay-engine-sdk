import { Config } from './config';
import { ConfigGroupKey } from './config-keys';

export interface ConfigGroup {
  groupKey: ConfigGroupKey;
  groupName?: string;
  configs: Config[];
  groups: ConfigGroup[];
}
