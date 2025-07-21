import { Position } from '../../common/position';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraStaticRequest
 */
export interface CameraStaticRequest {
  /**
   *
   * @type {boolean}
   * @memberof CameraStaticRequest
   */
  blindfold: boolean;
  /**
   *
   * @type {Position}
   * @memberof CameraStaticRequest
   */
  position: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraStaticRequest
   */
  rotation: Rotation;
  /**
   *
   * @type {Position}
   * @memberof CameraStaticRequest
   */
  pointAt: Position;
  /**
   *
   * @type {number}
   * @memberof CameraStaticRequest
   */
  fov: number;
  /**
   *
   * @type {number}
   * @memberof CameraStaticRequest
   */
  duration: number;
  /**
   *
   * @type {boolean}
   * @memberof CameraStaticRequest
   */
  easeInOut: boolean;
}
