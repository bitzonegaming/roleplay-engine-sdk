import { CameraTargetType } from './camera';
import { Position } from '../../common/position';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraFollow
 */
export interface CameraFollow {
  /**
   *
   * @type {CameraTargetType}
   * @memberof CameraFollow
   */
  targetType: CameraTargetType;
  /**
   *
   * @type {Position}
   * @memberof CameraFollow
   */
  offset: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraFollow
   */
  rotation: Rotation;
  /**
   *
   * @type {number}
   * @memberof CameraFollow
   */
  fov: number;
}
