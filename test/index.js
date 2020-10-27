'use strict'

import {
    Animator,
    AnimationClip,
} from './pixi-animator.js';

import {
    loadSpritesheet,
    spritesheetToSprites,
} from './assets/scripts/gingerale.js';

// I use Vue devtools so it has to be defined in the globals.
mocha.setup({ globals: ['__VUE_DEVTOOLS_TOAST__'] });

// Set up the variables we need so that we can reference them for all of the tests.
let app;
let sprites;
let animator;
let spritesheet;
let spriteImages;

// Before any tests we have to load up the sprites from a spritesheet and make
// them into PIXI sprites.
before(async function () {
    spritesheet = await loadSpritesheet('./assets/images/characters.png');
    spriteImages = await spritesheetToSprites(spritesheet, 32, 32);
    sprites = toSprites(spriteImages);
});

// Before each test we create a new PIXI application and append it to the
// document.
beforeEach(() => animator = new Animator());

describe('Creating animations', () => {
    it('should create a sprite to use for the animations', () => {
        chai.expect(animator.animation).to.not.be.undefined;
    });

    it('should add an animation to the animator', () => {
        const walk = new AnimationClip('walk', 400, sprites.slice(0, 4),
            [
                [100, 0],
                [200, 1],
                [300, 2],
                [400, 3]
            ], true
        );
        animator.add(walk);

        chai.expect(animator.animations['walk']).to.deep.equal(walk);
    });

    it('should fail to add an animation to the animator since an animation with the same name already exists', () => {
        const walk = new AnimationClip('walk', 400, sprites.slice(0, 4),
            [
                [100, 0],
                [200, 1],
                [300, 2],
                [400, 3]
            ], true
        );
        const walk2 = new AnimationClip('walk', 1000, sprites.slice(0, 2),
            [
                [100, 0],
                [200, 1],
            ]
        );
        animator.add(walk);

        chai.expect(() => animator.add(walk2)).to.throw(Error);
    });

    it('should add an animation to the animator even though an animation with the same name already exists due to the `overwrite` option being set to `true`', () => {
        const walk = new AnimationClip('walk', 400, sprites.slice(0, 4),
            [
                [100, 0],
                [200, 1],
                [300, 2],
                [400, 3]
            ], true
        );
        const walk2 = new AnimationClip('walk', 1000, sprites.slice(0, 2),
            [
                [100, 0],
                [200, 1],
            ]
        );
        animator.add(walk);
        animator.add(walk2, true);

        chai.expect(animator.animations['walk'].length).to.equal(1000);
    });
});

describe('Running animations', function () {
    // Before each of the animation functions we need to create a new PIXI app.
    beforeEach(function () {
        app = new PIXI.Application({ width: 100, height: 100, backgroundColor: 0x1099bb });
        document.body.appendChild(app.view);

        app.stage.addChild(animator.animation);
        app.ticker.add(delta => animator.update(delta));
    });

    it('should set the currently playing animation to the `playing` property', () => {
        const walk = new AnimationClip('walk', 400, sprites.slice(0, 4),
            [
                [100, 0],
                [200, 1],
                [300, 2],
                [400, 3]
            ], true
        );
        animator.add(walk);
        animator.play('walk');

        chai.expect(animator.playing).to.not.be.undefined;
        chai.expect(animator.playing).to.not.be.null;
    });

    it('should start the animation on the frame specified', function (done) {
        this.timeout(10000);

        const walk = new AnimationClip('walk', 4000, sprites.slice(0, 4),
            [
                [1000, 0],
                [2000, 1],
                [3000, 2],
                [4000, 3]
            ], true
        );
        animator.add(walk);

        setTimeout(() => {
            animator.play('walk');

            setTimeout(() => {
                chai.expect(animator.playing.frame).to.equal(0);
                done();
            }, 500);
        }, 1000);
    });

    it('should start the animation on the frame specified alt', function (done) {
        this.timeout(10000);

        const walk = new AnimationClip('walk', 4000, sprites.slice(0, 4),
            [
                [1000, 2],
                [2000, 1],
                [3000, 0],
                [4000, 3]
            ], true
        );
        animator.add(walk);

        setTimeout(() => {
            animator.play('walk');

            setTimeout(() => {
                chai.expect(animator.playing.frame).to.equal(2);
                done();
            }, 500);
        }, 1000);
    });

    it('should progress to the second frame of the animation', function (done) {
        this.timeout(10000);

        const walk = new AnimationClip('walk', 4000, sprites.slice(0, 4),
            [
                [1000, 0],
                [2000, 1],
                [3000, 2],
                [4000, 3]
            ], true
        );
        animator.add(walk);

        setTimeout(() => {
            animator.play('walk');

            setTimeout(() => {
                chai.expect(animator.playing.frame).to.equal(1);
                done();
            }, 1500);
        }, 1000);
    });

    it('should progress to the third frame of the animation', function (done) {
        this.timeout(10000);

        const walk = new AnimationClip('walk', 4000, sprites.slice(0, 4),
            [
                [1000, 0],
                [2000, 1],
                [3000, 2],
                [4000, 3]
            ], true
        );
        animator.add(walk);

        setTimeout(() => {
            animator.play('walk');

            setTimeout(() => {
                chai.expect(animator.playing.frame).to.equal(2);
                done();
            }, 2500);
        }, 1000);
    });

    it('should progress to the last frame of the animation', function (done) {
        this.timeout(10000);

        const walk = new AnimationClip('walk', 4000, sprites.slice(0, 4),
            [
                [1000, 0],
                [2000, 1],
                [3000, 2],
                [4000, 3]
            ], true
        );
        animator.add(walk);

        setTimeout(() => {
            animator.play('walk');

            setTimeout(() => {
                chai.expect(animator.playing.frame).to.equal(3);
                done();
            }, 3500);
        }, 1000);
    });
});

/**
 * Helper function to convert the sprites from images to PIXI sprite objects.
 * 
 * @param {Array<Object>} spriteImages The array of objects containing the sprite images.
 * 
 * @returns {Array<PIXI.Sprite>} Returns an array of PIXI sprites.
 */
function toSprites(spriteImages) {
    const sprites = [];

    spriteImages.forEach(spriteImage => {
        const baseTexture = new PIXI.BaseTexture(spriteImage.image);
        const texture = new PIXI.Texture(baseTexture);

        sprites.push(new PIXI.Sprite(texture));
    });

    return sprites;
}