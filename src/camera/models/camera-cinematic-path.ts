import { Position } from '../../common/position';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraCinematicPath
 */
export interface CameraCinematicPath {
  /**
   *
   * @type {Position}
   * @memberof CameraCinematicPath
   */
  position: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraCinematicPath
   */
  rotation: Rotation;
  /**
   *
   * @type {number}
   * @memberof CameraCinematicPath
   */
  fov: number;
  /**
   *
   * @type {number}
   * @memberof CameraCinematicPath
   */
  duration: number;
}
