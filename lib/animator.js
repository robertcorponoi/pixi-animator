'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animator = void 0;

var _pixi = require("pixi.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The animator plays and manages AnimationClips.
 */
var Animator = /*#__PURE__*/function () {
  function Animator() {
    _classCallCheck(this, Animator);

    _defineProperty(this, "_animations", {});

    _defineProperty(this, "_playing", void 0);

    _defineProperty(this, "_animation", new _pixi.Sprite());
  }

  _createClass(Animator, [{
    key: "animations",
    get:
    /**
     * Returns the AnimationClips added to the Animator.
     * 
     * @returns {AnimationClips}
     */
    function get() {
      return this._animations;
    }
    /**
     * Returns the animation sprite.
     * 
     * @returns {Sprite}
     */

  }, {
    key: "animation",
    get: function get() {
      return this._animation;
    }
    /**
     * Returns the AnimationClip currently being played.
     * 
     * @returns {AnimationClip}
     */

  }, {
    key: "playing",
    get: function get() {
      return this._playing;
    }
    /**
     * Adds an AnimationClip to the Animator.
     * 
     * @param {AnimationClip} animationClip The AnimationClip to add to the Animator.
     * @param {boolean} [overwrite=false] Indicates whether the AnimationClip should replace an existing AnimationClip with the same key.
     */

  }, {
    key: "add",
    value: function add(animationClip) {
      var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.animations.hasOwnProperty(animationClip.key)) {
        // If the `Animations` object already has a key with the `animation` key then
        // we need to check to see if we're supposed to override it or not.
        if (!overwrite) {
          throw new Error("An animation already exists with a key of ".concat(animationClip.key, ", use the 'overwrite' argument to overwrite it"));
        }
      } // Add the animation to the list of animatinos, create the empty sprite that is used
      // to display the animations, and finally return the sprite.


      this._animations[animationClip.key] = animationClip;
    }
    /**
     * Removes an AnimationClip from the Animator by its key.
     * 
     * @param {string} key The key of the AnimationClip to remove from the Animator.
     */

  }, {
    key: "remove",
    value: function remove(key) {
      delete this._animations[key];
    }
    /**
     * Plays an AnimationClip with the specified key.
     * 
     * @param {string} key The key of the AnimationClip to play.
     */

  }, {
    key: "play",
    value: function play(key) {
      if (!this.animations.hasOwnProperty(key)) {
        // If there is no AnimationClip with the key provided then we log a warning and 
        // return early.
        console.warn("No AnimationClip with the key of ".concat(key, " exists."));
      } // Set the `playing` property to the AnimationClip currently playing and set 
      // its started time to now so it can be used by the `update` method.


      this._playing = this._animations[key];
      this._playing.started = window.performance.now(); // Now we have to set the texture of the empty sprite to the texture of the 
      // first sprite to be played.
      // @ts-ignore

      this._animation.texture = this._playing.sprites[this._playing.frame].texture;
    }
    /**
     * If an AnimationClip is currently playing then this will stop it.
     * 
     * @param {boolean} [reset=false] If `reset` is set to `true` then the AnimationClip will be reverted to the first frame when stopped. Otherwise, the AnimationClip will stop at the frame it was last at.
     */

  }, {
    key: "stop",
    value: function stop() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this._playing) {
        // If we're resetting the AnimationClip then we need to set its frame to
        // the first frame.
        if (reset) {
          this._playing.frame = this._playing.timeline[0][1]; // @ts-ignore

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

  }, {
    key: "update",
    value: function update() {
      // Since the `update` method is in the game loop and called every frame
      // update, we need to make sure we only proceed if there is an AnimationClip
      // currently playing.
      if (!this.playing) return; // Get the current time and compare it with the AnimationClip's `started`
      // time. If the difference between the two is greater than or equal to the
      // the total length of the animation, we know that we have to stop or loop it.

      var current = window.performance.now();
      var animationEnded = current - this.playing.started >= this.playing.length;

      if (animationEnded) {
        // If the animation is supposed to end, we check to see if it's meant to
        // loop and if so we go to the `_loop` method. Otherwise, we call the
        // `stop` method to stop and clear the animation.
        if (this.playing.loop) this._loop();else {
          this.stop();
          return;
        }
      } // At this point we know the AnimationClip hasn't ended yet so we need to
      // see how far into the AnimationClip we are.


      var timeElapsed = current - this.playing.started;

      for (var i = 0; i < this.playing.timeline.length; ++i) {
        // Each update we have to go through each entry in the AnimationClip's timeline
        // and see if the current time is greater than that entry's time which means
        // that it's time to switch to the next frame.
        if (this.playing.timeline[i][0] >= timeElapsed) {
          // The amount of time elapsed so far is greater than the current frame so we have
          // to switch frames now by setting the `frame` property of the AnimationClip so be
          // equal to the frame in the next entry of the timeline.
          this.playing.frame = this.playing.timeline[i][1]; // Now we set the `texture` property of the empty sprite to the texture of the next
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

  }, {
    key: "_loop",
    value: function _loop() {
      if (this._playing) {
        // Set the frame to the first frame in the timeline and set the `started`
        // property to the current timestamp so that the `update` method doesn't
        // think the AnimationClip has ended.
        this._playing.frame = this._playing.timeline[0][1];
        this._playing.started = window.performance.now();
      }
    }
  }]);

  return Animator;
}();

exports.Animator = Animator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmltYXRvci50cyJdLCJuYW1lcyI6WyJBbmltYXRvciIsIlNwcml0ZSIsIl9hbmltYXRpb25zIiwiX2FuaW1hdGlvbiIsIl9wbGF5aW5nIiwiYW5pbWF0aW9uQ2xpcCIsIm92ZXJ3cml0ZSIsImFuaW1hdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsImtleSIsIkVycm9yIiwiY29uc29sZSIsIndhcm4iLCJzdGFydGVkIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJ0ZXh0dXJlIiwic3ByaXRlcyIsImZyYW1lIiwicmVzZXQiLCJ0aW1lbGluZSIsInBsYXlpbmciLCJzdG9wcGVkIiwidW5kZWZpbmVkIiwiY3VycmVudCIsImFuaW1hdGlvbkVuZGVkIiwibGVuZ3RoIiwibG9vcCIsIl9sb29wIiwic3RvcCIsInRpbWVFbGFwc2VkIiwiaSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtJQUNhQSxROzs7O3lDQVE2QixFOzs7O3dDQW9CakIsSUFBSUMsWUFBSixFOzs7Ozs7QUFFckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUFpQjtBQUFFLGFBQU8sS0FBS0MsV0FBWjtBQUEwQjtBQUU3QztBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBZ0I7QUFBRSxhQUFPLEtBQUtDLFVBQVo7QUFBeUI7QUFFM0M7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQWM7QUFBRSxhQUFPLEtBQUtDLFFBQVo7QUFBdUI7QUFFdkM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0ksYUFBSUMsYUFBSixFQUFxRDtBQUFBLFVBQW5CQyxTQUFtQix1RUFBUCxLQUFPOztBQUNqRCxVQUFJLEtBQUtDLFVBQUwsQ0FBZ0JDLGNBQWhCLENBQStCSCxhQUFhLENBQUNJLEdBQTdDLENBQUosRUFBdUQ7QUFDbkQ7QUFDQTtBQUNBLFlBQUksQ0FBQ0gsU0FBTCxFQUFnQjtBQUNaLGdCQUFNLElBQUlJLEtBQUoscURBQXVETCxhQUFhLENBQUNJLEdBQXJFLG9EQUFOO0FBQ0g7QUFDSixPQVBnRCxDQVNqRDtBQUNBOzs7QUFDQSxXQUFLUCxXQUFMLENBQWlCRyxhQUFhLENBQUNJLEdBQS9CLElBQXNDSixhQUF0QztBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLGdCQUFPSSxHQUFQLEVBQW9CO0FBQ2hCLGFBQU8sS0FBS1AsV0FBTCxDQUFpQk8sR0FBakIsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLGNBQUtBLEdBQUwsRUFBa0I7QUFDZCxVQUFJLENBQUMsS0FBS0YsVUFBTCxDQUFnQkMsY0FBaEIsQ0FBK0JDLEdBQS9CLENBQUwsRUFBMEM7QUFDdEM7QUFDQTtBQUNBRSxRQUFBQSxPQUFPLENBQUNDLElBQVIsNENBQWlESCxHQUFqRDtBQUNILE9BTGEsQ0FPZDtBQUNBOzs7QUFDQSxXQUFLTCxRQUFMLEdBQWdCLEtBQUtGLFdBQUwsQ0FBaUJPLEdBQWpCLENBQWhCO0FBQ0EsV0FBS0wsUUFBTCxDQUFjUyxPQUFkLEdBQXdCQyxNQUFNLENBQUNDLFdBQVAsQ0FBbUJDLEdBQW5CLEVBQXhCLENBVmMsQ0FZZDtBQUNBO0FBQ0E7O0FBQ0EsV0FBS2IsVUFBTCxDQUFnQmMsT0FBaEIsR0FBMEIsS0FBS2IsUUFBTCxDQUFjYyxPQUFkLENBQXNCLEtBQUtkLFFBQUwsQ0FBY2UsS0FBcEMsRUFBMkNGLE9BQXJFO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0ksZ0JBQW9CO0FBQUEsVUFBZkcsS0FBZSx1RUFBUCxLQUFPOztBQUNoQixVQUFJLEtBQUtoQixRQUFULEVBQW1CO0FBQ2Y7QUFDQTtBQUNBLFlBQUlnQixLQUFKLEVBQVc7QUFDUCxlQUFLaEIsUUFBTCxDQUFjZSxLQUFkLEdBQXNCLEtBQUtmLFFBQUwsQ0FBY2lCLFFBQWQsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBdEIsQ0FETyxDQUVQOztBQUNBLGVBQUtsQixVQUFMLENBQWdCYyxPQUFoQixHQUEwQixLQUFLSyxPQUFMLENBQWFKLE9BQWIsQ0FBcUIsS0FBS0ksT0FBTCxDQUFhSCxLQUFsQyxFQUF5Q0YsT0FBbkU7QUFDSDs7QUFFRCxhQUFLYixRQUFMLENBQWNtQixPQUFkLEdBQXdCVCxNQUFNLENBQUNDLFdBQVAsQ0FBbUJDLEdBQW5CLEVBQXhCO0FBQ0EsYUFBS1osUUFBTCxHQUFnQm9CLFNBQWhCO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7O1dBQ0ksa0JBQVM7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFJLENBQUMsS0FBS0YsT0FBVixFQUFtQixPQUpkLENBTUw7QUFDQTtBQUNBOztBQUNBLFVBQU1HLE9BQU8sR0FBR1gsTUFBTSxDQUFDQyxXQUFQLENBQW1CQyxHQUFuQixFQUFoQjtBQUNBLFVBQU1VLGNBQWMsR0FBSUQsT0FBTyxHQUFHLEtBQUtILE9BQUwsQ0FBYVQsT0FBeEIsSUFBb0MsS0FBS1MsT0FBTCxDQUFhSyxNQUF4RTs7QUFFQSxVQUFJRCxjQUFKLEVBQW9CO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLFlBQUksS0FBS0osT0FBTCxDQUFhTSxJQUFqQixFQUF1QixLQUFLQyxLQUFMLEdBQXZCLEtBQ0s7QUFDRCxlQUFLQyxJQUFMO0FBQ0E7QUFDSDtBQUNKLE9BckJJLENBdUJMO0FBQ0E7OztBQUNBLFVBQU1DLFdBQVcsR0FBR04sT0FBTyxHQUFHLEtBQUtILE9BQUwsQ0FBYVQsT0FBM0M7O0FBRUEsV0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLVixPQUFMLENBQWFELFFBQWIsQ0FBc0JNLE1BQTFDLEVBQWtELEVBQUVLLENBQXBELEVBQXVEO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFlBQUksS0FBS1YsT0FBTCxDQUFhRCxRQUFiLENBQXNCVyxDQUF0QixFQUF5QixDQUF6QixLQUErQkQsV0FBbkMsRUFBZ0Q7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsZUFBS1QsT0FBTCxDQUFhSCxLQUFiLEdBQXFCLEtBQUtHLE9BQUwsQ0FBYUQsUUFBYixDQUFzQlcsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBckIsQ0FKNEMsQ0FNNUM7QUFDQTtBQUNBOztBQUNBLGVBQUs3QixVQUFMLENBQWdCYyxPQUFoQixHQUEwQixLQUFLSyxPQUFMLENBQWFKLE9BQWIsQ0FBcUIsS0FBS0ksT0FBTCxDQUFhSCxLQUFsQyxFQUF5Q0YsT0FBbkU7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNJLGlCQUFnQjtBQUNaLFVBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQUtBLFFBQUwsQ0FBY2UsS0FBZCxHQUFzQixLQUFLZixRQUFMLENBQWNpQixRQUFkLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQXRCO0FBQ0EsYUFBS2pCLFFBQUwsQ0FBY1MsT0FBZCxHQUF3QkMsTUFBTSxDQUFDQyxXQUFQLENBQW1CQyxHQUFuQixFQUF4QjtBQUNIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gJ3BpeGkuanMnO1xyXG5cclxuaW1wb3J0IHsgQW5pbWF0aW9uQ2xpcCB9IGZyb20gJy4vYW5pbWF0aW9uX2NsaXAnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25DbGlwcyB9IGZyb20gJy4vQHR5cGVzL2FuaW1hdGlvbl9jbGlwcyc7XHJcblxyXG4vKipcclxuICogVGhlIGFuaW1hdG9yIHBsYXlzIGFuZCBtYW5hZ2VzIEFuaW1hdGlvbkNsaXBzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFuaW1hdG9yIHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgdGhlIEFuaW1hdGlvbkNsaXBzIHRoYXQgaGF2ZSBiZWVuIGFkZWRlZCB0byB0aGUgQW5pbWF0b3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7QW5pbWF0aW9uQ2xpcHN9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FuaW1hdGlvbnM6IEFuaW1hdGlvbkNsaXBzID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgQW5pbWF0aW9uQ2xpcCBjdXJyZW50bHkgYmVpbmcgcGxheWVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0FuaW1hdGlvbkNsaXB8dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wbGF5aW5nPzogQW5pbWF0aW9uQ2xpcDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGVtcHR5IHNwcml0ZSB1c2VkIHRvIHNob3cgYW5pbWF0aW9ucy4gVGhlIHNwcml0ZSBjaGFuZ2VzIGl0cyB0ZXh0dXJlXHJcbiAgICAgKiB0byB0aGUgdGV4dHVyZSBvZiB0aGUgc3ByaXRlIG5lZWRlZCB0byBiZSBzaG93biBkdXJpbmcgdGhlIGFuaW1hdGlvbi5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtTcHJpdGV9XHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHByaXZhdGUgX2FuaW1hdGlvbiA9IG5ldyBTcHJpdGUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIEFuaW1hdGlvbkNsaXBzIGFkZGVkIHRvIHRoZSBBbmltYXRvci5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0FuaW1hdGlvbkNsaXBzfVxyXG4gICAgICovXHJcbiAgICBnZXQgYW5pbWF0aW9ucygpIHsgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbnM7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGFuaW1hdGlvbiBzcHJpdGUuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtTcHJpdGV9XHJcbiAgICAgKi9cclxuICAgIGdldCBhbmltYXRpb24oKSB7IHJldHVybiB0aGlzLl9hbmltYXRpb247IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIEFuaW1hdGlvbkNsaXAgY3VycmVudGx5IGJlaW5nIHBsYXllZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0FuaW1hdGlvbkNsaXB9XHJcbiAgICAgKi9cclxuICAgIGdldCBwbGF5aW5nKCkgeyByZXR1cm4gdGhpcy5fcGxheWluZzsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBBbmltYXRpb25DbGlwIHRvIHRoZSBBbmltYXRvci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25DbGlwfSBhbmltYXRpb25DbGlwIFRoZSBBbmltYXRpb25DbGlwIHRvIGFkZCB0byB0aGUgQW5pbWF0b3IuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVyd3JpdGU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSBBbmltYXRpb25DbGlwIHNob3VsZCByZXBsYWNlIGFuIGV4aXN0aW5nIEFuaW1hdGlvbkNsaXAgd2l0aCB0aGUgc2FtZSBrZXkuXHJcbiAgICAgKi9cclxuICAgIGFkZChhbmltYXRpb25DbGlwOiBBbmltYXRpb25DbGlwLCBvdmVyd3JpdGUgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMuaGFzT3duUHJvcGVydHkoYW5pbWF0aW9uQ2xpcC5rZXkpKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBgQW5pbWF0aW9uc2Agb2JqZWN0IGFscmVhZHkgaGFzIGEga2V5IHdpdGggdGhlIGBhbmltYXRpb25gIGtleSB0aGVuXHJcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY2hlY2sgdG8gc2VlIGlmIHdlJ3JlIHN1cHBvc2VkIHRvIG92ZXJyaWRlIGl0IG9yIG5vdC5cclxuICAgICAgICAgICAgaWYgKCFvdmVyd3JpdGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQW4gYW5pbWF0aW9uIGFscmVhZHkgZXhpc3RzIHdpdGggYSBrZXkgb2YgJHthbmltYXRpb25DbGlwLmtleX0sIHVzZSB0aGUgJ292ZXJ3cml0ZScgYXJndW1lbnQgdG8gb3ZlcndyaXRlIGl0YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgYW5pbWF0aW9uIHRvIHRoZSBsaXN0IG9mIGFuaW1hdGlub3MsIGNyZWF0ZSB0aGUgZW1wdHkgc3ByaXRlIHRoYXQgaXMgdXNlZFxyXG4gICAgICAgIC8vIHRvIGRpc3BsYXkgdGhlIGFuaW1hdGlvbnMsIGFuZCBmaW5hbGx5IHJldHVybiB0aGUgc3ByaXRlLlxyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnNbYW5pbWF0aW9uQ2xpcC5rZXldID0gYW5pbWF0aW9uQ2xpcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gQW5pbWF0aW9uQ2xpcCBmcm9tIHRoZSBBbmltYXRvciBieSBpdHMga2V5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIEFuaW1hdGlvbkNsaXAgdG8gcmVtb3ZlIGZyb20gdGhlIEFuaW1hdG9yLlxyXG4gICAgICovXHJcbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fYW5pbWF0aW9uc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheXMgYW4gQW5pbWF0aW9uQ2xpcCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIEFuaW1hdGlvbkNsaXAgdG8gcGxheS5cclxuICAgICAqL1xyXG4gICAgcGxheShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gQW5pbWF0aW9uQ2xpcCB3aXRoIHRoZSBrZXkgcHJvdmlkZWQgdGhlbiB3ZSBsb2cgYSB3YXJuaW5nIGFuZCBcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGVhcmx5LlxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIEFuaW1hdGlvbkNsaXAgd2l0aCB0aGUga2V5IG9mICR7a2V5fSBleGlzdHMuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIGBwbGF5aW5nYCBwcm9wZXJ0eSB0byB0aGUgQW5pbWF0aW9uQ2xpcCBjdXJyZW50bHkgcGxheWluZyBhbmQgc2V0IFxyXG4gICAgICAgIC8vIGl0cyBzdGFydGVkIHRpbWUgdG8gbm93IHNvIGl0IGNhbiBiZSB1c2VkIGJ5IHRoZSBgdXBkYXRlYCBtZXRob2QuXHJcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IHRoaXMuX2FuaW1hdGlvbnNba2V5XTtcclxuICAgICAgICB0aGlzLl9wbGF5aW5nLnN0YXJ0ZWQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgICAgIC8vIE5vdyB3ZSBoYXZlIHRvIHNldCB0aGUgdGV4dHVyZSBvZiB0aGUgZW1wdHkgc3ByaXRlIHRvIHRoZSB0ZXh0dXJlIG9mIHRoZSBcclxuICAgICAgICAvLyBmaXJzdCBzcHJpdGUgdG8gYmUgcGxheWVkLlxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLl9hbmltYXRpb24udGV4dHVyZSA9IHRoaXMuX3BsYXlpbmcuc3ByaXRlc1t0aGlzLl9wbGF5aW5nLmZyYW1lXS50ZXh0dXJlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgYW4gQW5pbWF0aW9uQ2xpcCBpcyBjdXJyZW50bHkgcGxheWluZyB0aGVuIHRoaXMgd2lsbCBzdG9wIGl0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNldD1mYWxzZV0gSWYgYHJlc2V0YCBpcyBzZXQgdG8gYHRydWVgIHRoZW4gdGhlIEFuaW1hdGlvbkNsaXAgd2lsbCBiZSByZXZlcnRlZCB0byB0aGUgZmlyc3QgZnJhbWUgd2hlbiBzdG9wcGVkLiBPdGhlcndpc2UsIHRoZSBBbmltYXRpb25DbGlwIHdpbGwgc3RvcCBhdCB0aGUgZnJhbWUgaXQgd2FzIGxhc3QgYXQuXHJcbiAgICAgKi9cclxuICAgIHN0b3AocmVzZXQgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIHJlc2V0dGluZyB0aGUgQW5pbWF0aW9uQ2xpcCB0aGVuIHdlIG5lZWQgdG8gc2V0IGl0cyBmcmFtZSB0b1xyXG4gICAgICAgICAgICAvLyB0aGUgZmlyc3QgZnJhbWUuXHJcbiAgICAgICAgICAgIGlmIChyZXNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWluZy5mcmFtZSA9IHRoaXMuX3BsYXlpbmcudGltZWxpbmVbMF1bMV07XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24udGV4dHVyZSA9IHRoaXMucGxheWluZy5zcHJpdGVzW3RoaXMucGxheWluZy5mcmFtZV0udGV4dHVyZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcGxheWluZy5zdG9wcGVkID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5aW5nID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGFuaW1hdGlvbiB0byBzaG93IHRoZSBjb3JyZWN0IGZyYW1lIHRoYXQgdGhlIGBBbmltYXRpb25DbGlwYFxyXG4gICAgICogaXMgb24uIFRoaXMgbmVlZHMgdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgZ2FtZSBsb29wIGZvciBzbW9vdGggYW5pbWF0aW9ucy5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vIFNpbmNlIHRoZSBgdXBkYXRlYCBtZXRob2QgaXMgaW4gdGhlIGdhbWUgbG9vcCBhbmQgY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICAgICAgLy8gdXBkYXRlLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBvbmx5IHByb2NlZWQgaWYgdGhlcmUgaXMgYW4gQW5pbWF0aW9uQ2xpcFxyXG4gICAgICAgIC8vIGN1cnJlbnRseSBwbGF5aW5nLlxyXG4gICAgICAgIGlmICghdGhpcy5wbGF5aW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCB0aW1lIGFuZCBjb21wYXJlIGl0IHdpdGggdGhlIEFuaW1hdGlvbkNsaXAncyBgc3RhcnRlZGBcclxuICAgICAgICAvLyB0aW1lLiBJZiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSB0d28gaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZVxyXG4gICAgICAgIC8vIHRoZSB0b3RhbCBsZW5ndGggb2YgdGhlIGFuaW1hdGlvbiwgd2Uga25vdyB0aGF0IHdlIGhhdmUgdG8gc3RvcCBvciBsb29wIGl0LlxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uRW5kZWQgPSAoY3VycmVudCAtIHRoaXMucGxheWluZy5zdGFydGVkKSA+PSB0aGlzLnBsYXlpbmcubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoYW5pbWF0aW9uRW5kZWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGFuaW1hdGlvbiBpcyBzdXBwb3NlZCB0byBlbmQsIHdlIGNoZWNrIHRvIHNlZSBpZiBpdCdzIG1lYW50IHRvXHJcbiAgICAgICAgICAgIC8vIGxvb3AgYW5kIGlmIHNvIHdlIGdvIHRvIHRoZSBgX2xvb3BgIG1ldGhvZC4gT3RoZXJ3aXNlLCB3ZSBjYWxsIHRoZVxyXG4gICAgICAgICAgICAvLyBgc3RvcGAgbWV0aG9kIHRvIHN0b3AgYW5kIGNsZWFyIHRoZSBhbmltYXRpb24uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlpbmcubG9vcCkgdGhpcy5fbG9vcCgpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGtub3cgdGhlIEFuaW1hdGlvbkNsaXAgaGFzbid0IGVuZGVkIHlldCBzbyB3ZSBuZWVkIHRvXHJcbiAgICAgICAgLy8gc2VlIGhvdyBmYXIgaW50byB0aGUgQW5pbWF0aW9uQ2xpcCB3ZSBhcmUuXHJcbiAgICAgICAgY29uc3QgdGltZUVsYXBzZWQgPSBjdXJyZW50IC0gdGhpcy5wbGF5aW5nLnN0YXJ0ZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGF5aW5nLnRpbWVsaW5lLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIC8vIEVhY2ggdXBkYXRlIHdlIGhhdmUgdG8gZ28gdGhyb3VnaCBlYWNoIGVudHJ5IGluIHRoZSBBbmltYXRpb25DbGlwJ3MgdGltZWxpbmVcclxuICAgICAgICAgICAgLy8gYW5kIHNlZSBpZiB0aGUgY3VycmVudCB0aW1lIGlzIGdyZWF0ZXIgdGhhbiB0aGF0IGVudHJ5J3MgdGltZSB3aGljaCBtZWFuc1xyXG4gICAgICAgICAgICAvLyB0aGF0IGl0J3MgdGltZSB0byBzd2l0Y2ggdG8gdGhlIG5leHQgZnJhbWUuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlpbmcudGltZWxpbmVbaV1bMF0gPj0gdGltZUVsYXBzZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBhbW91bnQgb2YgdGltZSBlbGFwc2VkIHNvIGZhciBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgZnJhbWUgc28gd2UgaGF2ZVxyXG4gICAgICAgICAgICAgICAgLy8gdG8gc3dpdGNoIGZyYW1lcyBub3cgYnkgc2V0dGluZyB0aGUgYGZyYW1lYCBwcm9wZXJ0eSBvZiB0aGUgQW5pbWF0aW9uQ2xpcCBzbyBiZVxyXG4gICAgICAgICAgICAgICAgLy8gZXF1YWwgdG8gdGhlIGZyYW1lIGluIHRoZSBuZXh0IGVudHJ5IG9mIHRoZSB0aW1lbGluZS5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWluZy5mcmFtZSA9IHRoaXMucGxheWluZy50aW1lbGluZVtpXVsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3cgd2Ugc2V0IHRoZSBgdGV4dHVyZWAgcHJvcGVydHkgb2YgdGhlIGVtcHR5IHNwcml0ZSB0byB0aGUgdGV4dHVyZSBvZiB0aGUgbmV4dFxyXG4gICAgICAgICAgICAgICAgLy8gc3ByaXRlIHRoYXQgaXMgc3VwcG9zZWQgdG8gYmUgc2hvd24uXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24udGV4dHVyZSA9IHRoaXMucGxheWluZy5zcHJpdGVzW3RoaXMucGxheWluZy5mcmFtZV0udGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgQW5pbWF0aW9uQ2xpcCB0byBiZSBsb29wZWQgYnkgcmVzZXRpbmcgdGhlIGBzdGFydGVkYCBhbmQgYGZyYW1lYFxyXG4gICAgICogcHJvcGVydGllcy5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbG9vcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWluZykge1xyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZyYW1lIHRvIHRoZSBmaXJzdCBmcmFtZSBpbiB0aGUgdGltZWxpbmUgYW5kIHNldCB0aGUgYHN0YXJ0ZWRgXHJcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IHRvIHRoZSBjdXJyZW50IHRpbWVzdGFtcCBzbyB0aGF0IHRoZSBgdXBkYXRlYCBtZXRob2QgZG9lc24ndFxyXG4gICAgICAgICAgICAvLyB0aGluayB0aGUgQW5pbWF0aW9uQ2xpcCBoYXMgZW5kZWQuXHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcuZnJhbWUgPSB0aGlzLl9wbGF5aW5nLnRpbWVsaW5lWzBdWzFdO1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5aW5nLnN0YXJ0ZWQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19