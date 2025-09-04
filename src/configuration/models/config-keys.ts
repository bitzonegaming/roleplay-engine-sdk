export enum ConfigKey {
  // GENERAL
  Name = 'NAME',
  Platform = 'PLATFORM',
  ScpAddress = 'SCP_ADDRESS',
  PlayerSlot = 'PLAYER_SLOT',
  DefaultLanguage = 'DEFAULT_LANGUAGE',

  // NOTIFICATION
  // NOTIFICATION - SMTP
  SmtpEnabled = 'SMTP_ENABLED',
  SmtpServerHost = 'SMTP_SERVER_HOST',
  SmtpServerPort = 'SMTP_SERVER_PORT',
  SmtpServerUseSsl = 'SMTP_SERVER_USE_SSL',
  SmtpVerificationEmailEnabled = 'SMTP_VERIFICATION_EMAIL_ENABLED',
  SmtpVerificationEmailAccountUsername = 'SMTP_VERIFICATION_EMAIL_ACCOUNT_USERNAME',
  SmtpVerificationEmailAccountPassword = 'SMTP_VERIFICATION_EMAIL_ACCOUNT_PASSWORD',
  SmtpVerificationEmailAccountFromMail = 'SMTP_VERIFICATION_EMAIL_ACCOUNT_FROM_MAIL',
  SmtpVerificationEmailAccountFromName = 'SMTP_VERIFICATION_EMAIL_ACCOUNT_FROM_NAME',

  // WORLD - CAMERA
  LoginScreenCamera = 'LOGIN_SCREEN_CAMERA',

  // ACCOUNT
  // ACCOUNT - AUTH
  AccountEmailRequired = 'ACCOUNT_EMAIL_REQUIRED',
  AccountUsernameRegex = 'ACCOUNT_USERNAME_REGEX',
  AccountPasswordRegex = 'ACCOUNT_PASSWORD_REGEX',
  AccountEmailVerificationRequired = 'ACCOUNT_EMAIL_VERIFICATION_REQUIRED',
  AuthTokenLifetimeInMinutes = 'AUTH_TOKEN_LIFETIME_IN_MINUTES',

  // ACCOUNT - AUTH - DISCORD LOGIN FLOW
  DiscordLoginFlowEnabled = 'DISCORD_LOGIN_FLOW_ENABLED',
  DiscordLoginFlowAutoLogin = 'DISCORD_LOGIN_FLOW_AUTO_LOGIN',
  DiscordLoginFlowInGameMethod = 'DISCORD_LOGIN_FLOW_IN_GAME_METHOD',
  DiscordLoginFlowBotToken = 'DISCORD_LOGIN_FLOW_BOT_TOKEN',
  DiscordLoginFlowGuildId = 'DISCORD_LOGIN_FLOW_GUILD_ID',
  DiscordLoginFlowWhitelistRoleId = 'DISCORD_LOGIN_FLOW_WHITELIST_ROLE_ID',
  DiscordLoginFlowOAuthClientId = 'DISCORD_LOGIN_FLOW_OAUTH_CLIENT_ID',
  DiscordLoginFlowOAuthClientSecret = 'DISCORD_LOGIN_FLOW_OAUTH_CLIENT_SECRET',

  // ACCOUNT - AUTH - USERNAME PASSWORD FLOW
  UsernamePasswordFlowEnabled = 'USERNAME_PASSWORD_FLOW_ENABLED',
  UsernamePasswordFlowRegistrationEnabled = 'USERNAME_PASSWORD_FLOW_REGISTRATION_ENABLED',

  // ACCOUNT - AUTH - EXTERNAL LOGIN FLOW
  ExternalLoginFlowEnabled = 'EXTERNAL_LOGIN_FLOW_ENABLED',
  ExternalLoginFlowApiAddress = 'EXTERNAL_LOGIN_FLOW_API_ADDRESS',
  ExternalLoginFlowApiKey = 'EXTERNAL_LOGIN_FLOW_API_KEY',
  ExternalLoginFlowIdentifierType = 'EXTERNAL_LOGIN_FLOW_IDENTIFIER_TYPE',
  ExternalLoginFlowUseExternalInfo = 'EXTERNAL_LOGIN_FLOW_USE_EXTERNAL_INFO',

  // CHARACTER
  MotivesSystemEnabled = 'MOTIVES_SYSTEM_ENABLED',

  // CHARACTER - GENERAL
  CharacterMinAge = 'CHARACTER_MIN_AGE',
  CharacterMaxAge = 'CHARACTER_MAX_AGE',
  CharacterFirstNameMinLength = 'CHARACTER_FIRST_NAME_MIN_LENGTH',
  CharacterFirstNameMaxLength = 'CHARACTER_FIRST_NAME_MAX_LENGTH',
  CharacterLastNameMinLength = 'CHARACTER_LAST_NAME_MIN_LENGTH',
  CharacterLastNameMaxLength = 'CHARACTER_LAST_NAME_MAX_LENGTH',
  CharacterFullNameValidationPattern = 'CHARACTER_FULL_NAME_VALIDATION_PATTERN',
  CharacterNameForbiddenWords = 'CHARACTER_NAME_FORBIDDEN_WORDS',
  CharacterNationalityEnabled = 'CHARACTER_NATIONALITY_ENABLED',
  CharacterMaxPerAccount = 'CHARACTER_MAX_PER_ACCOUNT',

  // CHARACTER - MOTIVES THRESHOLDS
  CharacterDefaultHunger = 'CHARACTER_DEFAULT_HUNGER',
  CharacterDefaultThirst = 'CHARACTER_DEFAULT_THIRST',
  CharacterDefaultEnergy = 'CHARACTER_DEFAULT_ENERGY',
  CharacterDefaultHealth = 'CHARACTER_DEFAULT_HEALTH',
  CharacterDefaultMood = 'CHARACTER_DEFAULT_MOOD',
  CharacterMotivesCriticalThreshold = 'CHARACTER_MOTIVES_CRITICAL_THRESHOLD',
  CharacterMotivesHealthyHungerThreshold = 'CHARACTER_MOTIVES_HEALTHY_HUNGER_THRESHOLD',
  CharacterMotivesHealthyThirstThreshold = 'CHARACTER_MOTIVES_HEALTHY_THIRST_THRESHOLD',
  CharacterMotivesHealthyEnergyThreshold = 'CHARACTER_MOTIVES_HEALTHY_ENERGY_THRESHOLD',
  CharacterMotivesHealthyHealthThreshold = 'CHARACTER_MOTIVES_HEALTHY_HEALTH_THRESHOLD',
  CharacterMotivesHealthyMoodThreshold = 'CHARACTER_MOTIVES_HEALTHY_MOOD_THRESHOLD',
}

