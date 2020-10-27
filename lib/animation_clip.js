'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationClip = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines an animation's sprites and properties.
 */
var AnimationClip = /*#__PURE__*/function () {
  /**
   * A unique key that is used to reference the AnimationClip in the animator.
   * 
   * @private
   * 
   * @property {string}
   */

  /**
   * The sprites that make up the animation.
   * 
   * @private
   * 
   * @property {Array<Sprite>
   */

  /**
   * The amount of time, in milliseconds, that the animation should take to 
   * get from the first sprite in the animation to the last sprite.
   * 
   * @property {number}
   */

  /**
   * The timeline is used by animator to know when to stop displaying a sprite
   * and move on to the next one.
   * 
   * @property {Array<Array<number>>}
   */

  /**
   * Indicates whether the animation should play on a loop or not.
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * The timestamp of when the animation has been started.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp}
   * 
   * @default 0
   */

  /**
   * The timestamp of when the animation has been stopped.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp}
   * 
   * @default 0
   */

  /**
   * The index of the `sprites` Array of the sprite texture that is currently
   * being displayed.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {string} key A unique key that is used to reference the AnimationClip in the Animator.
   * @param {number} length The amount of time, in milliseconds, that the animation should take to get from the first sprite in the animation to the last sprite.
   * @param {Array<PIXI.Sprite>} sprites The sprites that make up the animation.
   * @param {Array<Array<number>>} timeline The timeline is used by Animator to know when to stop displaying a sprite and move on to the next one.
   * @param {boolean} [loop=false] Indicates whether the animation should play on a loop or not.
   */
  function AnimationClip(key, length, sprites, timeline) {
    var loop = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, AnimationClip);

    _defineProperty(this, "_key", void 0);

    _defineProperty(this, "_sprites", void 0);

    _defineProperty(this, "length", void 0);

    _defineProperty(this, "timeline", void 0);

    _defineProperty(this, "loop", false);

    _defineProperty(this, "started", 0);

    _defineProperty(this, "stopped", 0);

    _defineProperty(this, "frame", void 0);

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


  _createClass(AnimationClip, [{
    key: "key",
    get: function get() {
      return this._key;
    }
    /**
     * Returns the sprites that make up the animation.
     * 
     * @returns {Array<PIXI.Sprite>}
     */

  }, {
    key: "sprites",
    get: function get() {
      return this._sprites;
    }
  }]);

  return AnimationClip;
}();

