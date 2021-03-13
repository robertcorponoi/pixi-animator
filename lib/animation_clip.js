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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmltYXRpb25fY2xpcC50cyJdLCJuYW1lcyI6WyJBbmltYXRpb25DbGlwIiwia2V5IiwibGVuZ3RoIiwic3ByaXRlcyIsInRpbWVsaW5lIiwibG9vcCIsIl9rZXkiLCJfc3ByaXRlcyIsImZyYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBO0lBQ2FBLGE7QUFDVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLHlCQUFZQyxHQUFaLEVBQXlCQyxNQUF6QixFQUF5Q0MsT0FBekMsRUFBaUVDLFFBQWpFLEVBQStHO0FBQUEsUUFBZEMsSUFBYyx1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLGtDQXpDeEcsS0F5Q3dHOztBQUFBLHFDQTlCaEYsQ0E4QmdGOztBQUFBLHFDQW5CaEYsQ0FtQmdGOztBQUFBOztBQUMzRyxTQUFLQyxJQUFMLEdBQVlMLEdBQVo7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLSyxRQUFMLEdBQWdCSixPQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0csS0FBTCxHQUFhLEtBQUtKLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQWI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7O1NBQ0ksZUFBVTtBQUFFLGFBQU8sS0FBS0UsSUFBWjtBQUFtQjtBQUUvQjtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBYztBQUFFLGFBQU8sS0FBS0MsUUFBWjtBQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAncGl4aS5qcyc7XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhbiBhbmltYXRpb24ncyBzcHJpdGVzIGFuZCBwcm9wZXJ0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkNsaXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHVuaXF1ZSBrZXkgdGhhdCBpcyB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgQW5pbWF0aW9uQ2xpcCBpbiB0aGUgYW5pbWF0b3IuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9rZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzcHJpdGVzIHRoYXQgbWFrZSB1cCB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0FycmF5PFNwcml0ZT5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc3ByaXRlczogQXJyYXk8U3ByaXRlPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhbW91bnQgb2YgdGltZSwgaW4gbWlsbGlzZWNvbmRzLCB0aGF0IHRoZSBhbmltYXRpb24gc2hvdWxkIHRha2UgdG8gXHJcbiAgICAgKiBnZXQgZnJvbSB0aGUgZmlyc3Qgc3ByaXRlIGluIHRoZSBhbmltYXRpb24gdG8gdGhlIGxhc3Qgc3ByaXRlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgbGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGltZWxpbmUgaXMgdXNlZCBieSBhbmltYXRvciB0byBrbm93IHdoZW4gdG8gc3RvcCBkaXNwbGF5aW5nIGEgc3ByaXRlXHJcbiAgICAgKiBhbmQgbW92ZSBvbiB0byB0aGUgbmV4dCBvbmUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59XHJcbiAgICAgKi9cclxuICAgIHRpbWVsaW5lOiBBcnJheTxBcnJheTxudW1iZXI+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBhbmltYXRpb24gc2hvdWxkIHBsYXkgb24gYSBsb29wIG9yIG5vdC5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAgICogXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBsb29wID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGltZXN0YW1wIG9mIHdoZW4gdGhlIGFuaW1hdGlvbiBoYXMgYmVlbiBzdGFydGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB9XHJcbiAgICAgKiBcclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgc3RhcnRlZDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGltZXN0YW1wIG9mIHdoZW4gdGhlIGFuaW1hdGlvbiBoYXMgYmVlbiBzdG9wcGVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB9XHJcbiAgICAgKiBcclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgc3RvcHBlZDogRE9NSGlnaFJlc1RpbWVTdGFtcCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIGBzcHJpdGVzYCBBcnJheSBvZiB0aGUgc3ByaXRlIHRleHR1cmUgdGhhdCBpcyBjdXJyZW50bHlcclxuICAgICAqIGJlaW5nIGRpc3BsYXllZC5cclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZyYW1lOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IEEgdW5pcXVlIGtleSB0aGF0IGlzIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBBbmltYXRpb25DbGlwIGluIHRoZSBBbmltYXRvci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggVGhlIGFtb3VudCBvZiB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHRoYXQgdGhlIGFuaW1hdGlvbiBzaG91bGQgdGFrZSB0byBnZXQgZnJvbSB0aGUgZmlyc3Qgc3ByaXRlIGluIHRoZSBhbmltYXRpb24gdG8gdGhlIGxhc3Qgc3ByaXRlLlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxQSVhJLlNwcml0ZT59IHNwcml0ZXMgVGhlIHNwcml0ZXMgdGhhdCBtYWtlIHVwIHRoZSBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSB0aW1lbGluZSBUaGUgdGltZWxpbmUgaXMgdXNlZCBieSBBbmltYXRvciB0byBrbm93IHdoZW4gdG8gc3RvcCBkaXNwbGF5aW5nIGEgc3ByaXRlIGFuZCBtb3ZlIG9uIHRvIHRoZSBuZXh0IG9uZS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2xvb3A9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSBhbmltYXRpb24gc2hvdWxkIHBsYXkgb24gYSBsb29wIG9yIG5vdC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBzcHJpdGVzOiBBcnJheTxTcHJpdGU+LCB0aW1lbGluZTogQXJyYXk8QXJyYXk8bnVtYmVyPj4sIGxvb3AgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2tleSA9IGtleTtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLl9zcHJpdGVzID0gc3ByaXRlcztcclxuICAgICAgICB0aGlzLnRpbWVsaW5lID0gdGltZWxpbmU7XHJcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcclxuICAgICAgICB0aGlzLmZyYW1lID0gdGhpcy50aW1lbGluZVswXVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoZSBBbmltYXRpb25DbGlwLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQga2V5KCkgeyByZXR1cm4gdGhpcy5fa2V5OyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzcHJpdGVzIHRoYXQgbWFrZSB1cCB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8UElYSS5TcHJpdGU+fVxyXG4gICAgICovXHJcbiAgICBnZXQgc3ByaXRlcygpIHsgcmV0dXJuIHRoaXMuX3Nwcml0ZXM7IH1cclxufSJdfQ==