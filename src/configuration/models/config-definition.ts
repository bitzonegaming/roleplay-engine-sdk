import { ConfigKey } from './config-keys';
import { ConfigGroupToggle, ConfigRegex, ConfigSecret, ConfigSelectOption } from './config-types';

export interface ConfigDefinitionsMap {
  // GENERAL
  [ConfigKey.Name]: string;
  [ConfigKey.Platform]: ConfigSelectOption;
  [ConfigKey.ScpAddress]: string;
  [ConfigKey.PlayerSlot]: number;
  [ConfigKey.DefaultLanguage]: ConfigSelectOption;

  // NOTIFICATION - SMTP
  [ConfigKey.SmtpEnabled]: ConfigGroupToggle;
  [ConfigKey.SmtpServerHost]: string;
  [ConfigKey.SmtpServerPort]: number;
  [ConfigKey.SmtpServerUseSsl]: boolean;
  [ConfigKey.SmtpVerificationEmailEnabled]: ConfigGroupToggle;
  [ConfigKey.SmtpVerificationEmailAccountUsername]: string;
  [ConfigKey.SmtpVerificationEmailAccountPassword]: ConfigSecret;
  [ConfigKey.SmtpVerificationEmailAccountFromMail]: string;
  [ConfigKey.SmtpVerificationEmailAccountFromName]: string;

  // WORLD - CAMERA
  [ConfigKey.LoginScreenCamera]: ConfigSelectOption;

  // ACCOUNT - AUTH
  [ConfigKey.AccountEmailRequired]: boolean;
  [ConfigKey.AccountUsernameRegex]: ConfigRegex;
  [ConfigKey.AccountPasswordRegex]: ConfigRegex;
  [ConfigKey.AccountEmailVerificationRequired]: boolean;
  [ConfigKey.AuthTokenLifetimeInMinutes]: number;

  // ACCOUNT - AUTH - DISCORD LOGIN FLOW
  [ConfigKey.DiscordLoginFlowEnabled]: ConfigGroupToggle;
  [ConfigKey.DiscordLoginFlowAutoLogin]: boolean;
  [ConfigKey.DiscordLoginFlowInGameMethod]: ConfigSelectOption;
  [ConfigKey.DiscordLoginFlowBotToken]: ConfigSecret;
  [ConfigKey.DiscordLoginFlowGuildId]: string;
  [ConfigKey.DiscordLoginFlowWhitelistRoleId]: ConfigSelectOption;
  [ConfigKey.DiscordLoginFlowOAuthClientId]: string;
  [ConfigKey.DiscordLoginFlowOAuthClientSecret]: ConfigSecret;

  // ACCOUNT - AUTH - USERNAME PASSWORD FLOW
  [ConfigKey.UsernamePasswordFlowEnabled]: ConfigGroupToggle;
  [ConfigKey.UsernamePasswordFlowRegistrationEnabled]: boolean;

  // ACCOUNT - AUTH - EXTERNAL LOGIN FLOW
  [ConfigKey.ExternalLoginFlowEnabled]: ConfigGroupToggle;
  [ConfigKey.ExternalLoginFlowApiAddress]: string;
  [ConfigKey.ExternalLoginFlowApiKey]: ConfigSecret;
  [ConfigKey.ExternalLoginFlowIdentifierType]: ConfigSelectOption;
  [ConfigKey.ExternalLoginFlowUseExternalInfo]: boolean;

  // CHARACTER
  [ConfigKey.MotivesSystemEnabled]: ConfigGroupToggle;

  // CHARACTER - GENERAL
  [ConfigKey.CharacterMinAge]: number;
  [ConfigKey.CharacterMaxAge]: number;
  [ConfigKey.CharacterFirstNameMinLength]: number;
  [ConfigKey.CharacterFirstNameMaxLength]: number;
  [ConfigKey.CharacterLastNameMinLength]: number;
  [ConfigKey.CharacterLastNameMaxLength]: number;
  [ConfigKey.CharacterFullNameValidationPattern]: ConfigRegex;
  [ConfigKey.CharacterNameForbiddenWords]: string;
  [ConfigKey.CharacterNationalityEnabled]: boolean;
  [ConfigKey.CharacterMaxPerAccount]: number;
  [ConfigKey.CharacterDefaultHunger]: number;
  [ConfigKey.CharacterDefaultThirst]: number;
  [ConfigKey.CharacterDefaultEnergy]: number;
  [ConfigKey.CharacterDefaultHealth]: number;
  [ConfigKey.CharacterDefaultMood]: number;

  // CHARACTER - MOTIVES THRESHOLDS
  [ConfigKey.CharacterMotivesCriticalThreshold]: number;
  [ConfigKey.CharacterMotivesHealthyHungerThreshold]: number;
  [ConfigKey.CharacterMotivesHealthyThirstThreshold]: number;
  [ConfigKey.CharacterMotivesHealthyEnergyThreshold]: number;
  [ConfigKey.CharacterMotivesHealthyHealthThreshold]: number;
  [ConfigKey.CharacterMotivesHealthyMoodThreshold]: number;
}

export type ConfigDefinitions = {
  [K in ConfigKey]: ConfigDefinitionsMap[K];
};
