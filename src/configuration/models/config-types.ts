export interface ConfigGroupToggle {
  enabled: boolean;
}

export interface ConfigSelectOption {
  key: string;
}

export interface ConfigPosition {
  x: number;
  y: number;
  z: number;
  dimension: number;
}

export interface ConfigSecret {
  secret: string;
}

export interface ConfigRegex {
  expression: string;
}

export enum ConfigType {
  Int32 = 'Int32',
  Int64 = 'Int64',
  Boolean = 'Boolean',
  String = 'String',
  GroupToggle = 'ServerConfigGroupToggle',
  SelectOption = 'ServerConfigSelectOption',
  Position = 'Position',
  Secret = 'ServerConfigSecret',
  Regex = 'ServerRegexConfig',
}

export interface ConfigTypeValueMap {
  [ConfigType.Int32]: number;
  [ConfigType.Int64]: number;
  [ConfigType.Boolean]: boolean;
  [ConfigType.String]: string;
  [ConfigType.GroupToggle]: ConfigGroupToggle;
  [ConfigType.SelectOption]: ConfigSelectOption;
  [ConfigType.Position]: ConfigPosition;
  [ConfigType.Secret]: ConfigSecret;
  [ConfigType.Regex]: ConfigRegex;
}

export type ConfigTypes =
  | string
  | number
  | boolean
  | ConfigGroupToggle
  | ConfigSelectOption
  | ConfigPosition
  | ConfigSecret
  | ConfigRegex;
