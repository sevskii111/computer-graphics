// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.ts":[function(require,module,exports) {
var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var dot = function dot(a, b) {
  return a.map(function (x, i) {
    return a[i] * b[i];
  }).reduce(function (m, n) {
    return m + n;
  });
};

var Point =
/** @class */
function () {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.rotateAround = function (center, angle) {
    var radians = Math.PI / 180 * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = cos * (this.x - center.x) + sin * (this.y - center.y) + center.x,
        ny = cos * (this.y - center.y) - sin * (this.x - center.x) + center.y;
    this.x = nx;
    this.y = ny;
  };

  Point.prototype.add = function (other) {
    return new Point(this.x + other.x, this.y + other.y);
  };

  Point.prototype.diff = function (other) {
    return new Point(other.x - this.x, other.y - this.y);
  };

  Point.prototype.dot = function (other) {
    return this.x * other.x + this.y * other.y;
  };

  Point.prototype.multiply = function (c) {
    return new Point(this.x * c, this.y * c);
  };

  Point.prototype.flipX = function () {
    return new Point(-this.x, this.y);
  };

  Point.prototype.flipY = function () {
    return new Point(this.x, -this.y);
  };

  Point.zero = new Point(0, 0);
  Point.unit = new Point(1, 1);
  return Point;
}();

function line_intersects(line1, line2) {
  var s1_x = line1.b.x - line1.a.x,
      s1_y = line1.b.y - line1.a.y,
      s2_x = line2.b.x - line2.a.x,
      s2_y = line2.b.y - line2.a.y;
  var s = (-s1_y * (line1.a.x - line2.a.x) + s1_x * (line1.a.y - line2.a.y)) / (-s2_x * s1_y + s1_x * s2_y),
      t = (s2_x * (line1.a.y - line2.a.y) - s2_y * (line1.a.x - line2.a.x)) / (-s2_x * s1_y + s1_x * s2_y);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
}

var Transform =
/** @class */
function () {
  function Transform(position, rotation, scale, isUI) {
    if (isUI === void 0) {
      isUI = false;
    }

    this.position = position;
    this.rotation = rotation;
    this.scale = scale;

    if (!isUI) {
      this.zInd = Transform.nextZInd++;
    }
  }

  Transform.prototype.addPosition = function (position) {
    this.add(new Transform(position, 0, Point.zero));
  };

  Transform.prototype.addRotation = function (rotation) {
    this.add(new Transform(Point.zero, rotation, Point.zero));

    while (this.rotation < 0) {
      this.add(new Transform(Point.zero, 360, Point.zero));
    }

    while (this.rotation >= 360) {
      this.add(new Transform(Point.zero, -360, Point.zero));
    }
  };

  Transform.prototype.addScale = function (scale) {
    var MIN_SCALE = 0.1;
    this.add(new Transform(Point.zero, 0, scale));

    if (this.scale.x < MIN_SCALE) {
      this.add(new Transform(Point.zero, 0, new Point(MIN_SCALE - this.scale.x, 0)));
    }

    if (this.scale.y < MIN_SCALE) {
      this.add(new Transform(Point.zero, 0, new Point(0, MIN_SCALE - this.scale.y)));
    }
  };

  Transform.prototype.add = function (other) {
    this.position = this.position.add(other.position);
    this.rotation = this.rotation + other.rotation;
    this.scale = this.scale.add(other.scale);
  };

  Transform.prototype.setZInd = function (newZInd) {
    this.zInd = newZInd;
  };

  Transform.nextZInd = 0;
  Transform.default = new Transform(Point.zero, 0, Point.unit);
  Transform.zero = new Transform(Point.zero, 0, Point.zero);
  return Transform;
}();

var Shape =
/** @class */
function () {
  function Shape(transform) {
    this.transform = transform;
    this.selected = false;
  }

  return Shape;
}();

