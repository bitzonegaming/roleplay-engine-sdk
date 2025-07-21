import { ApiOptions, EngineClient } from '../core/engine-client';
import { CreateCameraRequest } from './models/create-camera-request';
import { Camera, CameraType } from './models/camera';
import { UpdateCameraRequest } from './models/update-camera-request';

export class CameraApi {
  constructor(private readonly client: EngineClient) {}

  /**
   * It creates a new camera for use on the server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Create camera
   * @param {CreateCameraRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public createCamera(request: CreateCameraRequest, options?: ApiOptions): Promise<Camera> {
    return this.client.post<CreateCameraRequest, Camera>({
      url: 'cameras',
      data: request,
      options,
    });
  }

  /**
   * It updates an existing camera on the server.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Update camera
   * @param {string} cameraId
   * @param {AccountAuthRequest} request
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public updateCamera(
    cameraId: string,
    request: UpdateCameraRequest,
    options?: ApiOptions,
  ): Promise<void> {
    return this.client.put<UpdateCameraRequest, void>({
      url: `cameras/${cameraId}`,
      data: request,
      options,
    });
  }

  /**
   * It returns a camera by its ID. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get camera by ID
   * @param {string} cameraId
   * @param {Object} [query]                   Query parameters.
   * @param {boolean} [query.noCache]           If `true`, the request will not use the cache.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCameraById(
    cameraId: string,
    query?: { noCache: boolean },
    options?: ApiOptions,
  ): Promise<Camera> {
    return this.client.get<Camera>({
      url: `cameras/${cameraId}`,
      query,
      options,
    });
  }

  /**
   * It returns a list of cameras based on the provided filters. If noCache is true, it will not use the cache.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:read:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: read:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Get cameras
   * @param {Object} [query]                   Query parameters.
   * @param {CameraType} [query.type]                  Filter cameras by type (e.g., 'STATIC', 'FOLLOW', 'ORBIT', 'CINEMATIC').
   * @param {boolean} [query.enabled]               Filter cameras by their enabled status.
   * @param {boolean} [query.noCache]               If `true`, the request will not use the cache.
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public getCameras(
    query?: { type?: CameraType; enabled?: boolean; noCache: boolean },
    options?: ApiOptions,
  ): Promise<Camera[]> {
    return this.client.get<Camera[]>({
      url: `cameras`,
      query,
      options,
    });
  }

  /**
   * It enables a camera for the server by its ID.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Enable camera
   * @param {string} cameraId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public enableCamera(cameraId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `cameras/${cameraId}/enabled`,
      options,
    });
  }

  /**
   * It disables a camera for the server by its ID.<br/>This endpoint performs server-level operations. The token does not need to be associated with any account or character.<br/><b>Account Policies</b>: account_policy:write:world<br/><br/> This endpoint requires authorization, and supports following token types:<br/>🔓 [API Key] <b>Required Scopes</b>: write:world<br/>🔓 [SSO Token]<br/>🔓 [Access Token]<br/>🔓 [Session Token]
   * @summary Disable camera
   * @param {string} cameraId
   * @param {*} [options] Override http request option.
   * @throws {EngineError}
   */
  public disableCamera(cameraId: string, options?: ApiOptions): Promise<void> {
    return this.client.put<void, void>({
      url: `cameras/${cameraId}/disabled`,
      options,
    });
  }
}
