// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3mKc2":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "b0b933e9aa1998aa5edf2991dfdb78c7";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"6I1aP":[function(require,module,exports) {
const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
class Point {
  static zero = new Point(0, 0);
  static unit = new Point(1, 1);
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  rotateAround(center, angle) {
    const radians = Math.PI / 180 * angle, cos = Math.cos(radians), sin = Math.sin(radians), nx = cos * (this.x - center.x) + sin * (this.y - center.y) + center.x, ny = cos * (this.y - center.y) - sin * (this.x - center.x) + center.y;
    this.x = nx;
    this.y = ny;
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
  diff(other) {
    return new Point(other.x - this.x, other.y - this.y);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  multiply(c) {
    return new Point(this.x * c, this.y * c);
  }
  flipX() {
    return new Point(-this.x, this.y);
  }
  flipY() {
    return new Point(this.x, -this.y);
  }
}
function line_intersects(line1, line2) {
  const s1_x = line1.b.x - line1.a.x, s1_y = line1.b.y - line1.a.y, s2_x = line2.b.x - line2.a.x, s2_y = line2.b.y - line2.a.y;
  const s = (-s1_y * (line1.a.x - line2.a.x) + s1_x * (line1.a.y - line2.a.y)) / (-s2_x * s1_y + s1_x * s2_y), t = (s2_x * (line1.a.y - line2.a.y) - s2_y * (line1.a.x - line2.a.x)) / (-s2_x * s1_y + s1_x * s2_y);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
}
class Transform {
  static nextZInd = 0;
  static default = new Transform(Point.zero, 0, Point.unit);
  static zero = new Transform(Point.zero, 0, Point.zero);
  addPosition(position) {
    this.add(new Transform(position, 0, Point.zero));
  }
  addRotation(rotation) {
    this.add(new Transform(Point.zero, rotation, Point.zero));
    while (this.rotation < 0) {
      this.add(new Transform(Point.zero, 360, Point.zero));
    }
    while (this.rotation >= 360) {
      this.add(new Transform(Point.zero, -360, Point.zero));
    }
  }
  addScale(scale) {
    const MIN_SCALE = 0.1;
    this.add(new Transform(Point.zero, 0, scale));
    if (this.scale.x < MIN_SCALE) {
      this.add(new Transform(Point.zero, 0, new Point(MIN_SCALE - this.scale.x, 0)));
    }
    if (this.scale.y < MIN_SCALE) {
      this.add(new Transform(Point.zero, 0, new Point(0, MIN_SCALE - this.scale.y)));
    }
  }
  add(other) {
    this.position = this.position.add(other.position);
    this.rotation = this.rotation + other.rotation;
    this.scale = this.scale.add(other.scale);
  }
  setZInd(newZInd) {
    this.zInd = newZInd;
  }
  constructor(position, rotation, scale, isUI = false) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    if (!isUI) {
      this.zInd = Transform.nextZInd++;
    }
  }
}
class Shape {
  constructor(transform) {
    this.transform = transform;
    this.selected = false;
  }
}
class Polygon extends Shape {
  constructor(transform, points = null, normalize = true) {
    super(transform);
    this.drawPoints = [];
    if (points) {
      if (normalize) {
        const center = points.reduce(function (prev, curr, _, points) {
          return new Point(prev.x + curr.x / points.length, prev.y + curr.y / points.length);
        }, new Point(0, 0));
        this.points = points.map(p => center.diff(p).multiply(50));
      } else {
        this.points = points;
      }
    }
  }
  draw(ctx) {
    const absoluteTransform = this.transform;
    this.drawPoints = this.points.map(point => {
      const drawPoint = new Point(this.transform.position.x + point.x * absoluteTransform.scale.x, this.transform.position.y + point.y * absoluteTransform.scale.y);
      drawPoint.rotateAround(new Point(absoluteTransform.position.x, absoluteTransform.position.y), this.transform.rotation);
      return drawPoint;
    });
    const prevStrokeStyle = ctx.strokeStyle;
    if (this.selected) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "black";
    }
    ctx.beginPath();
    ctx.moveTo(this.drawPoints[0].x, this.drawPoints[0].y);
    for (let i = 1; i < this.drawPoints.length; i++) {
      ctx.lineTo(this.drawPoints[i].x, this.drawPoints[i].y);
    }
    ctx.lineTo(this.drawPoints[0].x, this.drawPoints[0].y);
    ctx.stroke();
    ctx.strokeStyle = prevStrokeStyle;
  }
  getPoints() {
    const absoluteTransform = this.transform;
    this.drawPoints = this.points.map(point => {
      const drawPoint = new Point(this.transform.position.x + point.x * absoluteTransform.scale.x, this.transform.position.y + point.y * absoluteTransform.scale.y);
      drawPoint.rotateAround(new Point(absoluteTransform.position.x, absoluteTransform.position.y), this.transform.rotation);
      return drawPoint;
    });
    return this.drawPoints;
  }
  getLines() {
    const points = this.getPoints();
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      lines.push({
        a: points[i],
        b: points[(i + 1) % points.length]
      });
    }
    return lines;
  }
  triangulate() {
    let triangles = [];
    const remaining_points = [...this.points];
    let prev_remaining_points_len = remaining_points.length;
    while (remaining_points.length > 3) {
      for (let i = 0; i < remaining_points.length; i++) {
        const i1 = i == 0 ? remaining_points.length - 1 : i - 1;
        const i2 = i;
        const i3 = (i + 1) % remaining_points.length;
        const p = [remaining_points[i1], remaining_points[i2], remaining_points[i3]];
        const angle = Math.atan2(p[2].y - p[1].y, p[2].x - p[1].x) - Math.atan2(p[0].y - p[1].y, p[0].x - p[1].x);
        if (Math.abs(angle) >= Math.PI) continue;
        const triangleCandidate = new Polygon(this.transform, p, false);
        for (let l = 0; l < remaining_points.length; l++) {
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
  }
  isPointInside(point) {
    const {x, y} = point;
    let inside = false;
    for (let i = 0, j = this.drawPoints.length - 1; i < this.drawPoints.length; j = i++) {
      const xi = this.drawPoints[i].x, yi = this.drawPoints[i].y;
      const xj = this.drawPoints[j].x, yj = this.drawPoints[j].y;
      const intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  isIntersecting(other) {
    if (!(other instanceof Polygon)) {
      throw "Not implemented";
    }
    const polygon = other;
    const myLines = [];
    for (let i = 0; i < this.drawPoints.length; i++) {
      myLines.push({
        a: this.drawPoints[i],
        b: this.drawPoints[(i + 1) % this.drawPoints.length]
      });
    }
    const polygonLines = [];
    for (let i = 0; i < polygon.drawPoints.length; i++) {
      polygonLines.push({
        a: polygon.drawPoints[i],
        b: polygon.drawPoints[(i + 1) % polygon.drawPoints.length]
      });
    }
    for (const myLine of myLines) {
      for (const polygonLine of polygonLines) {
        if (line_intersects(myLine, polygonLine)) {
          return true;
        }
      }
    }
    return false;
  }
}
function drawLine(a, b, color) {
  const prevStrokeStyle = ctx.strokeStyle;
  const prevLineWidth = ctx.lineWidth;
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
  const d = line.b.diff(line.a);
  const normals = [];
  const shapePoints = shape.getPoints();
  for (let i = 0; i < shapePoints.length; i++) {
    const s = shapePoints[(i + 1) % shapePoints.length];
    const e = shapePoints[i];
    const x = e.y - s.y;
    const y = s.x - e.x;
    normals.push(new Point(x, y));
  }
  let tE = 0;
  let tL = 1;
  for (let i = 0; i < shapePoints.length; i++) {
    const dot_prod = normals[i].dot(d);
    if (dot_prod != 0) {
      const diff = line.a.diff(shapePoints[i]);
      const t = normals[i].dot(diff) / -dot_prod;
      if (dot_prod < 0) tE = Math.max(tE, t); else tL = Math.min(tL, t);
    } else {
      const a = shapePoints[i];
      const b = shapePoints[(i + 1) % shapePoints.length];
      const c = line.a;
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
  const p1 = line.a.add(line.a.diff(line.b).multiply(tE));
  const p2 = line.a.add(line.a.diff(line.b).multiply(tL));
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
class Rectangle extends Polygon {
  constructor(width, height, transform) {
    super(transform);
    this.points = [];
    const hWidth = width / 2;
    const hHeight = height / 2;
    this.points.push(new Point(-hWidth, +hHeight));
    this.points.push(new Point(+hWidth, +hHeight));
    this.points.push(new Point(+hWidth, -hHeight));
    this.points.push(new Point(-hWidth, -hHeight));
  }
}
class Button extends Rectangle {
  static SIZE = 40;
  constructor(transform, glyph, clickCallback) {
    super(Button.SIZE, Button.SIZE, transform);
    this.glyph = glyph;
    this.clickCallback = clickCallback;
  }
  draw(ctx) {
    super.draw(ctx);
    ctx.font = `${Button.SIZE * 0.8}px FontAwesome`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(this.glyph, this.transform.position.x, this.transform.position.y);
  }
}
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
let currMode = Mode.Edit;
let currEditMode = EditMode.Move;
let currCreateMode = CreateMode.Square;
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d");
const shapes = [];
function getSortedShapes() {
  return shapes.sort((a, b) => b.transform.zInd - a.transform.zInd);
}
function getTopShapeAt(point) {
  const shapes = getSortedShapes();
  for (const shape of shapes) {
    if (shape.isPointInside(point)) {
      return shape;
    }
  }
  return null;
}
function getButtonAt(point) {
  const btns = buttons;
  for (const btn of btns) {
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
  modeButtons.forEach(btn => btn.selected = false);
  btn.selected = true;
  draw();
}
const createButton = new Button(new Transform(new Point(75, 25), 0, Point.unit), "\uF0FE", () => setMode(Mode.Create, createButton));
const editButton = new Button(new Transform(new Point(25, 25), 0, Point.unit), "\uF044", () => setMode(Mode.Edit, editButton));
editButton.selected = true;
function setEditMode(newMode, btn) {
  if (tabulateCandidate) {
    tabulateCandidate.selected = false;
    tabulateCandidate = null;
  }
  currEditMode = newMode;
  editButtons.forEach(btn => btn.selected = false);
  btn.selected = true;
  draw();
}
const moveButton = new Button(new Transform(new Point(25, 75), 0, Point.unit), "\uF047", () => setEditMode(EditMode.Move, moveButton));
moveButton.selected = true;
const rotateButton = new Button(new Transform(new Point(75, 75), 0, Point.unit), "\uF021", () => setEditMode(EditMode.Rotate, rotateButton));
const scaleButton = new Button(new Transform(new Point(125, 75), 0, Point.unit), "\uF065", () => setEditMode(EditMode.Scale, scaleButton));
const tabulateButton = new Button(new Transform(new Point(175, 75), 0, Point.unit), "\uF07D", () => setEditMode(EditMode.Tabulate, tabulateButton));
function setCreateMode(newMode, btn) {
  currCreateMode = newMode;
  createButtons.forEach(btn => btn.selected = false);
  btn.selected = true;
  draw();
}
const squareButton = new Button(new Transform(new Point(25, 75), 0, Point.unit), "\uF0C8", () => setCreateMode(CreateMode.Square, squareButton));
squareButton.selected = true;
const triangleButton = new Button(new Transform(new Point(75, 75), 0, Point.unit), "\uF0D8", () => setCreateMode(CreateMode.Triangle, triangleButton));
const arrowButton = new Button(new Transform(new Point(125, 75), 0, Point.unit), "\uF124", () => setCreateMode(CreateMode.Arrow, arrowButton));
const starButton = new Button(new Transform(new Point(175, 75), 0, Point.unit), "\uF005", () => setCreateMode(CreateMode.Star, starButton));
let editShape = null;
let editPrevPoint = null;
const modeButtons = [createButton, editButton];
const editButtons = [moveButton, rotateButton, scaleButton, tabulateButton];
const createButtons = [squareButton, triangleButton, arrowButton, starButton];
let buttons = [];
let drawAllLines = false;
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
  for (const btn of buttons) {
    btn.draw(ctx);
  }
  const shapes = getSortedShapes().reverse();
  if (shapes.length > 0) {
    for (let i = 0; i < shapes.length; i++) {
      let visibleLines = shapes[i].getLines();
      if (drawAllLines) {
        for (const visibleLine of visibleLines) {
          drawLine(visibleLine.a, visibleLine.b, "green");
        }
      }
      for (let j = i + 1; j < shapes.length; j++) {
        const subShapes = shapes[j].triangulate();
        for (const subShape of subShapes) {
          let newVisibleLines = [];
          for (const visible_line of visibleLines) {
            newVisibleLines = newVisibleLines.concat(cyrus_beck(visible_line, subShape));
          }
          visibleLines = newVisibleLines;
        }
      }
      for (const visibleLine of visibleLines) {
        drawLine(visibleLine.a, visibleLine.b, shapes[i].selected ? "red" : "black");
      }
    }
  }
}
function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}
let tabulateCandidate = null;
canvas.addEventListener("mousedown", evt => {
  const clickPoint = getMousePos(evt);
  const clickedButton = getButtonAt(clickPoint);
  if (clickedButton) {
    clickedButton.clickCallback();
  } else {
    if (currMode == Mode.Edit) {
      const clickedShape = getTopShapeAt(clickPoint);
      if (currEditMode == EditMode.Tabulate) {
        if (clickedShape) {
          if (tabulateCandidate === null) {
            tabulateCandidate = clickedShape;
            tabulateCandidate.selected = true;
          } else {
            const tmp = clickedShape.transform.zInd;
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
          shapes.push(new Polygon(new Transform(clickPoint, 0, Point.unit), [new Point(0, -2.5), new Point(0.9, -0.5), new Point(3, -0.5), new Point(1.35, 0.5), new Point(2.25, 2.5), new Point(0, 1.5), new Point(-2.25, 2.5), new Point(-1.35, 0.5), new Point(-3, -0.5), new Point(-0.9, -0.5)].map(p => p.multiply(0.5))));
          break;
      }
    }
    draw();
  }
});
canvas.addEventListener("mouseup", () => {
  editShape = null;
  editPrevPoint = null;
});
canvas.addEventListener("mouseleave", () => {
  editShape = null;
  editPrevPoint = null;
});
canvas.addEventListener("mousemove", evt => {
  if (editShape) {
    const currPoint = getMousePos(evt);
    const editDiff = editPrevPoint.diff(currPoint);
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

},{}]},["3mKc2","6I1aP"], "6I1aP", "parcelRequire7629")

//# sourceMappingURL=index.dfdb78c7.js.map
