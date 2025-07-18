import { ConfigKey } from './config-keys';
import { ConfigDefinitionsMap } from './config-definition';
import { ConfigType } from './config-types';

export interface ConfigSelectOptionValue {
  key: string;
  value: string;
}

export type Config = {
  [K in ConfigKey]: {
    key: K;
    value: ConfigDefinitionsMap[K];
    name?: string;
    description?: string;
    type: ConfigType;
    editable: boolean;
    options?: ConfigSelectOptionValue[];
  };
}[ConfigKey];