var Polygon =
/** @class */
function (_super) {
  __extends(Polygon, _super);

  function Polygon(transform, points, normalize) {
    if (points === void 0) {
      points = null;
    }

    if (normalize === void 0) {
      normalize = true;
    }

    var _this = _super.call(this, transform) || this;

    _this.drawPoints = [];

    if (points) {
      if (normalize) {
        var center_1 = points.reduce(function (prev, curr, _, points) {
          return new Point(prev.x + curr.x / points.length, prev.y + curr.y / points.length);
        }, new Point(0, 0));
        _this.points = points.map(function (p) {
          return center_1.diff(p).multiply(50);
        });
      } else {
        _this.points = points;
      }
    }

    return _this;
  }

  Polygon.prototype.draw = function (ctx) {
    var _this = this;

    var absoluteTransform = this.transform;
    this.drawPoints = this.points.map(function (point) {
      var drawPoint = new Point(_this.transform.position.x + point.x * absoluteTransform.scale.x, _this.transform.position.y + point.y * absoluteTransform.scale.y);
      drawPoint.rotateAround(new Point(absoluteTransform.position.x, absoluteTransform.position.y), _this.transform.rotation);
      return drawPoint;
    });
    var prevStrokeStyle = ctx.strokeStyle;

    if (this.selected) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "black";
    }

    ctx.beginPath();
    ctx.moveTo(this.drawPoints[0].x, this.drawPoints[0].y);

    for (var i = 1; i < this.drawPoints.length; i++) {
      ctx.lineTo(this.drawPoints[i].x, this.drawPoints[i].y);
    }

    ctx.lineTo(this.drawPoints[0].x, this.drawPoints[0].y);
    ctx.stroke();
    ctx.strokeStyle = prevStrokeStyle;
  };

  Polygon.prototype.getPoints = function () {
    var _this = this;

    var absoluteTransform = this.transform;
    this.drawPoints = this.points.map(function (point) {
      var drawPoint = new Point(_this.transform.position.x + point.x * absoluteTransform.scale.x, _this.transform.position.y + point.y * absoluteTransform.scale.y);
      drawPoint.rotateAround(new Point(absoluteTransform.position.x, absoluteTransform.position.y), _this.transform.rotation);
      return drawPoint;
    });
    return this.drawPoints;
  };

  Polygon.prototype.getLines = function () {
    var points = this.getPoints();
    var lines = [];

    for (var i = 0; i < points.length; i++) {
      lines.push({
        a: points[i],
        b: points[(i + 1) % points.length]
      });
    }

    return lines;
  };

  Polygon.prototype.triangulate = function () {
    var triangles = [];

    var remaining_points = __spreadArray([], this.points, true);

    var prev_remaining_points_len = remaining_points.length;

    while (remaining_points.length > 3) {
      for (var i = 0; i < remaining_points.length; i++) {
        var i1 = i == 0 ? remaining_points.length - 1 : i - 1;
        var i2 = i;
        var i3 = (i + 1) % remaining_points.length;
        var p = [remaining_points[i1], remaining_points[i2], remaining_points[i3]];
        var angle = Math.atan2(p[2].y - p[1].y, p[2].x - p[1].x) - Math.atan2(p[0].y - p[1].y, p[0].x - p[1].x);
        if (Math.abs(angle) >= Math.PI) continue;
        var triangleCandidate = new Polygon(this.transform, p, false);

        for (var l = 0; l < remaining_points.length; l++) {
          if (l == i1 || l == i2 || l == i3) continue;
          if (triangleCandidate.isPointInside(remaining_points[l])) continue;
        }

        triangles = triangles.concat(triangleCandidate);
        remaining_points.splice(i, 1);
        break;
      }

      if (remaining_points.length == prev_remaining_points_len) {
        break;
      } else {
        prev_remaining_points_len = remaining_points.length;
      }
    }

    triangles.push(new Polygon(this.transform, [remaining_points[0], remaining_points[1], remaining_points[2]], false));
    return triangles;
  };

  Polygon.prototype.isPointInside = function (point) {
    var x = point.x,
        y = point.y;
    var inside = false;

    for (var i = 0, j = this.drawPoints.length - 1; i < this.drawPoints.length; j = i++) {
      var xi = this.drawPoints[i].x,
          yi = this.drawPoints[i].y;
      var xj = this.drawPoints[j].x,
          yj = this.drawPoints[j].y;
      var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  Polygon.prototype.isIntersecting = function (other) {
    if (!(other instanceof Polygon)) {
      throw "Not implemented";
    }

    var polygon = other;
    var myLines = [];

    for (var i = 0; i < this.drawPoints.length; i++) {
      myLines.push({
        a: this.drawPoints[i],
        b: this.drawPoints[(i + 1) % this.drawPoints.length]
      });
    }

    var polygonLines = [];

    for (var i = 0; i < polygon.drawPoints.length; i++) {
      polygonLines.push({
        a: polygon.drawPoints[i],
        b: polygon.drawPoints[(i + 1) % polygon.drawPoints.length]
      });
    }

    for (var _i = 0, myLines_1 = myLines; _i < myLines_1.length; _i++) {
      var myLine = myLines_1[_i];

      for (var _a = 0, polygonLines_1 = polygonLines; _a < polygonLines_1.length; _a++) {
        var polygonLine = polygonLines_1[_a];

        if (line_intersects(myLine, polygonLine)) {
          return true;
        }
      }
    }

    return false;
  };

  return Polygon;
}(Shape);

function drawLine(a, b, color) {
  var prevStrokeStyle = ctx.strokeStyle;
  var prevLineWidth = ctx.lineWidth;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.strokeStyle = prevStrokeStyle;
  ctx.lineWidth = prevLineWidth;
}

function cyrus_beck(line, shape) {
  var d = line.b.diff(line.a);
  var normals = [];
  var shapePoints = shape.getPoints();

  for (var i = 0; i < shapePoints.length; i++) {
    var s = shapePoints[(i + 1) % shapePoints.length];
    var e = shapePoints[i];
    var x = e.y - s.y;
    var y = s.x - e.x;
    normals.push(new Point(x, y));
  }

  var tE = 0;
  var tL = 1;

  for (var i = 0; i < shapePoints.length; i++) {
    var dot_prod = normals[i].dot(d);

    if (dot_prod != 0) {
      var diff = line.a.diff(shapePoints[i]);
      var t = normals[i].dot(diff) / -dot_prod;
      if (dot_prod < 0) tE = Math.max(tE, t);else tL = Math.min(tL, t);
    } else {
      var a = shapePoints[i];
      var b = shapePoints[(i + 1) % shapePoints.length];
      var c = line.a;

      if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) {
        tE = 1;
        tL = -1;
      }
    }
  }

  if (tE > tL) {
    return [{
      a: line.a,
      b: line.b
    }];
  }

  var p1 = line.a.add(line.a.diff(line.b).multiply(tE));
  var p2 = line.a.add(line.a.diff(line.b).multiply(tL));

  if (tE == 0 && tL == 1) {
    return [];
  }

  if (tE == 0) {
    return [{
      a: p2,
      b: line.b
    }];
  } else if (tL == 1) {
    return [{
      a: line.a,
      b: p1
    }];
  } else {
    return [{
      a: line.a,
      b: p1
    }, {
      a: p2,
      b: line.b
    }];
  }
}

