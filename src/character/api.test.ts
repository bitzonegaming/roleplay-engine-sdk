import nock from 'nock';
import { EngineClient } from '../core/engine-client';
import { CharacterApi } from './api';
import { CharacterNationality } from './models/character-nationality';
import { CreateCharacterNationalityRequest } from './models/create-character-nationality-request';
import { UpdateCharacterNationalityOrderRequest } from './models/update-character-nationality-order-request';
import { CharacterGender } from './models/character-gender';
import { CreateCharacterGenderRequest } from './models/create-character-gender-request';
import { UpdateCharacterGenderOrderRequest } from './models/update-character-gender-order-request';
import { UpdateCharacterBasicInfoRequest } from './models/update-character-basic-info-request';
import { Character } from './models/character';
import { ApiKeyAuthorization } from '../auth/api-key-authorization';
import { withCommonHeaders } from '../../test/utils/nock-helpers';

describe('CharacterApi', () => {
  const apiUrl = 'http://mock-api';
  const serverId = 'serverId';
  const applicationName = 'app';
  const locale = 'en-US';
  const auth = new ApiKeyAuthorization('apiKeyId', 'apiKeySecret');
  const authorizationToken = auth.getAuthorizationToken();

  let client: EngineClient;
  let api: CharacterApi;
  let baseScope: nock.Scope;

  beforeAll(() => {
    client = new EngineClient({ apiUrl, applicationName, serverId, locale }, auth);
    api = new CharacterApi(client);
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

  describe('createCharacterNationality()', () => {
    it('should POST /characters/nationalities and return CharacterNationality', async () => {
      const req: CreateCharacterNationalityRequest = {
        id: 'BRITISH',
        enabled: true,
        defaultName: 'British',
      };
      const mock: CharacterNationality = {
        id: 'BRITISH',
        name: 'British',
        enabled: true,
        order: 3,
      };

      baseScope
        .post('/characters/nationalities', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCharacterNationality(req);
      expect(result).toEqual(mock);
    });
  });

  describe('getCharacterNationalities()', () => {
    const mockList: CharacterNationality[] = [
      { id: 'nat1', name: 'Atlantis', enabled: true, order: 1 },
    ];

    it('should GET /characters/nationalities without query', async () => {
      baseScope.get('/characters/nationalities').reply(200, mockList);

      const result = await api.getCharacterNationalities();
      expect(result).toEqual(mockList);
    });

    it('should include all query params', async () => {
      baseScope
        .get('/characters/nationalities')
        .query({ noCache: 'true', enabled: 'false' })
        .reply(200, mockList);

      const result = await api.getCharacterNationalities({ noCache: true, enabled: false });
      expect(result).toEqual(mockList);
    });

    it('should include only non-null query params', async () => {
      baseScope.get('/characters/nationalities').query({ enabled: 'true' }).reply(200, mockList);

      const result = await api.getCharacterNationalities({ enabled: true });
      expect(result).toEqual(mockList);
    });
  });

  describe('getCharacterNationalityById()', () => {
    const id = 'nat1';
    const mock: CharacterNationality = { id, name: 'Atlantis', enabled: true, order: 1 };

    it('should GET /characters/nationalities/:id without query', async () => {
      baseScope.get(`/characters/nationalities/${id}`).reply(200, mock);

      const result = await api.getCharacterNationalityById(id);
      expect(result).toEqual(mock);
    });

    it('should include noCache query when provided', async () => {
      baseScope.get(`/characters/nationalities/${id}`).query({ noCache: 'true' }).reply(200, mock);

      const result = await api.getCharacterNationalityById(id, { noCache: true });
      expect(result).toEqual(mock);
    });
  });

  describe('enableCharacterNationality()', () => {
    it('should PUT /characters/nationalities/:id/enabled', async () => {
      const id = 'nat1';
      baseScope.put(`/characters/nationalities/${id}/enabled`).reply(204);

      await api.enableCharacterNationality(id);
    });
  });

  describe('disableCharacterNationality()', () => {
    it('should PUT /characters/nationalities/:id/disabled', async () => {
      const id = 'nat1';
      baseScope.put(`/characters/nationalities/${id}/disabled`).reply(204);

      await api.disableCharacterNationality(id);
    });
  });

  describe('updateCharacterNationalityOrder()', () => {
    it('should PUT /characters/nationalities/:id/order with correct body', async () => {
      const id = 'nat1';
      const req: UpdateCharacterNationalityOrderRequest = { order: 5 };

      baseScope
        .put(`/characters/nationalities/${id}/order`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.updateCharacterNationalityOrder(id, req);
    });
  });

  describe('createCharacterGender()', () => {
    it('should POST /characters/genders and return CharacterGender', async () => {
      const req: CreateCharacterGenderRequest = {
        id: 'FEMALE',
        defaultName: 'Female',
        enabled: true,
      };
      const mock: CharacterGender = {
        id: 'FEMALE',
        name: 'Female',
        enabled: true,
        order: 2,
      };

      baseScope
        .post('/characters/genders', (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(201, mock);

      const result = await api.createCharacterGender(req);
      expect(result).toEqual(mock);
    });
  });

  describe('getCharacterGenders()', () => {
    const mockList: CharacterGender[] = [{ id: 'FEMALE', name: 'Female', enabled: true, order: 2 }];

    it('should GET /characters/genders without query', async () => {
      baseScope.get('/characters/genders').reply(200, mockList);

      const result = await api.getCharacterGenders();
      expect(result).toEqual(mockList);
    });

    it('should include all query params', async () => {
      baseScope
        .get('/characters/genders')
        .query({ noCache: 'true', enabled: 'false' })
        .reply(200, mockList);

      const result = await api.getCharacterGenders({ noCache: true, enabled: false });
      expect(result).toEqual(mockList);
    });

    it('should include only non-null query params', async () => {
      baseScope.get('/characters/genders').query({ enabled: 'true' }).reply(200, mockList);

      const result = await api.getCharacterGenders({ enabled: true });
      expect(result).toEqual(mockList);
    });
  });

  describe('getCharacterGenderById()', () => {
    const id = 'gen1';
    const mock: CharacterGender = { id: 'FEMALE', name: 'Female', enabled: true, order: 2 };

    it('should GET /characters/genders/:id without query', async () => {
      baseScope.get(`/characters/genders/${id}`).reply(200, mock);

      const result = await api.getCharacterGenderById(id);
      expect(result).toEqual(mock);
    });

    it('should include noCache query when provided', async () => {
      baseScope.get(`/characters/genders/${id}`).query({ noCache: 'true' }).reply(200, mock);

      const result = await api.getCharacterGenderById(id, { noCache: true });
      expect(result).toEqual(mock);
    });
  });

  describe('enableCharacterGender()', () => {
    it('should PUT /characters/genders/:id/enabled', async () => {
      const id = 'gen1';
      baseScope.put(`/characters/genders/${id}/enabled`).reply(204);

      await api.enableCharacterGender(id);
    });
  });

  describe('disableCharacterGender()', () => {
    it('should PUT /characters/genders/:id/disabled', async () => {
      const id = 'gen1';
      baseScope.put(`/characters/genders/${id}/disabled`).reply(204);

      await api.disableCharacterGender(id);
    });
  });

  describe('updateCharacterGenderOrder()', () => {
    it('should PUT /characters/genders/:id/order with correct body', async () => {
      const id = 'gen1';
      const req: UpdateCharacterGenderOrderRequest = { order: 4 };

      baseScope
        .put(`/characters/genders/${id}/order`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(204);

      await api.updateCharacterGenderOrder(id, req);
    });
  });

  describe('updateCharacterBasicInfo()', () => {
    it('should PATCH /characters/:id/basic-info with correct body', async () => {
      const id = 'char1';
      const req: UpdateCharacterBasicInfoRequest = { firstName: 'Jane', lastName: 'Doe' };
      const mockCharacter: Character = {
        id,
        firstName: 'Jane',
        lastName: 'Doe',
        accountId: 'acc123',
        gender: 'FEMALE',
        genderName: 'Female',
        isActive: true,
        fullName: 'Jane Doe',
        createdDate: 176781234567,
        lastModifiedDate: 176781234567,
        birthDate: '1990-01-01',
      };

      baseScope
        .patch(`/characters/${id}/basic-info`, (body) => {
          expect(body).toEqual(req);
          return true;
        })
        .reply(200, mockCharacter);

      const result = await api.updateCharacterBasicInfo(id, req);
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('activateCharacter()', () => {
    it('should PUT /characters/:id/activated', async () => {
      const id = 'char1';
      baseScope.put(`/characters/${id}/activated`).reply(204);

      await api.activateCharacter(id);
    });
  });

  describe('deactivateCharacter()', () => {
    it('should PUT /characters/:id/deactivated', async () => {
      const id = 'char1';
      baseScope.put(`/characters/${id}/deactivated`).reply(204);

      await api.deactivateCharacter(id);
    });
  });
});
