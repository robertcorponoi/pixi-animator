import { Sprite } from '@pixi/sprite';
import { AnimationClip } from './animation_clip';
import { AnimationClips } from './interfaces/animation_clips';
/**
 * The animator plays and manages AnimationClips.
 */
export declare class Animator {
    /**
     * Contains the AnimationClips that have been adeded to the Animator.
     *
     * @private
     *
     * @property {AnimationClips}
     */
    private _animations;
    /**
     * The AnimationClip currently being played.
     *
     * @private
     *
     * @property {AnimationClip|undefined}
     */
    private _playing?;
    /**
     * An empty sprite used to show animations. The sprite changes its texture
     * to the texture of the sprite needed to be shown during the animation.
     *
     * @private
     *
     * @property {Sprite}
     */
    private _animation;
    /**
     * Returns the AnimationClips added to the Animator.
     *
     * @returns {AnimationClips}
     */
    get animations(): AnimationClips;
    /**
     * Returns the animation sprite.
     *
     * @returns {Sprite}
     */
    get animation(): Sprite;
    /**
     * Returns the AnimationClip currently being played.
     *
     * @returns {AnimationClip}
     */
    get playing(): AnimationClip | undefined;
    /**
     * Adds an AnimationClip to the Animator.
     *
     * @param {AnimationClip} animationClip The AnimationClip to add to the Animator.
     * @param {boolean} [overwrite=false] Indicates whether the AnimationClip should replace an existing AnimationClip with the same key.
     */
    add(animationClip: AnimationClip, overwrite?: boolean): void;
    /**
     * Removes an AnimationClip from the Animator by its key.
     *
     * @param {string} key The key of the AnimationClip to remove from the Animator.
     */
    remove(key: string): void;
    /**
     * Plays an AnimationClip with the specified key.
     *
     * @param {string} key The key of the AnimationClip to play.
     */
    play(key: string): void;
    /**
     * If an AnimationClip is currently playing then this will stop it.
     *
     * @param {boolean} [reset=false] If `reset` is set to `true` then the AnimationClip will be reverted to the first frame when stopped. Otherwise, the AnimationClip will stop at the frame it was last at.
     */
    stop(reset?: boolean): void;
    /**
     * Updates the animation to show the correct frame that the `AnimationClip`
     * is on. This needs to be called during the game loop for smooth animations.
     */
    update(): void;
    /**
     * Sets the AnimationClip to be looped by reseting the `started` and `frame`
     * properties.
     *
     * @private
     */
    private _loop;
}