export enum ConfigGroupKey {
  General = 'GENERAL',

  // NOTIFICATION
  Notification = 'NOTIFICATION',
  Smtp = 'SMTP',
  SmtpVerificationEmail = 'SMTP_VERIFICATION_EMAIL',

  // ACCOUNT
  Account = 'ACCOUNT',

  // ACCOUNT - AUTH
  Auth = 'AUTH',
  DiscordLoginFlow = 'DISCORD_LOGIN_FLOW',
  UsernamePasswordFlow = 'USERNAME_PASSWORD_FLOW',
  ExternalLoginFlow = 'EXTERNAL_LOGIN_FLOW',

  // CHARACTER
  Character = 'CHARACTER',
  MotivesSystem = 'MOTIVES_SYSTEM',

  // WORLD
  LoginScreen = 'LOGIN_SCREEN',
}

export type ConfigKeyToGroupMap = {
  [K in keyof typeof ConfigKey]: ConfigGroupKey;
};

export const configKeyToGroup: ConfigKeyToGroupMap = {
  // GENERAL
  Name: ConfigGroupKey.General,
  Platform: ConfigGroupKey.General,
  ScpAddress: ConfigGroupKey.General,
  PlayerSlot: ConfigGroupKey.General,
  DefaultLanguage: ConfigGroupKey.General,

  // NOTIFICATION
  SmtpEnabled: ConfigGroupKey.Smtp,
  SmtpServerHost: ConfigGroupKey.Smtp,
  SmtpServerPort: ConfigGroupKey.Smtp,
  SmtpServerUseSsl: ConfigGroupKey.Smtp,
  SmtpVerificationEmailEnabled: ConfigGroupKey.SmtpVerificationEmail,
  SmtpVerificationEmailAccountUsername: ConfigGroupKey.SmtpVerificationEmail,
  SmtpVerificationEmailAccountPassword: ConfigGroupKey.SmtpVerificationEmail,
  SmtpVerificationEmailAccountFromMail: ConfigGroupKey.SmtpVerificationEmail,
  SmtpVerificationEmailAccountFromName: ConfigGroupKey.SmtpVerificationEmail,

  // WORLD - CAMERA - LOGIN SCREEN
  LoginScreenCamera: ConfigGroupKey.LoginScreen,

  // ACCOUNT - AUTH
  AccountEmailRequired: ConfigGroupKey.Auth,
  AccountUsernameRegex: ConfigGroupKey.Auth,
  AccountPasswordRegex: ConfigGroupKey.Auth,
  AccountEmailVerificationRequired: ConfigGroupKey.Auth,
  AuthTokenLifetimeInMinutes: ConfigGroupKey.Auth,

  DiscordLoginFlowEnabled: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowAutoLogin: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowInGameMethod: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowBotToken: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowGuildId: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowWhitelistRoleId: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowOAuthClientId: ConfigGroupKey.DiscordLoginFlow,
  DiscordLoginFlowOAuthClientSecret: ConfigGroupKey.DiscordLoginFlow,

  UsernamePasswordFlowEnabled: ConfigGroupKey.UsernamePasswordFlow,
  UsernamePasswordFlowRegistrationEnabled: ConfigGroupKey.UsernamePasswordFlow,

  ExternalLoginFlowEnabled: ConfigGroupKey.ExternalLoginFlow,
  ExternalLoginFlowApiAddress: ConfigGroupKey.ExternalLoginFlow,
  ExternalLoginFlowApiKey: ConfigGroupKey.ExternalLoginFlow,
  ExternalLoginFlowIdentifierType: ConfigGroupKey.ExternalLoginFlow,
  ExternalLoginFlowUseExternalInfo: ConfigGroupKey.ExternalLoginFlow,

  // CHARACTER
  CharacterMinAge: ConfigGroupKey.Character,
  CharacterMaxAge: ConfigGroupKey.Character,
  CharacterFirstNameMinLength: ConfigGroupKey.Character,
  CharacterFirstNameMaxLength: ConfigGroupKey.Character,
  CharacterLastNameMinLength: ConfigGroupKey.Character,
  CharacterLastNameMaxLength: ConfigGroupKey.Character,
  CharacterFullNameValidationPattern: ConfigGroupKey.Character,
  CharacterNameForbiddenWords: ConfigGroupKey.Character,
  CharacterNationalityEnabled: ConfigGroupKey.Character,
  CharacterMaxPerAccount: ConfigGroupKey.Character,

  // CHARACTER - MOTIVES THRESHOLDS
  MotivesSystemEnabled: ConfigGroupKey.MotivesSystem,
  CharacterDefaultHunger: ConfigGroupKey.MotivesSystem,
  CharacterDefaultThirst: ConfigGroupKey.MotivesSystem,
  CharacterDefaultEnergy: ConfigGroupKey.MotivesSystem,
  CharacterDefaultHealth: ConfigGroupKey.MotivesSystem,
  CharacterDefaultMood: ConfigGroupKey.MotivesSystem,
  CharacterMotivesCriticalThreshold: ConfigGroupKey.MotivesSystem,
  CharacterMotivesHealthyHungerThreshold: ConfigGroupKey.MotivesSystem,
  CharacterMotivesHealthyThirstThreshold: ConfigGroupKey.MotivesSystem,
  CharacterMotivesHealthyEnergyThreshold: ConfigGroupKey.MotivesSystem,
  CharacterMotivesHealthyHealthThreshold: ConfigGroupKey.MotivesSystem,
  CharacterMotivesHealthyMoodThreshold: ConfigGroupKey.MotivesSystem,
};

export type ConfigGroupParentMap = {
  [G in ConfigGroupKey]: ConfigGroupKey | null;
};

export const configGroupParents: Record<ConfigGroupKey, ConfigGroupKey | null> = {
  // TOP LEVEL
  [ConfigGroupKey.General]: null,
  [ConfigGroupKey.Notification]: null,
  [ConfigGroupKey.Account]: null,
  [ConfigGroupKey.Character]: null,

  // NOTIFICATION
  [ConfigGroupKey.Smtp]: ConfigGroupKey.Notification,
  [ConfigGroupKey.SmtpVerificationEmail]: ConfigGroupKey.Notification,

  // WORLD
  [ConfigGroupKey.LoginScreen]: null,

  // ACCOUNT
  [ConfigGroupKey.Auth]: ConfigGroupKey.Account,

  // ACCOUNT - AUTH
  [ConfigGroupKey.DiscordLoginFlow]: ConfigGroupKey.Auth,
  [ConfigGroupKey.UsernamePasswordFlow]: ConfigGroupKey.Auth,
  [ConfigGroupKey.ExternalLoginFlow]: ConfigGroupKey.Auth,

  // CHARACTER
  [ConfigGroupKey.MotivesSystem]: ConfigGroupKey.Character,
} as const;
