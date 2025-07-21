import { CameraCinematic } from './camera-cinematic';
import { CameraFollow } from './camera-follow';
import { CameraOrbit } from './camera-orbit';
import { CameraStatic } from './camera-static';

export enum CameraType {
  Static = 'STATIC',
  Follow = 'FOLLOW',
  Orbit = 'ORBIT',
  Cinematic = 'CINEMATIC',
}

export enum CameraTargetType {
  Character = 'CHARACTER',
  Vehicle = 'VEHICLE',
}

/**
 *
 * @export
 * @interface Camera
 */
export interface Camera {
  /**
   *
   * @type {string}
   * @memberof Camera
   */
  id: string;
  /**
   *
   * @type {CameraType}
   * @memberof Camera
   */
  type: CameraType;
  /**
   *
   * @type {string}
   * @memberof Camera
   */
  description: string;
  /**
   *
   * @type {CameraStatic}
   * @memberof Camera
   */
  static: CameraStatic | null;
  /**
   *
   * @type {CameraFollow}
   * @memberof Camera
   */
  follow: CameraFollow | null;
  /**
   *
   * @type {CameraOrbit}
   * @memberof Camera
   */
  orbit: CameraOrbit | null;
  /**
   *
   * @type {CameraCinematic}
   * @memberof Camera
   */
  cinematic: CameraCinematic | null;
  /**
   *
   * @type {string}
   * @memberof Camera
   */
  soundId: string | null;
  /**
   *
   * @type {boolean}
   * @memberof Camera
   */
  freezePlayer: boolean;
  /**
   *
   * @type {boolean}
   * @memberof Camera
   */
  hideHud: boolean;
  /**
   *
   * @type {boolean}
   * @memberof Camera
   */
  enabled: boolean;
  /**
   *
   * @type {number}
   * @memberof Camera
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Camera
   */
  lastModifiedDate: number;
}
