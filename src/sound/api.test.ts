import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { SoundApi } from './api';
import { CreateSoundRequest } from './models/create-sound-request';
import { UpdateSoundRequest } from './models/update-sound-request';
import { Sound, SoundType } from './models/sound';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('SoundApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: SoundApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new SoundApi(client);
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

  describe('createSound()', () => {
    it('should POST /sounds with correct body and return Sound', async () => {
      const req: CreateSoundRequest = {
        id: 's1',
        type: SoundType.External,
        defaultName: 'SoundOne',
        description: 'Test sound',
        attributes: { testKey: 'key' },
        externalUrl: 'https://cdn.example.com/s1.mp3',
        enabled: true,
      };
      const mock: Sound = {
        id: 's1',
        name: 'SoundOne',
        type: SoundType.External,
        description: 'Test sound',
        attributes: { testKey: 'key' },
        externalUrl: 'https://cdn.example.com/s1.mp3',
        enabled: true,
        createdDate: 1610000100000,
        lastModifiedDate: 1610000101000,
      };

      baseScope
        .post('/sounds', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createSound(req);
      expect(result).toEqual(mock);
    });
  });

  describe('updateSound()', () => {
    it('should PUT /sounds/:id with correct body', async () => {
      const soundId = 's1';
      const req: UpdateSoundRequest = {
        type: SoundType.Native,
        description: 'Updated desc',
        attributes: { testKey: 'key' },
        externalUrl: undefined,
      };

      baseScope
        .put(`/sounds/${soundId}`, (body) => {
          expect(body).toEqual({
            type: SoundType.Native,
            description: 'Updated desc',
            attributes: { testKey: 'key' },
            externalUrl: undefined,
          });
          return true;
        })
        .reply(204);

      await api.updateSound(soundId, req);
    });
  });

  describe('getSoundById()', () => {
    const soundId = 's1';
    const mock: Sound = {
      id: 's1',
      name: 'SoundOne',
      type: SoundType.External,
      description: 'Test sound',
      attributes: { testKey: 'key' },
      externalUrl: 'https://cdn.example.com/s1.mp3',
      enabled: false,
      createdDate: 1610000100000,
      lastModifiedDate: 1610000101000,
    };

    it('should GET /sounds/:id without query and return Sound', async () => {
      baseScope.get(`/sounds/${soundId}`).reply(200, mock);

      const result = await api.getSoundById(soundId);
      expect(result).toEqual(mock);
    });

    it('should include noCache query when provided', async () => {
      baseScope.get(`/sounds/${soundId}`).query({ noCache: 'true' }).reply(200, mock);

      const result = await api.getSoundById(soundId, { noCache: true });
      expect(result).toEqual(mock);
    });
  });

  describe('getSounds()', () => {
    const list: Sound[] = [
      {
        id: 's1',
        name: 'SoundOne',
        type: SoundType.External,
        description: 'Desc1',
        attributes: { a: '1' },
        externalUrl: 'url1',
        enabled: true,
        createdDate: 1,
        lastModifiedDate: 2,
      },
      {
        id: 's2',
        name: 'SoundTwo',
        type: SoundType.Native,
        description: 'Desc2',
        attributes: { b: '2' },
        externalUrl: undefined,
        enabled: false,
        createdDate: 3,
        lastModifiedDate: 4,
      },
    ];

    it('should GET /sounds with all query params', async () => {
      const query = { type: SoundType.Native, enabled: false, noCache: true };

      baseScope
        .get('/sounds')
        .query({
          type: SoundType.Native,
          enabled: 'false',
          noCache: 'true',
        })
        .reply(200, list);

      const result = await api.getSounds(query);
      expect(result).toEqual(list);
    });

    it('should include only provided query params', async () => {
      baseScope.get('/sounds').query({ enabled: 'true', noCache: 'false' }).reply(200, list);

      const result = await api.getSounds({ enabled: true, noCache: false });
      expect(result).toEqual(list);
    });
  });

  describe('enableSound()/disableSound()', () => {
    it('should enable a sound', async () => {
      const soundId = 's1';
      baseScope.put(`/sounds/${soundId}/enabled`).reply(204);
      await api.enableSound(soundId);
    });

    it('should disable a sound', async () => {
      const soundId = 's1';
      baseScope.put(`/sounds/${soundId}/disabled`).reply(204);
      await api.disableSound(soundId);
    });
  });
});
