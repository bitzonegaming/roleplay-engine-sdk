import { CameraTargetType } from './camera';

/**
 *
 * @export
 * @interface CameraOrbit
 */
export interface CameraOrbit {
  /**
   *
   * @type {CameraTargetType}
   * @memberof CameraOrbit
   */
  targetType: CameraTargetType;
  /**
   *
   * @type {number}
   * @memberof CameraOrbit
   */
  radius: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbit
   */
  height: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbit
   */
  speed: number;
  /**
   *
   * @type {number}
   * @memberof CameraOrbit
   */
  fov: number;
}
