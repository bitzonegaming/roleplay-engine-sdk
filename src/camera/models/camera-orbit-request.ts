import { CameraTargetType } from './camera';

/**
 *
 * @export
 * @interface CameraOrbitRequest
 */
export interface CameraOrbitRequest {
  /**
   *
   * @type {CameraTargetType}
   * @memberof CameraOrbitRequest
   */
  targetType: CameraTargetType;
  /**
   *
   * @type {number}
   * @memberof CameraOrbitRequest
   */
  radius: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbitRequest
   */
  height: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbitRequest
   */
  speed: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbitRequest
   */
  fov: number;
}