exports.AnimationClip = AnimationClip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmltYXRpb25fY2xpcC50cyJdLCJuYW1lcyI6WyJBbmltYXRpb25DbGlwIiwia2V5IiwibGVuZ3RoIiwic3ByaXRlcyIsInRpbWVsaW5lIiwibG9vcCIsIl9rZXkiLCJfc3ByaXRlcyIsImZyYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBO0lBQ2FBLGE7QUFDVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHlCQUFZQyxHQUFaLEVBQXlCQyxNQUF6QixFQUF5Q0MsT0FBekMsRUFBaUVDLFFBQWpFLEVBQStHO0FBQUEsUUFBZEMsSUFBYyx1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLGtDQXpDeEcsS0F5Q3dHOztBQUFBLHFDQTlCaEYsQ0E4QmdGOztBQUFBLHFDQW5CaEYsQ0FtQmdGOztBQUFBOztBQUMzRyxTQUFLQyxJQUFMLEdBQVlMLEdBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLSyxRQUFMLEdBQWdCSixPQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0csS0FBTCxHQUFhLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQWI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7O3dCQUNjO0FBQUUsYUFBTyxLQUFLRSxJQUFaO0FBQW1CO0FBRS9CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQ2tCO0FBQUUsYUFBTyxLQUFLQyxRQUFaO0FBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tICdAcGl4aS9zcHJpdGUnO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYW4gYW5pbWF0aW9uJ3Mgc3ByaXRlcyBhbmQgcHJvcGVydGllcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25DbGlwIHtcclxuICAgIC8qKlxyXG4gICAgICogQSB1bmlxdWUga2V5IHRoYXQgaXMgdXNlZCB0byByZWZlcmVuY2UgdGhlIEFuaW1hdGlvbkNsaXAgaW4gdGhlIGFuaW1hdG9yLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfa2V5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3ByaXRlcyB0aGF0IG1ha2UgdXAgdGhlIGFuaW1hdGlvbi5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtBcnJheTxTcHJpdGU+XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Nwcml0ZXM6IEFycmF5PFNwcml0ZT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYW1vdW50IG9mIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdGhhdCB0aGUgYW5pbWF0aW9uIHNob3VsZCB0YWtlIHRvIFxyXG4gICAgICogZ2V0IGZyb20gdGhlIGZpcnN0IHNwcml0ZSBpbiB0aGUgYW5pbWF0aW9uIHRvIHRoZSBsYXN0IHNwcml0ZS5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWVsaW5lIGlzIHVzZWQgYnkgYW5pbWF0b3IgdG8ga25vdyB3aGVuIHRvIHN0b3AgZGlzcGxheWluZyBhIHNwcml0ZVxyXG4gICAgICogYW5kIG1vdmUgb24gdG8gdGhlIG5leHQgb25lLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICAgICovXHJcbiAgICB0aW1lbGluZTogQXJyYXk8QXJyYXk8bnVtYmVyPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYW5pbWF0aW9uIHNob3VsZCBwbGF5IG9uIGEgbG9vcCBvciBub3QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqIFxyXG4gICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAqL1xyXG4gICAgbG9vcCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBhbmltYXRpb24gaGFzIGJlZW4gc3RhcnRlZC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfVxyXG4gICAgICogXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0ZWQ6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBhbmltYXRpb24gaGFzIGJlZW4gc3RvcHBlZC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfVxyXG4gICAgICogXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHN0b3BwZWQ6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGluZGV4IG9mIHRoZSBgc3ByaXRlc2AgQXJyYXkgb2YgdGhlIHNwcml0ZSB0ZXh0dXJlIHRoYXQgaXMgY3VycmVudGx5XHJcbiAgICAgKiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmcmFtZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBBIHVuaXF1ZSBrZXkgdGhhdCBpcyB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgQW5pbWF0aW9uQ2xpcCBpbiB0aGUgQW5pbWF0b3IuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIFRoZSBhbW91bnQgb2YgdGltZSwgaW4gbWlsbGlzZWNvbmRzLCB0aGF0IHRoZSBhbmltYXRpb24gc2hvdWxkIHRha2UgdG8gZ2V0IGZyb20gdGhlIGZpcnN0IHNwcml0ZSBpbiB0aGUgYW5pbWF0aW9uIHRvIHRoZSBsYXN0IHNwcml0ZS5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8UElYSS5TcHJpdGU+fSBzcHJpdGVzIFRoZSBzcHJpdGVzIHRoYXQgbWFrZSB1cCB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gdGltZWxpbmUgVGhlIHRpbWVsaW5lIGlzIHVzZWQgYnkgQW5pbWF0b3IgdG8ga25vdyB3aGVuIHRvIHN0b3AgZGlzcGxheWluZyBhIHNwcml0ZSBhbmQgbW92ZSBvbiB0byB0aGUgbmV4dCBvbmUuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtsb29wPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYW5pbWF0aW9uIHNob3VsZCBwbGF5IG9uIGEgbG9vcCBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nLCBsZW5ndGg6IG51bWJlciwgc3ByaXRlczogQXJyYXk8U3ByaXRlPiwgdGltZWxpbmU6IEFycmF5PEFycmF5PG51bWJlcj4+LCBsb29wID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlcyA9IHNwcml0ZXM7XHJcbiAgICAgICAgdGhpcy50aW1lbGluZSA9IHRpbWVsaW5lO1xyXG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMudGltZWxpbmVbMF1bMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IGZvciB0aGUgQW5pbWF0aW9uQ2xpcC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IGtleSgpIHsgcmV0dXJuIHRoaXMuX2tleTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc3ByaXRlcyB0aGF0IG1ha2UgdXAgdGhlIGFuaW1hdGlvbi5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0FycmF5PFBJWEkuU3ByaXRlPn1cclxuICAgICAqL1xyXG4gICAgZ2V0IHNwcml0ZXMoKSB7IHJldHVybiB0aGlzLl9zcHJpdGVzOyB9XHJcbn0iXX0=