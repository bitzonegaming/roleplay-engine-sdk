import { SoundType } from './sound';

/**
 *
 * @export
 * @interface UpdateSoundRequest
 */
export interface UpdateSoundRequest {
  /**
   *
   * @type {SoundType}
   * @memberof UpdateSoundRequest
   */
  type: SoundType;
  /**
   *
   * @type {string}
   * @memberof UpdateSoundRequest
   */
  description?: string;
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof UpdateSoundRequest
   */
  attributes: { [key: string]: string };
  /**
   *
   * @type {string}
   * @memberof UpdateSoundRequest
   */
  externalUrl?: string;
}