var Rectangle =
/** @class */
function (_super) {
  __extends(Rectangle, _super);

  function Rectangle(width, height, transform) {
    var _this = _super.call(this, transform) || this;

    _this.points = [];
    var hWidth = width / 2;
    var hHeight = height / 2;

    _this.points.push(new Point(-hWidth, +hHeight));

    _this.points.push(new Point(+hWidth, +hHeight));

    _this.points.push(new Point(+hWidth, -hHeight));

    _this.points.push(new Point(-hWidth, -hHeight));

    return _this;
  }

  return Rectangle;
}(Polygon);

var Button =
/** @class */
function (_super) {
  __extends(Button, _super);

  function Button(transform, glyph, clickCallback) {
    var _this = _super.call(this, Button.SIZE, Button.SIZE, transform) || this;

    _this.glyph = glyph;
    _this.clickCallback = clickCallback;
    return _this;
  }

  Button.prototype.draw = function (ctx) {
    _super.prototype.draw.call(this, ctx);

    ctx.font = Button.SIZE * 0.8 + "px FontAwesome";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(this.glyph, this.transform.position.x, this.transform.position.y);
  };

  Button.SIZE = 40;
  return Button;
}(Rectangle);

var Mode;

(function (Mode) {
  Mode[Mode["Create"] = 0] = "Create";
  Mode[Mode["Edit"] = 1] = "Edit";
})(Mode || (Mode = {}));

var EditMode;

(function (EditMode) {
  EditMode[EditMode["Move"] = 0] = "Move";
  EditMode[EditMode["Rotate"] = 1] = "Rotate";
  EditMode[EditMode["Scale"] = 2] = "Scale";
  EditMode[EditMode["Tabulate"] = 3] = "Tabulate";
})(EditMode || (EditMode = {}));

var CreateMode;

(function (CreateMode) {
  CreateMode[CreateMode["Square"] = 0] = "Square";
  CreateMode[CreateMode["Triangle"] = 1] = "Triangle";
  CreateMode[CreateMode["Arrow"] = 2] = "Arrow";
  CreateMode[CreateMode["Star"] = 3] = "Star";
})(CreateMode || (CreateMode = {}));

