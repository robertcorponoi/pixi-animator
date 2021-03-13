'use strict'

import { Sprite } from 'pixi.js';

import { AnimationClip } from './animation_clip';
import { AnimationClips } from './@types/animation_clips';

/**
 * The animator plays and manages AnimationClips.
 */
export class Animator {
    /**
     * Contains the AnimationClips that have been adeded to the Animator.
     * 
     * @private
     * 
     * @property {AnimationClips}
     */
    private _animations: AnimationClips = {};

    /**
     * The AnimationClip currently being played.
     * 
     * @private
     * 
     * @property {AnimationClip|undefined}
     */
    private _playing?: AnimationClip;

    /**
     * An empty sprite used to show animations. The sprite changes its texture
     * to the texture of the sprite needed to be shown during the animation.
     * 
     * @private
     * 
     * @property {Sprite}
     */
    // @ts-ignore
    private _animation = new Sprite();

    /**
     * Returns the AnimationClips added to the Animator.
     * 
     * @returns {AnimationClips}
     */
    get animations() { return this._animations; }

    /**
     * Returns the animation sprite.
     * 
     * @returns {Sprite}
     */
    get animation() { return this._animation; }

    /**
     * Returns the AnimationClip currently being played.
     * 
     * @returns {AnimationClip}
     */
    get playing() { return this._playing; }

    /**
     * Adds an AnimationClip to the Animator.
     * 
     * @param {AnimationClip} animationClip The AnimationClip to add to the Animator.
     * @param {boolean} [overwrite=false] Indicates whether the AnimationClip should replace an existing AnimationClip with the same key.
     */
    add(animationClip: AnimationClip, overwrite = false) {
        if (this.animations.hasOwnProperty(animationClip.key)) {
            // If the `Animations` object already has a key with the `animation` key then
            // we need to check to see if we're supposed to override it or not.
            if (!overwrite) {
                throw new Error(`An animation already exists with a key of ${animationClip.key}, use the 'overwrite' argument to overwrite it`);
            }
        }

        // Add the animation to the list of animatinos, create the empty sprite that is used
        // to display the animations, and finally return the sprite.
        this._animations[animationClip.key] = animationClip;
    }

    /**
     * Removes an AnimationClip from the Animator by its key.
     * 
     * @param {string} key The key of the AnimationClip to remove from the Animator.
     */
    remove(key: string) {
        delete this._animations[key];
    }

    /**
     * Plays an AnimationClip with the specified key.
     * 
     * @param {string} key The key of the AnimationClip to play.
     */
    play(key: string) {
        if (!this.animations.hasOwnProperty(key)) {
            // If there is no AnimationClip with the key provided then we log a warning and 
            // return early.
            console.warn(`No AnimationClip with the key of ${key} exists.`);
        }

        // Set the `playing` property to the AnimationClip currently playing and set 
        // its started time to now so it can be used by the `update` method.
        this._playing = this._animations[key];
        this._playing.started = window.performance.now();

        // Now we have to set the texture of the empty sprite to the texture of the 
        // first sprite to be played.
        // @ts-ignore
        this._animation.texture = this._playing.sprites[this._playing.frame].texture;
    }

    /**
     * If an AnimationClip is currently playing then this will stop it.
     * 
     * @param {boolean} [reset=false] If `reset` is set to `true` then the AnimationClip will be reverted to the first frame when stopped. Otherwise, the AnimationClip will stop at the frame it was last at.
     */
    stop(reset = false) {
        if (this._playing) {
            // If we're resetting the AnimationClip then we need to set its frame to
            // the first frame.
            if (reset) {
                this._playing.frame = this._playing.timeline[0][1];
                // @ts-ignore
                this._animation.texture = this.playing.sprites[this.playing.frame].texture;
            }

            this._playing.stopped = window.performance.now();
            this._playing = undefined;
        }
    }

    /**
     * Updates the animation to show the correct frame that the `AnimationClip`
     * is on. This needs to be called during the game loop for smooth animations.
     */
    update() {
        // Since the `update` method is in the game loop and called every frame
        // update, we need to make sure we only proceed if there is an AnimationClip
        // currently playing.
        if (!this.playing) return;

        // Get the current time and compare it with the AnimationClip's `started`
        // time. If the difference between the two is greater than or equal to the
        // the total length of the animation, we know that we have to stop or loop it.
        const current = window.performance.now();
        const animationEnded = (current - this.playing.started) >= this.playing.length;

        if (animationEnded) {
            // If the animation is supposed to end, we check to see if it's meant to
            // loop and if so we go to the `_loop` method. Otherwise, we call the
            // `stop` method to stop and clear the animation.
            if (this.playing.loop) this._loop();
            else {
                this.stop();
                return;
            }
        }

        // At this point we know the AnimationClip hasn't ended yet so we need to
        // see how far into the AnimationClip we are.
        const timeElapsed = current - this.playing.started;

        for (let i = 0; i < this.playing.timeline.length; ++i) {
            // Each update we have to go through each entry in the AnimationClip's timeline
            // and see if the current time is greater than that entry's time which means
            // that it's time to switch to the next frame.
            if (this.playing.timeline[i][0] >= timeElapsed) {
                // The amount of time elapsed so far is greater than the current frame so we have
                // to switch frames now by setting the `frame` property of the AnimationClip so be
                // equal to the frame in the next entry of the timeline.
                this.playing.frame = this.playing.timeline[i][1];

                // Now we set the `texture` property of the empty sprite to the texture of the next
                // sprite that is supposed to be shown.
                // @ts-ignore
                this._animation.texture = this.playing.sprites[this.playing.frame].texture;
                break;
            }
        }
    }

    /**
     * Sets the AnimationClip to be looped by reseting the `started` and `frame`
     * properties.
     * 
     * @private
     */
    private _loop() {
        if (this._playing) {
            // Set the frame to the first frame in the timeline and set the `started`
            // property to the current timestamp so that the `update` method doesn't
            // think the AnimationClip has ended.
            this._playing.frame = this._playing.timeline[0][1];
            this._playing.started = window.performance.now();
        }
    }
}