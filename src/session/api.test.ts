import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { SessionApi } from './api';
import { StartSessionRequest } from './models/start-session-request';
import { SessionWithToken } from './models/session-with-token';
import { AuthorizeSessionRequest } from './models/authorize-session-request';
import { SessionInfo } from './models/session-info';
import { LinkCharacterToSessionRequest } from './models/link-character-to-session-request';
import { Session } from './models/session';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';
import { v4 as uuidV4 } from 'uuid';

describe('SessionApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: SessionApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new SessionApi(client);
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

  describe('startSession()', () => {
    it('should POST /sessions with correct body and return SessionWithToken', async () => {
      const req: StartSessionRequest = { ipAddress: '192.168.0.1' };
      const sessionId = uuidV4();
      const mockResp: SessionWithToken = {
        id: sessionId,
        token: 'sessionToken123',
      };

      baseScope
        .post(`/sessions/${sessionId}`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mockResp);

      const result = await api.startSession(sessionId, req);
      expect(result).toEqual(mockResp);
    });
  });

  describe('authorizeSession()', () => {
    it('should PUT /sessions/:id/auth with correct body and return SessionInfo', async () => {
      const sessionId = 'sess123';
      const req: AuthorizeSessionRequest = { accessToken: 'accTok' };
      const mockInfo: SessionInfo = {
        id: sessionId,
        ipAddress: '10.0.0.1',
        tokenHash: 'tokenHash',
        account: {
          id: 'acc1',
          segmentDefinitionIds: [],
          authorizedDate: 176781234567,
          username: 'user1',
        },
      };

      baseScope
        .put(`/sessions/${sessionId}/auth`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockInfo);

      const result = await api.authorizeSession(sessionId, req);
      expect(result).toEqual(mockInfo);
    });
  });

  describe('linkCharacterToSession()', () => {
    it('should PUT /sessions/:id/character with correct body and return SessionInfo', async () => {
      const sessionId = 'sess123';
      const req: LinkCharacterToSessionRequest = { characterId: 'char123' };
      const mockInfo: SessionInfo = {
        id: sessionId,
        ipAddress: '10.0.0.1',
        tokenHash: 'tokenHash',
        character: {
          id: 'char123',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          linkedDate: 76781234567,
          segmentDefinitionIds: [],
        },
      };

      baseScope
        .put(`/sessions/${sessionId}/character`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockInfo);

      const result = await api.linkCharacterToSession(sessionId, req);
      expect(result).toEqual(mockInfo);
    });
  });

  describe('finishSession()', () => {
    it('should DELETE /sessions/:id and complete without error', async () => {
      const sessionId = 'sess123';
      baseScope.delete(`/sessions/${sessionId}`).reply(204);

      await api.finishSession(sessionId);
    });
  });

  describe('getSessionById()', () => {
    it('should GET /sessions/:id and return Session', async () => {
      const sessionId = 'sess123';
      const mockSession: Session = {
        id: sessionId,
        ipAddress: '10.0.0.1',
        isActive: true,
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        endDate: 176781235000,
      };

      baseScope.get(`/sessions/${sessionId}`).reply(200, mockSession);

      const result = await api.getSessionById(sessionId);
      expect(result).toEqual(mockSession);
    });
  });

  describe('getActiveSessionInfo()', () => {
    it('should GET /sessions/:id/info and return SessionInfo', async () => {
      const sessionId = 'sess123';
      const mockInfo: SessionInfo = {
        id: sessionId,
        ipAddress: '10.0.0.1',
        tokenHash: 'tokenHash',
      };

      baseScope.get(`/sessions/${sessionId}/info`).reply(200, mockInfo);

      const result = await api.getActiveSessionInfo(sessionId);
      expect(result).toEqual(mockInfo);
    });
  });
});
