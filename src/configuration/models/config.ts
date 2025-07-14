import { ConfigKey } from './config-keys';
import { ConfigDefinitionsMap } from './config-definition';
import { ConfigType } from './config-types';

export interface ConfigSelectOptionValue {
  key: string;
  value: string;
}

export type Config = {
  [K in keyof typeof ConfigKey]: {
    key: (typeof ConfigKey)[K];
    value: ConfigDefinitionsMap[K];
    name?: string;
    description?: string;
    type: ConfigType;
    editable: boolean;
    options?: ConfigSelectOptionValue[];
  };
}[keyof typeof ConfigKey];
