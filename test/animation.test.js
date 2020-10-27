'use strict'

import {
    Animator,
    AnimationClip,
} from './pixi-animator.js';

import {
    loadSpritesheet,
    spritesheetToSprites,
} from './assets/scripts/gingerale.js';

async function main() {
    const animator = new Animator();

    const app = new PIXI.Application({ width: 300, height: 300, backgroundColor: 0x1099bb });
    document.body.appendChild(app.view);

    app.stage.addChild(animator.animation);
    app.ticker.add(delta => animator.update(delta));

    const spritesheet = await loadSpritesheet('./assets/images/characters.png');
    const spriteImages = await spritesheetToSprites(spritesheet, 32, 32);
    const sprites = toSprites(spriteImages);

    const walk = new AnimationClip('walk', 400, sprites.slice(0, 4),
        [
            [100, 0],
            [200, 1],
            [300, 2],
            [400, 3]
        ], true
    );
    animator.add(walk);

    setTimeout(() => {
        animator.play('walk');
        console.log(animator.playing);
    }, 1000);
}

main();

function toSprites(spriteImages) {
    const sprites = [];

    spriteImages.forEach(spriteImage => {
        const baseTexture = new PIXI.BaseTexture(spriteImage.image);
        const texture = new PIXI.Texture(baseTexture);

        sprites.push(new PIXI.Sprite(texture));
    });

    return sprites;
}