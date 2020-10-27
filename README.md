<p align="center">
  <img width="250" height="250" src="https://github.com/robertcorponoi/graphics/blob/master/pixi-animator/logo.png?raw=true">
</p>
<p align="center">
    <span style="display: block; font-size:0.8rem;">Logo sprites from <a href="https://opengameart.org/content/a-platformer-in-the-forest">A Platformer in the Forest</a></span>
</p>

<h1 align="center">PIXI Animator</h1>

<p align="center">pixi-animator provides a simple API to create animations from PIXI Sprites<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/pixi-animator.svg?style=flat)](https://www.npmjs.com/package/pixi-animator)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/pixi-animator/badge.svg)](https://snyk.io/test/github/robertcorponoi/pixi-animator)
  ![npm](https://img.shields.io/npm/dt/pixi-animator)
  [![NPM downloads](https://img.shields.io/npm/dm/pixi-animator.svg?style=flat)](https://www.npmjs.com/package/pixi-animator)
  <a href="https://badge.fury.io/js/pixi-animator"><img src="https://img.shields.io/github/issues/robertcorponoi/pixi-animator.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/pixi-animator"><img src="https://img.shields.io/github/license/robertcorponoi/pixi-animator.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Table of Contents**

- [Installation](#installation)
- [Guide](#guide)
- [API](#api)
    - [AnimationClip](#animationclip)
    - [Animator](#animator)
        - [add](#add)
        - [remove](#remove)
        - [play](#play)
        - [stop](#stop)
        - [update](#update)
- [Tests](#tests)

## **Installation**

To install `pixi-animator` through npm, simply use the following command:

```
$ npm install pixi-animator
```

## **Guide**

To use `pixi-animator`, you'll need to import `Animator` and `AnimationClip` like so:

```js
import {
    Animator,
    AnimationClip
} from 'pixi-animator';
```

Next we make sure to set up the Animator (and we'll set up the PIXI app here):

```js
const app = new PIXI.Application({ width: 300, height: 300, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const animator = new Animator();
```

When an instance of the `Animator` is created, it also creates an empty sprite. This empty sprite is used to display the animation by switching it's texture to the frame that we're supposed to show. You have to take this sprite and add it to whatever group you want. This is also where you should adjust any properties like position or scale:

```js
app.stage.addChild(animator.animation);
```

Next, the `Animator` needs to update the animation so you need to put its `update` method in your game loop like so:

```js
app.ticker.add(() => animator.update());
```

Next you'll want to lod your images and make them into sprites and create animation clips from them. Animation clips take the following arguments:


| param    | type                 | description                                                                                                   | default |
|----------|----------------------|---------------------------------------------------------------------------------------------------------------|---------|
| key      | string               | A unique key that is used to reference the AnimationClip in the Animator                                      |         |
| length   | number               | The amount of time, in milliseconds, that the animation should take to get from the first sprite to the last. |         |
| sprites  | Array<PIXI.Sprite>   | The sprites that make up the animation.                                                                       |         |
| timeline | Array<Array<number>> | The timeline is used by the Animator to know when to stop displaying a sprite and move on to the next sprite. |         |
| loop     | boolean              | Indicates whether the animation should play on a loop or not.                                                 | false   |

```js
// Get your images however you wish, for me I'm using gingerale to do so.
const sprites = [...]; // Array of sprites.

// Create a looping walk animation from the first 4 frames of the spritesheet.
// A breakdown of the timeline is as follows:
// Play frame 0 until 101ms.
// Play frame 1 until 201ms.
// Play frame 2 until 301ms.
// Play from 3 until the end.
const walk = new AnimationClip('walk', 400, sprites.slice(0, 4), [
    [100, 0],
    [200, 1],
    [300, 2],
    [400, 3],
], true);

// Add the animation to the Animator.
animator.add(walk);

// Play the walk animation.
animator.play('walk');
```

## **API**

The API is split up into two parts, the `AnimationClip` and the `Animator`.

## **AnimationClip**

`AnimationClip` defines the structure of an animation to pass to the `Animator`.

| param    | type                 | description                                                                                                   | default |
|----------|----------------------|---------------------------------------------------------------------------------------------------------------|---------|
| key      | string               | A unique key that is used to reference the AnimationClip in the Animator                                      |         |
| length   | number               | The amount of time, in milliseconds, that the animation should take to get from the first sprite to the last. |         |
| sprites  | Array<PIXI.Sprite>   | The sprites that make up the animation.                                                                       |         |
| timeline | Array<Array<number>> | The timeline is used by the Animator to know when to stop displaying a sprite and move on to the next sprite. |         |
| loop     | boolean              | Indicates whether the animation should play on a loop or not.                                                 | false   |

**Example:**

```js
// Creating a looping 
// Create a looping walk animation from the first 4 frames of the spritesheet.
// A breakdown of the timeline is as follows:
// Play frame 0 until 101ms.
// Play frame 1 until 201ms.
// Play frame 2 until 301ms.
// Play from 3 until the end.
const walk = new AnimationClip('walk', 400, spritesForAnimation, [
    [100, 0],
    [200, 1],
    [300, 2],
    [400, 3],
], true);
```

The `AnimationClip` has no other properties or methods, it is just used by the Animator to have a structured set of animations.

## **Animator**

The `Animator` is used to manage animations and their properties.

### **add**

Adds an `AnimationClip` to the `Animator`.

| param         | type          | description                                                                                     | default |
|---------------|---------------|-------------------------------------------------------------------------------------------------|---------|
| animationClip | AnimationClip | The AnimationClip to add to the Animator.                                                       |         |
| overwrite     | boolean       | Indicates whether the AnimationClip should replace an existing AnimationClip with the same key. |         |

**Example:**

```js
// Creating a looping 
// Create a looping walk animation from the first 4 frames of the spritesheet.
// A breakdown of the timeline is as follows:
// Play frame 0 until 101ms.
// Play frame 1 until 201ms.
// Play frame 2 until 301ms.
// Play from 3 until the end.
const walk = new AnimationClip('walk', 400, spritesForAnimation, [
    [100, 0],
    [200, 1],
    [300, 2],
    [400, 3],
], true);

animator.add(walk);
```

### **remove**

Removes an `AnimationClip` from the `Animator` by its key.

| param | type   | description                                              | default |
|-------|--------|----------------------------------------------------------|---------|
| key   | string | The key of the AnimationClip to remove from the Animator |         |

**Example:**

```js
animator.remove('walk');
```

### **play**

Plays the `AnimationClip` with the specified key.

| param | type   | description                          | default |
|-------|--------|--------------------------------------|---------|
| key   | string | The key of the AnimationClip to play |         |

**Example:**

```js
animation.play('walk');
```

### **stop**

Stops playing the `AnimationClip` that is currently playing.

| param | type    | description                                                                                                                                  | default |
|-------|---------|----------------------------------------------------------------------------------------------------------------------------------------------|---------|
| reset | boolean | If set to true, the AnimationClip will be reverted to its first frame. Otherwise, the AnimationClip will stop on the frame that it ended on. | false   |

**Example:**

```js
// Stopping the animation on its current frame.
animator.stop();

// Stopping the animation and resetting it back to the first frame.
animator.stop(true);
```

### **update**

Updates the animation to show the correct frame that the `AnimationClip` is on. This needs to be called during the game loop for smooth animations.

**Example:**

```js
// Adding the `update` method to PIXI's ticker.
app.ticker.add(() => animator.update());

// Using `RequestAnimationFrame`.
function update() {
    animator.update();

    requestAnimationFrame(update);
}
update();
```

## **Tests**

The tests for `pixi-animator` are browser based so to run them you will first need to start the local testing server like so:

```bash
$ npm run test
```

then you will need to navigate to https://localhost:3000 in your browser to run all of the available tests.

## **License**

MIT