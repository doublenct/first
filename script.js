"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var nsString = "http://www.w3.org/2000/svg";
  var svgElement;

  function initSVG () {
    svgElement = document.createElementNS(nsString, "svg");
    svgElement.setAttribute('width', 400);
    svgElement.setAttribute('height', 400);
    document.getElementsByTagName("body")[0].appendChild(svgElement);
  }

  function NodeFactory () {

    var create = {
      rectangle: function () {
        var element = createElement('rect');
        element.setAttribute("fill", "#ff0000");
        element.setAttribute("width", "200px");
        element.setAttribute("height", "200px");
        return element;
      },
      group: function () {
        var element = createElement('g');
      },
      text: function () {
        var element = createElement('text');
        element.setAttribute('x', '10');
        element.setAttribute('y', '10');
      },
      textRectangle: function (text) {
        var rectangle = create.rectangle();
        var group = create.group();
        var text = create.text(text);
        group.appendChild(rectangle);
        group.appendChild(text);
      }
    };
    function createElement (type) {
      return document.createElementNS(nsString, type);
    }

    return {
      createNode: function (type) {
        var args = arguments.slice(1);
        return create[type].apply(this, arguments);
      },
      appendNode: function (node) {
        svgElement.appendChild(node);
      }
    };

  }

  initSVG();
  var factory = new NodeFactory ();
  factory.appendNode(factory.createNode('textRectangle', 'Hello World!'));

});
