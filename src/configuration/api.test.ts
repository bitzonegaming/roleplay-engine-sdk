import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { ConfigurationApi } from './api';
import { Config } from './models/config';
import { ConfigGroup } from './models/config-group';
import { UpdateConfigurationRequest } from './models/update-configuration-request';
import { ConfigType } from './models/config-types';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { ConfigGroupKey, ConfigKey } from './models/config-keys';

describe('ConfigurationApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('keyId', 'keySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: ConfigurationApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new ConfigurationApi(client);
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

  describe('getConfiguration()', () => {
    const mockConfigs: Config[] = [
      {
        key: ConfigKey.Name,
        value: 'Roleplay Server',
        type: ConfigType.String,
        name: 'Server Name',
        editable: true,
      } as Config,
    ];

    it('should GET /configuration with all query params', async () => {
      baseScope
        .get('/configuration')
        .query({ localized: 'true', withOptions: 'true', onlyPublic: 'true' })
        .reply(200, mockConfigs);

      const result = await api.getConfiguration({
        localized: true,
        withOptions: true,
        onlyPublic: true,
      });

      expect(result).toEqual(mockConfigs);
    });

    it('should include only non-null query params', async () => {
      baseScope.get('/configuration').query({ localized: 'true' }).reply(200, mockConfigs);

      const result = await api.getConfiguration({ localized: true });

      expect(result).toEqual(mockConfigs);
    });
  });

  describe('getGroupedConfiguration()', () => {
    const mockGroups: ConfigGroup[] = [
      {
        groupKey: ConfigGroupKey.General,
        configs: [
          {
            key: ConfigKey.Name,
            value: 'Roleplay Server',
            type: ConfigType.String,
            name: 'Server Name',
            editable: true,
          },
        ],
        groups: [],
      } as ConfigGroup,
    ];

    it('should GET /configuration/grouped with all query params', async () => {
      baseScope
        .get('/configuration/grouped')
        .query({ localized: 'false', withOptions: 'false', onlyPublic: 'true' })
        .reply(200, mockGroups);

      const result = await api.getGroupedConfiguration({
        localized: false,
        withOptions: false,
        onlyPublic: true,
      });

      expect(result).toEqual(mockGroups);
    });

    it('should include only non-null query params', async () => {
      baseScope.get('/configuration/grouped').query({ onlyPublic: 'true' }).reply(200, mockGroups);

      const result = await api.getGroupedConfiguration({ onlyPublic: true });
      expect(result).toEqual(mockGroups);
    });
  });

  describe('updateConfiguration()', () => {
    it('should PATCH /configuration with correct body', async () => {
      const req: UpdateConfigurationRequest = {
        [ConfigKey.Name]: { type: ConfigType.String, value: 'UpdatedApp' },
        [ConfigKey.PlayerSlot]: { type: ConfigType.Int32, value: 8 },
      };

      baseScope
        .patch('/configuration', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.updateConfiguration(req);
    });
  });
});
