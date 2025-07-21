import { Position } from '../../common/position';
import { CameraTargetType } from './camera';
import { Rotation } from '../../common/rotation';

/**
 *
 * @export
 * @interface CameraFollowRequest
 */
export interface CameraFollowRequest {
  /**
   *
   * @type {CameraTargetType}
   * @memberof CameraFollowRequest
   */
  targetType: CameraTargetType;
  /**
   *
   * @type {Position}
   * @memberof CameraFollowRequest
   */
  offset: Position;
  /**
   *
   * @type {Rotation}
   * @memberof CameraFollowRequest
   */
  rotation: Rotation;
  /**
   *
   * @type {number}
   * @memberof CameraFollowRequest
   */
  fov: number;
}
