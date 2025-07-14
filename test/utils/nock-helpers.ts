import nock from 'nock';

export function withCommonHeaders(
  scope: nock.Scope,
  {
    serverId,
    applicationName,
    locale,
    authorizationToken,
  }: {
    serverId: string;
    applicationName: string;
    locale: string;
    authorizationToken: string;
  },
) {
  return scope
    .matchHeader('x-server-id', serverId)
    .matchHeader('x-agent-name', applicationName)
    .matchHeader('Authorization', authorizationToken)
    .matchHeader('Accept-Language', locale);
}