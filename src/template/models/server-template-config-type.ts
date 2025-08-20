import { ConfigType } from '../../configuration/models/config-types';

export type ServerTemplateConfigType =
  | ConfigType.Int32
  | ConfigType.Int64
  | ConfigType.Decimal
  | ConfigType.Boolean
  | ConfigType.String
  | ConfigType.SelectOption
  | ConfigType.Color
  | ConfigType.Image;
