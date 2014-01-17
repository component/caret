/**
 * Creates a Caret object
 *
 * @param {HTMLElement} target - The element the caret should be rendered based on.
 */

function Caret(target) {
  if (!(this instanceof Caret)) return new Caret(target);
  this._target = target;
  this._start = 0;
  this._end = 0;
  this._el = document.createElement('div');
  this._el.className = 'caret';
}

/**
 * Renders the caret
 */

Caret.prototype.render = function() {
  var position = 0;
  var self = this;
  function doRender(element) {
    if (element.nodeType == 3) {
      var range = document.createRange();
      for (var i = Math.max(0, self._start - position); i < Math.min(element.length, self._end - position - 1); i++) {
        range.setStart(element, i);
        range.setEnd(element, i + 1);
        var rect = range.getBoundingClientRect();
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = rect.left + 'px';
        div.style.top = rect.top + 'px';
        div.style.width = rect.width + 'px';
        div.style.height = rect.height + 'px';
        self._el.appendChild(div);
      }
      position += element.length;
    } else if (element.nodeType == 1) {
      var n = element.childNodes.length;
      for (var i = 0; i < n; i++) {
        doRender(element.childNodes[i]);
      }
    }
  }
  doRender(this._target);
}

/**
 * Set/get the start position
 * @param {Number} The new start position
 */

Caret.prototype.start = function(position) {
  if (typeof position != 'undefined') {
    this._start = position;
  }
  return this._start;
}

/**
 * Set/get the end position
 * @param {Number} The new end position
 */

Caret.prototype.end = function(position) {
  if (typeof position != 'undefined') {
    this._end = position;
  }
  return this._end;
}

/**
 * Get the caret element
 */

Caret.prototype.el = function(position) {
  return this._el;
}

module.exports = Caret;