var currMode = Mode.Edit;
var currEditMode = EditMode.Move;
var currCreateMode = CreateMode.Square;
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext("2d");
var shapes = [];

function getSortedShapes() {
  return shapes.sort(function (a, b) {
    return b.transform.zInd - a.transform.zInd;
  });
}

function getTopShapeAt(point) {
  var shapes = getSortedShapes();

  for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
    var shape = shapes_1[_i];

    if (shape.isPointInside(point)) {
      return shape;
    }
  }

  return null;
}

function getButtonAt(point) {
  var btns = buttons;

  for (var _i = 0, btns_1 = btns; _i < btns_1.length; _i++) {
    var btn = btns_1[_i];

    if (btn.isPointInside(point)) {
      return btn;
    }
  }

  return null;
}

function setMode(newMode, btn) {
  if (tabulateCandidate) {
    tabulateCandidate.selected = false;
    tabulateCandidate = null;
  }

  currMode = newMode;
  modeButtons.forEach(function (btn) {
    return btn.selected = false;
  });
  btn.selected = true;
  draw();
}

var createButton = new Button(new Transform(new Point(75, 25), 0, Point.unit), "\uF0FE", function () {
  return setMode(Mode.Create, createButton);
});
var editButton = new Button(new Transform(new Point(25, 25), 0, Point.unit), "\uF044", function () {
  return setMode(Mode.Edit, editButton);
});
editButton.selected = true;

function setEditMode(newMode, btn) {
  if (tabulateCandidate) {
    tabulateCandidate.selected = false;
    tabulateCandidate = null;
  }

  currEditMode = newMode;
  editButtons.forEach(function (btn) {
    return btn.selected = false;
  });
  btn.selected = true;
  draw();
}

var moveButton = new Button(new Transform(new Point(25, 75), 0, Point.unit), "\uF047", function () {
  return setEditMode(EditMode.Move, moveButton);
});
moveButton.selected = true;
var rotateButton = new Button(new Transform(new Point(75, 75), 0, Point.unit), "\uF021", function () {
  return setEditMode(EditMode.Rotate, rotateButton);
});
var scaleButton = new Button(new Transform(new Point(125, 75), 0, Point.unit), "\uF065", function () {
  return setEditMode(EditMode.Scale, scaleButton);
});
var tabulateButton = new Button(new Transform(new Point(175, 75), 0, Point.unit), "\uF07D", function () {
  return setEditMode(EditMode.Tabulate, tabulateButton);
});

function setCreateMode(newMode, btn) {
  currCreateMode = newMode;
  createButtons.forEach(function (btn) {
    return btn.selected = false;
  });
  btn.selected = true;
  draw();
}

var squareButton = new Button(new Transform(new Point(25, 75), 0, Point.unit), "\uF0C8", function () {
  return setCreateMode(CreateMode.Square, squareButton);
});
squareButton.selected = true;
var triangleButton = new Button(new Transform(new Point(75, 75), 0, Point.unit), "\uF0D8", function () {
  return setCreateMode(CreateMode.Triangle, triangleButton);
});
var arrowButton = new Button(new Transform(new Point(125, 75), 0, Point.unit), "\uF124", function () {
  return setCreateMode(CreateMode.Arrow, arrowButton);
});
var starButton = new Button(new Transform(new Point(175, 75), 0, Point.unit), "\uF005", function () {
  return setCreateMode(CreateMode.Star, starButton);
});
var editShape = null;
var editPrevPoint = null;
var modeButtons = [createButton, editButton];
var editButtons = [moveButton, rotateButton, scaleButton, tabulateButton];
var createButtons = [squareButton, triangleButton, arrowButton, starButton];
var buttons = [];
var drawAllLines = false;

function switchDrawAllLines() {
  drawAllLines = !drawAllLines;
  draw();
}

globalThis.switchDrawAllLines = switchDrawAllLines;

