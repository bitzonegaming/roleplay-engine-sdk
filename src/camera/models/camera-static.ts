import { Position } from '../../common/position';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraStatic
 */
export interface CameraStatic {
  /**
   *
   * @type {boolean}
   * @memberof CameraStatic
   */
  blindfold: boolean;
  /**
   *
   * @type {Position}
   * @memberof CameraStatic
   */
  position: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraStatic
   */
  rotation: Rotation;
  /**
   *
   * @type {Position}
   * @memberof CameraStatic
   */
  pointAt: Position;
  /**
   *
   * @type {number}
   * @memberof CameraStatic
   */
  fov: number;
  /**
   *
   * @type {number}
   * @memberof CameraStatic
   */
  duration: number;
  /**
   *
   * @type {boolean}
   * @memberof CameraStatic
   */
  easeInOut: boolean;
}
