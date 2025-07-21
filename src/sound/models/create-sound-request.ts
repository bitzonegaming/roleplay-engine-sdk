import { SoundType } from './sound';

/**
 *
 * @export
 * @interface CreateSoundRequest
 */
export interface CreateSoundRequest {
  /**
   *
   * @type {string}
   * @memberof CreateSoundRequest
   */
  id: string;
  /**
   *
   * @type {SoundType}
   * @memberof CreateSoundRequest
   */
  type: SoundType;
  /**
   *
   * @type {string}
   * @memberof CreateSoundRequest
   */
  defaultName: string;
  /**
   *
   * @type {string}
   * @memberof CreateSoundRequest
   */
  description?: string;
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof CreateSoundRequest
   */
  attributes: { [key: string]: string };
  /**
   *
   * @type {string}
   * @memberof CreateSoundRequest
   */
  externalUrl?: string;
  /**
   *
   * @type {boolean}
   * @memberof CreateSoundRequest
   */
  enabled: boolean;
}