function draw() {
  ctx.clearRect(0, 0, 800, 800);
  buttons = modeButtons;

  if (currMode == Mode.Create) {
    buttons = buttons.concat(createButtons);
  } else {
    buttons = buttons.concat(editButtons);
  }

  for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
    var btn = buttons_1[_i];
    btn.draw(ctx);
  }

  var shapes = getSortedShapes().reverse();

  if (shapes.length > 0) {
    for (var i = 0; i < shapes.length; i++) {
      var visibleLines = shapes[i].getLines();

      if (drawAllLines) {
        for (var _a = 0, visibleLines_1 = visibleLines; _a < visibleLines_1.length; _a++) {
          var visibleLine = visibleLines_1[_a];
          drawLine(visibleLine.a, visibleLine.b, "green");
        }
      }

      for (var j = i + 1; j < shapes.length; j++) {
        var subShapes = shapes[j].triangulate();

        for (var _b = 0, subShapes_1 = subShapes; _b < subShapes_1.length; _b++) {
          var subShape = subShapes_1[_b];
          var newVisibleLines = [];

          for (var _c = 0, visibleLines_2 = visibleLines; _c < visibleLines_2.length; _c++) {
            var visible_line = visibleLines_2[_c];
            newVisibleLines = newVisibleLines.concat(cyrus_beck(visible_line, subShape));
          }

          visibleLines = newVisibleLines;
        }
      }

      for (var _d = 0, visibleLines_3 = visibleLines; _d < visibleLines_3.length; _d++) {
        var visibleLine = visibleLines_3[_d];
        drawLine(visibleLine.a, visibleLine.b, shapes[i].selected ? "red" : "black");
      }
    }
  }
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

var tabulateCandidate = null;
canvas.addEventListener("mousedown", function (evt) {
  var clickPoint = getMousePos(evt);
  var clickedButton = getButtonAt(clickPoint);

  if (clickedButton) {
    clickedButton.clickCallback();
  } else {
    if (currMode == Mode.Edit) {
      var clickedShape = getTopShapeAt(clickPoint);

      if (currEditMode == EditMode.Tabulate) {
        if (clickedShape) {
          if (tabulateCandidate === null) {
            tabulateCandidate = clickedShape;
            tabulateCandidate.selected = true;
          } else {
            var tmp = clickedShape.transform.zInd;
            clickedShape.transform.setZInd(tabulateCandidate.transform.zInd);
            tabulateCandidate.transform.setZInd(tmp);
            tabulateCandidate.selected = false;
            tabulateCandidate = null;
          }
        }
      } else {
        if (clickedShape) {
          editShape = clickedShape;
          editPrevPoint = clickPoint;
        }
      }
    } else {
      if (clickPoint.x < 200 && clickPoint.y < 100) return;

      switch (currCreateMode) {
        case CreateMode.Square:
          shapes.push(new Polygon(new Transform(clickPoint, 0, Point.unit), [new Point(1, -1), new Point(1, 1), new Point(-1, 1), new Point(-1, -1)]));
          break;

        case CreateMode.Triangle:
          shapes.push(new Polygon(new Transform(clickPoint, 0, Point.unit), [new Point(1, 1), new Point(-1, 1), new Point(0, -1)]));
          break;

        case CreateMode.Arrow:
          shapes.push(new Polygon(new Transform(clickPoint, 0, Point.unit), [new Point(0, -1), new Point(2, -2), new Point(1, 0), new Point(1, -1)]));
          break;

        case CreateMode.Star:
          shapes.push(new Polygon(new Transform(clickPoint, 0, Point.unit), [new Point(0, -2.5), new Point(0.9, -0.5), new Point(3, -0.5), new Point(1.35, 0.5), new Point(2.25, 2.5), new Point(0, 1.5), new Point(-2.25, 2.5), new Point(-1.35, 0.5), new Point(-3, -0.5), new Point(-0.9, -0.5)].map(function (p) {
            return p.multiply(0.5);
          })));
          break;
      }
    }

    draw();
  }
});
canvas.addEventListener("mouseup", function () {
  editShape = null;
  editPrevPoint = null;
});
canvas.addEventListener("mouseleave", function () {
  editShape = null;
  editPrevPoint = null;
});
canvas.addEventListener("mousemove", function (evt) {
  if (editShape) {
    var currPoint = getMousePos(evt);
    var editDiff = editPrevPoint.diff(currPoint);
    editPrevPoint = currPoint;

    switch (currEditMode) {
      case EditMode.Move:
        editShape.transform.addPosition(editDiff);
        break;

      case EditMode.Rotate:
        editShape.transform.addRotation(editDiff.y);
        break;

      case EditMode.Scale:
        editShape.transform.addScale(editDiff.multiply(0.01).flipY());
        break;
    }

    draw();
  }
});
draw();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38257" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map