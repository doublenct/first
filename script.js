"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var nsString = "http://www.w3.org/2000/svg";
  var svgElement;

  function initSVG () {
    svgElement = document.createElementNS(nsString, "svg");
    svgElement.setAttribute('width', 200);
    svgElement.setAttribute('height', 200);
    document.getElementsByTagName("body")[0].appendChild(svgElement);
  }

  function NodeFactory () {

    var create = {
      rectangle: function (width, height) {
        var element = createElement('rect');
        element.setAttribute("fill", "#ff0000");
        element.setAttribute("width", presenter.checkWidth(width, 'rectangle'));
        element.setAttribute("height", presenter.checkHeight(height, 'rectangle'));
        return element;
      },
      group: function () {
        var element = createElement('g');
        return element;
      },
      text: function (text, coords) {
        var element = createElement('text');
        element.textContent = text;
        return element;
      },
      textRectangle: function (text) {
        var rectangle = create.rectangle(width, height);
        var group = create.group();
        var text = create.text();
          element.setAttribute('x', '10');
          element.setAttribute('y', '10');
        group.appendChild(rectangle);
        group.appendChild(text);
        return group;
      }
    };
    function createElement (type) {
      return document.createElementNS(nsString, type);
    }

    return {
      createNode: function (type) {
        var args = [].slice.call(arguments, 1);
        return create[type].apply(this, args);
      },
      appendNode: function (node) {
        svgElement.appendChild(node);
      }
    };

  }

  var defaults = {
    rectangle: {
      width: 200,
      height: 200
    }
  };

  function Presenter () {
    return {
      checkWidth: function (width, element) {
        var width = width ? width : defaults[element].width;
        return width + 'px';
      },
      checkHeight: function (height, element) {
        var height = height ? height : defaults[element].height;
        return height + 'px';
      }
    };
  }

  initSVG();
  var factory = new NodeFactory();
  var presenter = new Presetner();
  factory.appendNode(factory.createNode('textRectangle', 'Hello World!'));

});
