'use strict'

import { Sprite } from 'pixi.js';

/**
 * Defines an animation's sprites and properties.
 */
export class AnimationClip {
    /**
     * A unique key that is used to reference the AnimationClip in the animator.
     * 
     * @private
     * 
     * @property {string}
     */
    private _key: string;

    /**
     * The sprites that make up the animation.
     * 
     * @private
     * 
     * @property {Array<Sprite>
     */
    private _sprites: Array<Sprite>;

    /**
     * The amount of time, in milliseconds, that the animation should take to 
     * get from the first sprite in the animation to the last sprite.
     * 
     * @property {number}
     */
    length: number;

    /**
     * The timeline is used by animator to know when to stop displaying a sprite
     * and move on to the next one.
     * 
     * @property {Array<Array<number>>}
     */
    timeline: Array<Array<number>>;

    /**
     * Indicates whether the animation should play on a loop or not.
     * 
     * @property {boolean}
     * 
     * @default false
     */
    loop = false;

    /**
     * The timestamp of when the animation has been started.
     * 
     * @private
     * 
     * @property {DOMHighResTimeStamp}
     * 
     * @default 0
     */
    started: DOMHighResTimeStamp = 0;

    /**
     * The timestamp of when the animation has been stopped.
     * 
     * @private
     * 
     * @property {DOMHighResTimeStamp}
     * 
     * @default 0
     */
    stopped: DOMHighResTimeStamp = 0;

    /**
     * The index of the `sprites` Array of the sprite texture that is currently
     * being displayed.
     * 
     * @private
     * 
     * @property {number}
     */
    frame: number;

    /**
     * @param {string} key A unique key that is used to reference the AnimationClip in the Animator.
     * @param {number} length The amount of time, in milliseconds, that the animation should take to get from the first sprite in the animation to the last sprite.
     * @param {Array<PIXI.Sprite>} sprites The sprites that make up the animation.
     * @param {Array<Array<number>>} timeline The timeline is used by Animator to know when to stop displaying a sprite and move on to the next one.
     * @param {boolean} [loop=false] Indicates whether the animation should play on a loop or not.
     */
    constructor(key: string, length: number, sprites: Array<Sprite>, timeline: Array<Array<number>>, loop = false) {
        this._key = key;
        this.length = length;
        this._sprites = sprites;
        this.timeline = timeline;
        this.loop = loop;
        this.frame = this.timeline[0][1];
    }

    /**
     * Returns the unique key for the AnimationClip.
     * 
     * @returns {string}
     */
    get key() { return this._key; }

    /**
     * Returns the sprites that make up the animation.
     * 
     * @returns {Array<PIXI.Sprite>}
     */
    get sprites() { return this._sprites; }
}