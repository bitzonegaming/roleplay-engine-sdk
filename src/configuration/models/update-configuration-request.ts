import { ConfigTypeValueMap } from './config-types';
import { ConfigDefinitionsMap } from './config-definition';

type KnownKey = keyof ConfigDefinitionsMap;

export type KnownConfigUpdates = {
  [K in KnownKey]?: {
    type: {
      [P in keyof ConfigTypeValueMap]: ConfigDefinitionsMap[K] extends ConfigTypeValueMap[P]
        ? P
        : never;
    }[keyof ConfigTypeValueMap];
    value: ConfigDefinitionsMap[K];
    customGroup?: string;
  };
};

type CustomConfigUpdateEntry = {
  [T in keyof ConfigTypeValueMap]: {
    type: T;
    value: ConfigTypeValueMap[T];
    customGroup?: string;
  };
}[keyof ConfigTypeValueMap];

export type CustomConfigUpdates = {
  [K in string as K extends KnownKey ? never : K]?: CustomConfigUpdateEntry;
};

export type UpdateConfigurationRequest = KnownConfigUpdates & CustomConfigUpdates;
