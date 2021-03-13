'use strict'

import { AnimationClip } from '../animation_clip';

/**
 * Defines the Object that stores AnimationClip instances with the key of the
 * AnimationClip as the key and the AnimationClip instance as the value.
 */
export type AnimationClips = {
    [key: string]: AnimationClip;
}