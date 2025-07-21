import { CameraCinematicRequest } from './camera-cinematic-request';
import { CameraFollowRequest } from './camera-follow-request';
import { CameraOrbitRequest } from './camera-orbit-request';
import { CameraStaticRequest } from './camera-static-request';
import { CameraType } from './camera';

/**
 *
 * @export
 * @interface CreateCameraRequest
 */
export interface CreateCameraRequest {
  /**
   *
   * @type {string}
   * @memberof CreateCameraRequest
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CreateCameraRequest
   */
  defaultName: string;
  /**
   *
   * @type {CameraType}
   * @memberof CreateCameraRequest
   */
  type: CameraType;
  /**
   *
   * @type {string}
   * @memberof CreateCameraRequest
   */
  description?: string;
  /**
   *
   * @type {CameraStaticRequest}
   * @memberof CreateCameraRequest
   */
  static?: CameraStaticRequest | null;
  /**
   *
   * @type {CameraFollowRequest}
   * @memberof CreateCameraRequest
   */
  follow?: CameraFollowRequest | null;
  /**
   *
   * @type {CameraOrbitRequest}
   * @memberof CreateCameraRequest
   */
  orbit?: CameraOrbitRequest | null;
  /**
   *
   * @type {CameraCinematicRequest}
   * @memberof CreateCameraRequest
   */
  cinematic?: CameraCinematicRequest | null;
  /**
   *
   * @type {string}
   * @memberof CreateCameraRequest
   */
  soundId?: string;
  /**
   *
   * @type {boolean}
   * @memberof CreateCameraRequest
   */
  freezePlayer: boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateCameraRequest
   */
  hideHud: boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateCameraRequest
   */
  enabled: boolean;
}
