export enum SoundType {
  External = 'EXTERNAL',
  Native = 'NATIVE',
}

/**
 *
 * @export
 * @interface Sound
 */
export interface Sound {
  /**
   *
   * @type {string}
   * @memberof Sound
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Sound
   */
  name: string;
  /**
   *
   * @type {SoundType}
   * @memberof Sound
   */
  type: SoundType;
  /**
   *
   * @type {string}
   * @memberof Sound
   */
  description: string;
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof Sound
   */
  attributes: { [key: string]: string };
  /**
   *
   * @type {string}
   * @memberof Sound
   */
  externalUrl?: string;
  /**
   *
   * @type {boolean}
   * @memberof Sound
   */
  enabled: boolean;
  /**
   *
   * @type {number}
   * @memberof Sound
   */
  createdDate: number;
  /**
   *
   * @type {number}
   * @memberof Sound
   */
  lastModifiedDate: number;
}
