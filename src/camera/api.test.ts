import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { CameraApi } from './api';
import { CreateCameraRequest } from './models/create-camera-request';
import { UpdateCameraRequest } from './models/update-camera-request';
import { Camera, CameraTargetType, CameraType } from './models/camera';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('CameraApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: CameraApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new CameraApi(client);
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

  describe('createCamera()', () => {
    it('should create a STATIC camera', async () => {
      const req: CreateCameraRequest = {
        id: 'cam-static',
        defaultName: 'StaticCam',
        type: CameraType.Static,
        description: 'A static camera',
        static: {
          blindfold: false,
          position: { x: 1, y: 2, z: 3 },
          rotation: { x: 0, y: 180, z: 0 },
          pointAt: { x: 4, y: 5, z: 6 },
          fov: 75,
          duration: 5,
          easeInOut: true,
        },
        follow: null,
        orbit: null,
        cinematic: null,
        soundId: 'sound1',
        freezePlayer: false,
        hideHud: true,
        enabled: true,
      };
      const mock: Camera = {
        id: 'cam-static',
        type: CameraType.Static,
        description: 'A static camera',
        static: {
          blindfold: false,
          position: { x: 1, y: 2, z: 3 },
          rotation: { x: 0, y: 180, z: 0 },
          pointAt: { x: 4, y: 5, z: 6 },
          fov: 75,
          duration: 5,
          easeInOut: true,
        },
        follow: null,
        orbit: null,
        cinematic: null,
        soundId: 'sound1',
        freezePlayer: false,
        hideHud: true,
        enabled: true,
        createdDate: 1610000000000,
        lastModifiedDate: 1610000001000,
      };

      baseScope
        .post('/cameras', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCamera(req);
      expect(result).toEqual(mock);
    });

    it('should create a FOLLOW camera', async () => {
      const req: CreateCameraRequest = {
        id: 'cam-follow',
        defaultName: 'FollowCam',
        type: CameraType.Follow,
        description: 'A follow camera',
        static: null,
        follow: {
          targetType: CameraTargetType.Character,
          offset: { x: 0, y: 2, z: -5 },
          rotation: { x: 0, y: 90, z: 0 },
          fov: 60,
        },
        orbit: null,
        cinematic: null,
        soundId: undefined,
        freezePlayer: true,
        hideHud: false,
        enabled: false,
      };
      const mock: Camera = {
        id: 'cam-follow',
        type: CameraType.Follow,
        description: 'A follow camera',
        static: null,
        follow: {
          targetType: CameraTargetType.Character,
          offset: { x: 0, y: 2, z: -5 },
          rotation: { x: 0, y: 90, z: 0 },
          fov: 60,
        },
        orbit: null,
        cinematic: null,
        soundId: null,
        freezePlayer: true,
        hideHud: false,
        enabled: false,
        createdDate: 1610000002000,
        lastModifiedDate: 1610000003000,
      };

      baseScope
        .post('/cameras', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCamera(req);
      expect(result).toEqual(mock);
    });

    it('should create an ORBIT camera', async () => {
      const req: CreateCameraRequest = {
        id: 'cam-orbit',
        defaultName: 'OrbitCam',
        type: CameraType.Orbit,
        description: 'An orbit camera',
        static: null,
        follow: null,
        orbit: {
          targetType: CameraTargetType.Vehicle,
          radius: 10,
          height: 3,
          speed: 1.5,
          fov: 80,
        },
        cinematic: null,
        soundId: 'sound2',
        freezePlayer: true,
        hideHud: true,
        enabled: true,
      };
      const mock: Camera = {
        id: 'cam-orbit',
        type: CameraType.Orbit,
        description: 'An orbit camera',
        static: null,
        follow: null,
        orbit: {
          targetType: CameraTargetType.Vehicle,
          radius: 10,
          height: 3,
          speed: 1.5,
          fov: 80,
        },
        cinematic: null,
        soundId: 'sound2',
        freezePlayer: true,
        hideHud: true,
        enabled: true,
        createdDate: 1610000004000,
        lastModifiedDate: 1610000005000,
      };

      baseScope
        .post('/cameras', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCamera(req);
      expect(result).toEqual(mock);
    });

    it('should create a CINEMATIC camera', async () => {
      const req: CreateCameraRequest = {
        id: 'cam-cine',
        defaultName: 'CineCam',
        type: CameraType.Cinematic,
        description: 'A cinematic camera',
        static: null,
        follow: null,
        orbit: null,
        cinematic: {
          path: [
            /* you can fill sample path items here if needed */
          ],
        },
        soundId: undefined,
        freezePlayer: false,
        hideHud: false,
        enabled: false,
      };
      const mock: Camera = {
        id: 'cam-cine',
        type: CameraType.Cinematic,
        description: 'A cinematic camera',
        static: null,
        follow: null,
        orbit: null,
        cinematic: {
          path: [],
        },
        soundId: null,
        freezePlayer: false,
        hideHud: false,
        enabled: false,
        createdDate: 1610000006000,
        lastModifiedDate: 1610000007000,
      };

      baseScope
        .post('/cameras', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCamera(req);
      expect(result).toEqual(mock);
    });
  });

  describe('updateCamera()', () => {
    it('should PUT /cameras/:id with correct body', async () => {
      const cameraId = 'cam1';
      const req: UpdateCameraRequest = {
        type: CameraType.Orbit,
        description: 'Updated orbit',
        static: null,
        follow: null,
        orbit: {
          targetType: CameraTargetType.Character,
          radius: 7,
          height: 2,
          speed: 2,
          fov: 70,
        },
        cinematic: null,
        soundId: 'soundX',
        freezePlayer: false,
        hideHud: true,
      };

      baseScope
        .put(`/cameras/${cameraId}`, (body) => {
          expect(body).toEqual({
            type: CameraType.Orbit,
            description: 'Updated orbit',
            static: null,
            follow: null,
            orbit: {
              targetType: CameraTargetType.Character,
              radius: 7,
              height: 2,
              speed: 2,
              fov: 70,
            },
            cinematic: null,
            soundId: 'soundX',
            freezePlayer: false,
            hideHud: true,
          });
          return true;
        })
        .reply(204);

      await api.updateCamera(cameraId, req);
    });
  });

  describe('getCameraById()', () => {
    const cameraId = 'cam1';
    const mock: Camera = {
      id: 'cam1',
      type: CameraType.Static,
      description: 'Lookup',
      static: {
        blindfold: true,
        position: { x: 9, y: 8, z: 7 },
        rotation: { x: 45, y: 0, z: 0 },
        pointAt: { x: 1, y: 1, z: 1 },
        fov: 50,
        duration: 3,
        easeInOut: false,
      },
      follow: null,
      orbit: null,
      cinematic: null,
      soundId: null,
      freezePlayer: true,
      hideHud: false,
      enabled: false,
      createdDate: 1610000008000,
      lastModifiedDate: 1610000009000,
    };

    it('should GET /cameras/:id without query and return Camera', async () => {
      baseScope.get(`/cameras/${cameraId}`).reply(200, mock);
      const result = await api.getCameraById(cameraId);
      expect(result).toEqual(mock);
    });

    it('should include noCache query when provided', async () => {
      baseScope.get(`/cameras/${cameraId}`).query({ noCache: 'true' }).reply(200, mock);

      const result = await api.getCameraById(cameraId, { noCache: true });
      expect(result).toEqual(mock);
    });
  });

  describe('getCameras()', () => {
    const list: Camera[] = [
      {
        id: 'cam1',
        type: CameraType.Static,
        description: '',
        static: {
          blindfold: false,
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          pointAt: { x: 0, y: 0, z: 0 },
          fov: 90,
          duration: 1,
          easeInOut: true,
        },
        follow: null,
        orbit: null,
        cinematic: null,
        soundId: null,
        freezePlayer: false,
        hideHud: false,
        enabled: true,
        createdDate: 1610000010000,
        lastModifiedDate: 1610000011000,
      },
      {
        id: 'cam2',
        type: CameraType.Follow,
        description: '',
        static: null,
        follow: {
          targetType: CameraTargetType.Vehicle,
          offset: { x: 1, y: 1, z: 1 },
          rotation: { x: 0, y: 45, z: 0 },
          fov: 65,
        },
        orbit: null,
        cinematic: null,
        soundId: 's2',
        freezePlayer: true,
        hideHud: true,
        enabled: false,
        createdDate: 1610000012000,
        lastModifiedDate: 1610000013000,
      },
    ];

    it('should GET /cameras with all query params', async () => {
      const query = { type: CameraType.Follow, enabled: false, noCache: true };

      baseScope
        .get('/cameras')
        .query({
          type: CameraType.Follow,
          enabled: 'false',
          noCache: 'true',
        })
        .reply(200, list);

      const result = await api.getCameras(query);
      expect(result).toEqual(list);
    });

    it('should include only provided query params', async () => {
      baseScope.get('/cameras').query({ noCache: 'false' }).reply(200, list);

      const result = await api.getCameras({ noCache: false });
      expect(result).toEqual(list);
    });
  });

  describe('enableCamera()/disableCamera()', () => {
    it('should enable a camera', async () => {
      const cameraId = 'cam1';
      baseScope.put(`/cameras/${cameraId}/enabled`).reply(204);
      await api.enableCamera(cameraId);
    });

    it('should disable a camera', async () => {
      const cameraId = 'cam1';
      baseScope.put(`/cameras/${cameraId}/disabled`).reply(204);
      await api.disableCamera(cameraId);
    });
  });
});
