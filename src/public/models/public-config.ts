import { ConfigKey } from '../../configuration/models/config-keys';
import { Config } from '../../configuration/models/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const publicConfigKeys = [
  ConfigKey.Name,
  ConfigKey.Platform,
  ConfigKey.PlayerSlot,
  ConfigKey.DefaultLanguage,
  ConfigKey.AccountEmailRequired,
  ConfigKey.AccountUsernameRegex,
  ConfigKey.AccountEmailVerificationRequired,
  ConfigKey.DiscordLoginFlowEnabled,
  ConfigKey.DiscordLoginFlowInGameMethod,
  ConfigKey.DiscordLoginFlowAutoLogin,
  ConfigKey.UsernamePasswordFlowEnabled,
  ConfigKey.AccountPasswordRegex,
  ConfigKey.UsernamePasswordFlowRegistrationEnabled,
  ConfigKey.ExternalLoginFlowEnabled,
  ConfigKey.ExternalLoginFlowIdentifierType,
  ConfigKey.ExternalLoginFlowUseExternalInfo,
  ConfigKey.CharacterMinAge,
  ConfigKey.CharacterMaxAge,
  ConfigKey.CharacterFirstNameMinLength,
  ConfigKey.CharacterFirstNameMaxLength,
  ConfigKey.CharacterLastNameMinLength,
  ConfigKey.CharacterLastNameMaxLength,
  ConfigKey.CharacterFullNameValidationPattern,
  ConfigKey.CharacterNationalityEnabled,
  ConfigKey.MotivesSystemEnabled,
] as const;

type PublicConfigKey = (typeof publicConfigKeys)[number];

export type PublicConfig = Extract<Config, { key: PublicConfigKey }>;
