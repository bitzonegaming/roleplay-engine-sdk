export enum MetricMainKey {
  // COMMON
  Id = 'ID',
  CreatedDate = 'CREATED_DATE',
  SessionCount = 'SESSION_COUNT',
  TotalSessionTimeSeconds = 'TOTAL_SESSION_TIME_SECONDS',
  AverageSessionTimeSeconds = 'AVERAGE_SESSION_TIME_SECONDS',
  HasSegment = 'HAS_SEGMENT',
  HadSegment = 'HAD_SEGMENT',
  IsActive = 'IS_ACTIVE',

  // ACCOUNT
  EmailVerificationRequested = 'EMAIL_VERIFICATION_REQUESTED',
  EmailVerified = 'EMAIL_VERIFIED',
  EmailVerifiedDate = 'EMAIL_VERIFIED_DATE',
  LastLoginDate = 'LAST_LOGIN_DATE',
  SignInMethodEnabled = 'SIGN_IN_METHOD_ENABLED',
  SessionEndReasonCount = 'SESSION_END_REASON_COUNT',
  SessionCrashRatio = 'SESSION_CRASH_RATIO',

  // CHARACTER
  LastOnlineDate = 'LAST_ONLINE_DATE',
  Age = 'AGE',
  Gender = 'GENDER',
  Nationality = 'NATIONALITY',
}
