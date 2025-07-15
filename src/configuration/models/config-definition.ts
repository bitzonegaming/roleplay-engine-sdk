import { ConfigKey } from './config-keys';
import { ConfigGroupToggle, ConfigRegex, ConfigSecret, ConfigSelectOption } from './config-types';

export interface ConfigDefinitionsMap {
  // GENERAL
  Name: string;
  Platform: ConfigSelectOption;
  ScpAddress: string;
  PlayerSlot: number;
  DefaultLanguage: ConfigSelectOption;

  // NOTIFICATION - SMTP
  SmtpEnabled: ConfigGroupToggle;
  SmtpServerHost: string;
  SmtpServerPort: number;
  SmtpServerUseSsl: boolean;
  SmtpVerificationEmailEnabled: ConfigGroupToggle;
  SmtpVerificationEmailAccountUsername: string;
  SmtpVerificationEmailAccountPassword: ConfigSecret;
  SmtpVerificationEmailAccountFromMail: string;
  SmtpVerificationEmailAccountFromName: string;

  // ACCOUNT - AUTH
  AccountEmailRequired: boolean;
  AccountUsernameRegex: ConfigRegex;
  AccountPasswordRegex: ConfigRegex;
  AccountEmailVerificationRequired: boolean;
  AuthTokenLifetimeInMinutes: number;

  // ACCOUNT - AUTH - DISCORD LOGIN FLOW
  DiscordLoginFlowEnabled: ConfigGroupToggle;
  DiscordLoginFlowAutoLogin: boolean;
  DiscordLoginFlowInGameMethod: ConfigSelectOption;
  DiscordLoginFlowBotToken: ConfigSecret;
  DiscordLoginFlowGuildId: string;
  DiscordLoginFlowWhitelistRoleId: ConfigSelectOption;
  DiscordLoginFlowOAuthClientId: string;
  DiscordLoginFlowOAuthClientSecret: ConfigSecret;

  // ACCOUNT - AUTH - USERNAME PASSWORD FLOW
  UsernamePasswordFlowEnabled: ConfigGroupToggle;
  UsernamePasswordFlowRegistrationEnabled: boolean;

  // ACCOUNT - AUTH - EXTERNAL LOGIN FLOW
  ExternalLoginFlowEnabled: ConfigGroupToggle;
  ExternalLoginFlowApiAddress: string;
  ExternalLoginFlowApiKey: ConfigSecret;
  ExternalLoginFlowIdentifierType: ConfigSelectOption;
  ExternalLoginFlowUseExternalInfo: boolean;

  // CHARACTER
  MotivesSystemEnabled: ConfigGroupToggle;

  // CHARACTER - GENERAL
  CharacterMinAge: number;
  CharacterMaxAge: number;
  CharacterFirstNameMinLength: number;
  CharacterFirstNameMaxLength: number;
  CharacterLastNameMinLength: number;
  CharacterLastNameMaxLength: number;
  CharacterFullNameValidationPattern: ConfigRegex;
  CharacterNameForbiddenWords: string;
  CharacterNationalityEnabled: boolean;
  CharacterMaxPerAccount: number;
  CharacterDefaultHunger: number;
  CharacterDefaultThirst: number;
  CharacterDefaultEnergy: number;
  CharacterDefaultHealth: number;
  CharacterDefaultMood: number;

  // CHARACTER - MOTIVES THRESHOLDS
  CharacterMotivesCriticalThreshold: number;
  CharacterMotivesHealthyHungerThreshold: number;
  CharacterMotivesHealthyThirstThreshold: number;
  CharacterMotivesHealthyEnergyThreshold: number;
  CharacterMotivesHealthyHealthThreshold: number;
  CharacterMotivesHealthyMoodThreshold: number;
}

export type ConfigDefinitions = {
  [K in keyof typeof ConfigKey]: ConfigDefinitionsMap[K];
};
