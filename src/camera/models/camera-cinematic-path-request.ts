import { Position } from '../../common/position';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraCinematicPathRequest
 */
export interface CameraCinematicPathRequest {
  /**
   *
   * @type {Position}
   * @memberof CameraCinematicPathRequest
   */
  position: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraCinematicPathRequest
   */
  rotation: Rotation;
  /**
   *
   * @type {number}
   * @memberof CameraCinematicPathRequest
   */
  fov: number;
  /**
   *
   * @type {number}
   * @memberof CameraCinematicPathRequest
   */
  duration: number;
}
