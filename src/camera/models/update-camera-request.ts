import { CameraCinematicRequest } from './camera-cinematic-request';
import { CameraFollowRequest } from './camera-follow-request';
import { CameraOrbitRequest } from './camera-orbit-request';
import { CameraStaticRequest } from './camera-static-request';
import { CameraType } from './camera';

/**
 *
 * @export
 * @interface UpdateCameraRequest
 */
export interface UpdateCameraRequest {
  /**
   *
   * @type {CameraType}
   * @memberof UpdateCameraRequest
   */
  type: CameraType;
  /**
   *
   * @type {string}
   * @memberof UpdateCameraRequest
   */
  description?: string | null;
  /**
   *
   * @type {CameraStaticRequest}
   * @memberof UpdateCameraRequest
   */
  static?: CameraStaticRequest | null;
  /**
   *
   * @type {CameraFollowRequest}
   * @memberof UpdateCameraRequest
   */
  follow?: CameraFollowRequest | null;
  /**
   *
   * @type {CameraOrbitRequest}
   * @memberof UpdateCameraRequest
   */
  orbit?: CameraOrbitRequest | null;
  /**
   *
   * @type {CameraCinematicRequest}
   * @memberof UpdateCameraRequest
   */
  cinematic?: CameraCinematicRequest | null;
  /**
   *
   * @type {string}
   * @memberof UpdateCameraRequest
   */
  soundId?: string | null;
  /**
   *
   * @type {boolean}
   * @memberof UpdateCameraRequest
   */
  freezePlayer: boolean;
  /**
   *
   * @type {boolean}
   * @memberof UpdateCameraRequest
   */
  hideHud: boolean;
}
