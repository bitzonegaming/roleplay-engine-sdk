import nock from 'nock';
import { ApiOptions, EngineClient } from '../core/engine-client';
import { UserInfoApi } from './api';
import { UserInfo } from './models/user-info';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('UserInfoApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: UserInfoApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new UserInfoApi(client);
  });

  beforeEach(() => {
    baseScope = withCommonHeaders(nock(apiUrl), {
      serverId,
      applicationName,
      locale,
      authorizationToken,
    });
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
    nock.cleanAll();
  });

  describe('getUserInfo()', () => {
    it('should GET /user-info and return UserInfo', async () => {
      const mockUser: UserInfo = {
        id: 'user123',
        username: 'playerOne',
        email: 'player@example.com',
        accountPolicies: ['read:account', 'write:character'],
      };

      baseScope.get('/user-info').reply(200, mockUser);

      const result = await api.getUserInfo();
      expect(result).toEqual(mockUser);
    });

    it('should include correlationId when provided in options', async () => {
      const mockUser: UserInfo = {
        id: 'user456',
        username: 'playerTwo',
        email: 'two@example.com',
        accountPolicies: ['read:character'],
      };
      const opts: ApiOptions = { correlationId: 'corr-789' };

      baseScope.get('/user-info').matchHeader('x-correlationid', 'corr-789').reply(200, mockUser);

      const result = await api.getUserInfo(opts);
      expect(result).toEqual(mockUser);
    });
  });
});
