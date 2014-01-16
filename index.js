/**
 * Creates a Caret object
 *
 * @param {HTMLElement} targetElement - The element the caret should be rendered based on.
 * @param {Number} start - The initial position of the caret
 * @param {Number} end - The final position of the caret
 * @param {HTMLElement} parentElement - The parent element of the rendered caret element (optional)
 */

function Caret(targetElement, start, end, parentElement) {
  if (!parentElement) {
    parentElement = targetElement;
  }
  this.targetElement = targetElement;

  if (start > end) {
    var tmp = start;
    start = end;
    end = tmp;
  }

  this.start = start;
  this.end = end;
  this.parentElement = parentElement;
  this.color = "rgba(0, 0, 255, 0.1)";
}

/**
 * Renders the caret
 */

Caret.prototype.render = function(element, context) {
  if (typeof element == 'undefined') {
    this.render(this.targetElement, { position: 0 });
  } else if (element.nodeType == 3) {
    var range = document.createRange();
    for (var i = Math.max(0, this.start - context.position); i < Math.min(element.length, this.end - context.position - 1); i++) {
      range.setStart(element, i);
      range.setEnd(element, i + 1);
      var rect = range.getBoundingClientRect();
      var div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = rect.left + 'px';
      div.style.top = rect.top + 'px';
      div.style.width = rect.width + 'px';
      div.style.height = rect.height + 'px';
      div.style.background = this.color;
      this.parentElement.appendChild(div);
    }
    context.position += element.length;
  } else if (element.nodeType == 1) {
    var n = element.childNodes.length;
    for (var i = 0; i < n; i++) {
      this.render(element.childNodes[i], context);
    }
  }
}

module.exports = Caret;
