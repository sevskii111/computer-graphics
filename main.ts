const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

class Point {
  x: number;
  y: number;

  static readonly zero = new Point(0, 0);
  static readonly unit = new Point(1, 1);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  rotateAround(center: Point, angle: number): void {
    const radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (this.x - center.x) + sin * (this.y - center.y) + center.x,
      ny = cos * (this.y - center.y) - sin * (this.x - center.x) + center.y;
    this.x = nx;
    this.y = ny;
  }

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  diff(other: Point) {
    return new Point(other.x - this.x, other.y - this.y);
  }

  dot(other: Point) {
    return this.x * other.x + this.y * other.y;
  }

  multiply(c: number) {
    return new Point(this.x * c, this.y * c);
  }

  flipX() {
    return new Point(-this.x, this.y);
  }

  flipY() {
    return new Point(this.x, -this.y);
  }
}

interface Line {
  a: Point;
  b: Point;
  o?: any;
}

function line_intersects(line1: Line, line2: Line) {
  const s1_x = line1.b.x - line1.a.x,
    s1_y = line1.b.y - line1.a.y,
    s2_x = line2.b.x - line2.a.x,
    s2_y = line2.b.y - line2.a.y;

  const s =
      (-s1_y * (line1.a.x - line2.a.x) + s1_x * (line1.a.y - line2.a.y)) /
      (-s2_x * s1_y + s1_x * s2_y),
    t =
      (s2_x * (line1.a.y - line2.a.y) - s2_y * (line1.a.x - line2.a.x)) /
      (-s2_x * s1_y + s1_x * s2_y);

  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
}

class Transform {
  static nextZInd = 0;
  position: Point;
  rotation: number;
  scale: Point;
  zInd: number;

  static readonly default = new Transform(Point.zero, 0, Point.unit);
  static readonly zero = new Transform(Point.zero, 0, Point.zero);

  addPosition(position: Point) {
    this.add(new Transform(position, 0, Point.zero));
  }

  addRotation(rotation: number) {
    this.add(new Transform(Point.zero, rotation, Point.zero));
    while (this.rotation < 0) {
      this.add(new Transform(Point.zero, 360, Point.zero));
    }
    while (this.rotation >= 360) {
      this.add(new Transform(Point.zero, -360, Point.zero));
    }
  }

  addScale(scale: Point) {
    const MIN_SCALE = 0.1;
    this.add(new Transform(Point.zero, 0, scale));
    if (this.scale.x < MIN_SCALE) {
      this.add(
        new Transform(Point.zero, 0, new Point(MIN_SCALE - this.scale.x, 0))
      );
    }
    if (this.scale.y < MIN_SCALE) {
      this.add(
        new Transform(Point.zero, 0, new Point(0, MIN_SCALE - this.scale.y))
      );
    }
  }

  add(other: Transform) {
    this.position = this.position.add(other.position);
    this.rotation = this.rotation + other.rotation;
    this.scale = this.scale.add(other.scale);
  }

  setZInd(newZInd: number) {
    this.zInd = newZInd;
  }

  constructor(position: Point, rotation: number, scale: Point, isUI = false) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    if (!isUI) {
      this.zInd = Transform.nextZInd++;
    }
  }
}

abstract class Shape {
  transform: Transform;
  selected: boolean;

  constructor(transform: Transform) {
    this.transform = transform;
    this.selected = false;
  }

  abstract getPoints(): Point[];
  abstract getLines(): Line[];
  abstract isIntersecting(other: Shape): boolean;
  abstract isPointInside(point: Point): boolean;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract triangulate(): Shape[];
}

class Polygon extends Shape {
  points: Point[];
  drawPoints: Point[];

  constructor(transform: Transform, points: Point[] = null, normalize = true) {
    super(transform);
    this.drawPoints = [];
    if (points) {
      if (normalize) {
        const center = points.reduce(function (
          prev: Point,
          curr: Point,
          _: number,
          points: Point[]
        ): Point {
          return new Point(
            prev.x + curr.x / points.length,
            prev.y + curr.y / points.length
          );
        },
        new Point(0, 0));
        this.points = points.map((p) => center.diff(p).multiply(50));
      } else {
        this.points = points;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const absoluteTransform = this.transform;
    this.drawPoints = this.points.map((point) => {
      const drawPoint = new Point(
        this.transform.position.x + point.x * absoluteTransform.scale.x,
        this.transform.position.y + point.y * absoluteTransform.scale.y
      );

      drawPoint.rotateAround(
        new Point(absoluteTransform.position.x, absoluteTransform.position.y),
        this.transform.rotation
      );

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
    this.drawPoints = this.points.map((point) => {
      const drawPoint = new Point(
        this.transform.position.x + point.x * absoluteTransform.scale.x,
        this.transform.position.y + point.y * absoluteTransform.scale.y
      );

      drawPoint.rotateAround(
        new Point(absoluteTransform.position.x, absoluteTransform.position.y),
        this.transform.rotation
      );

      return drawPoint;
    });
    return this.drawPoints;
  }

  getLines() {
    const points = this.getPoints();
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      lines.push({ a: points[i], b: points[(i + 1) % points.length] });
    }
    return lines;
  }

  triangulate() {
    let triangles: Polygon[] = [];
    const remaining_points = [...this.points];
    let prev_remaining_points_len = remaining_points.length;
    while (remaining_points.length > 3) {
      for (let i = 0; i < remaining_points.length; i++) {
        const i1 = i == 0 ? remaining_points.length - 1 : i - 1;
        const i2 = i;
        const i3 = (i + 1) % remaining_points.length;
        const p = [
          remaining_points[i1],
          remaining_points[i2],
          remaining_points[i3],
        ];
        const angle =
          Math.atan2(p[2].y - p[1].y, p[2].x - p[1].x) -
          Math.atan2(p[0].y - p[1].y, p[0].x - p[1].x);
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

    triangles.push(
      new Polygon(
        this.transform,
        [remaining_points[0], remaining_points[1], remaining_points[2]],
        false
      )
    );

    return triangles;
  }

  isPointInside(point: Point): boolean {
    const { x, y } = point;

    let inside = false;
    for (
      let i = 0, j = this.drawPoints.length - 1;
      i < this.drawPoints.length;
      j = i++
    ) {
      const xi = this.drawPoints[i].x,
        yi = this.drawPoints[i].y;
      const xj = this.drawPoints[j].x,
        yj = this.drawPoints[j].y;

      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  isIntersecting(other: Shape): boolean {
    if (!(other instanceof Polygon)) {
      throw "Not implemented";
    }
    const polygon: Polygon = other as Polygon;
    const myLines: Line[] = [];
    for (let i = 0; i < this.drawPoints.length; i++) {
      myLines.push({
        a: this.drawPoints[i],
        b: this.drawPoints[(i + 1) % this.drawPoints.length],
      });
    }
    const polygonLines: Line[] = [];
    for (let i = 0; i < polygon.drawPoints.length; i++) {
      polygonLines.push({
        a: polygon.drawPoints[i],
        b: polygon.drawPoints[(i + 1) % polygon.drawPoints.length],
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

function drawLine(a: Point, b: Point, color: string) {
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

function drawRect(a: Point, size: number, color: string) {
  const prevFillStyle = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.rect(a.x - size / 2, a.y - size / 2, size, size);
  ctx.fill();
  ctx.fillStyle = prevFillStyle;
}

function cyrus_beck(line: Line, shape: Shape): Array<Line> {
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
      if (dot_prod < 0) tE = Math.max(tE, t);
      else tL = Math.min(tL, t);
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
    return [{ a: line.a, b: line.b, o: line.o }];
  }

  const p1 = line.a.add(line.a.diff(line.b).multiply(tE));
  const p2 = line.a.add(line.a.diff(line.b).multiply(tL));

  if (tE == 0 && tL == 1) {
    return [];
  }
  if (tE == 0) {
    return [{ a: p2, b: line.b, o: line.o }];
  } else if (tL == 1) {
    return [{ a: line.a, b: p1, o: line.o }];
  } else {
    return [
      { a: line.a, b: p1, o: line.o },
      { a: p2, b: line.b, o: line.o },
    ];
  }
}

class Rectangle extends Polygon {
  constructor(width: number, height: number, transform: Transform) {
    super(transform);
    this.points = [];
    const hWidth: number = width / 2;
    const hHeight: number = height / 2;
    this.points.push(new Point(-hWidth, +hHeight));
    this.points.push(new Point(+hWidth, +hHeight));
    this.points.push(new Point(+hWidth, -hHeight));
    this.points.push(new Point(-hWidth, -hHeight));
  }
}

class Button extends Rectangle {
  static SIZE = 40;
  glyph: string;
  clickCallback: (...args: any[]) => void;

  constructor(
    transform: Transform,
    glyph: string,
    clickCallback: (...args: any[]) => void
  ) {
    super(Button.SIZE, Button.SIZE, transform);
    this.glyph = glyph;
    this.clickCallback = clickCallback;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.font = `${Button.SIZE * 0.8}px FontAwesome`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillText(
      this.glyph,
      this.transform.position.x,
      this.transform.position.y
    );
  }
}

enum Mode {
  Create,
  Edit,
}

enum EditMode {
  Move,
  Rotate,
  Scale,
  Tabulate,
}

enum CreateMode {
  Square,
  Triangle,
  Arrow,
  Star,
}

let currMode: Mode = Mode.Edit;
let currEditMode: EditMode = EditMode.Move;
let currCreateMode: CreateMode = CreateMode.Square;

const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d");

const shapes: Shape[] = [];

function getSortedShapes() {
  return shapes.sort((a, b) => b.transform.zInd - a.transform.zInd);
}

function getTopShapeAt(point: Point) {
  const shapes = getSortedShapes();
  for (const shape of shapes) {
    if (shape.isPointInside(point)) {
      return shape;
    }
  }
  return null;
}

function getButtonAt(point: Point): Button {
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
  modeButtons.forEach((btn) => (btn.selected = false));
  btn.selected = true;
  draw();
}

const createButton = new Button(
  new Transform(new Point(75, 25), 0, Point.unit),
  "\uF0FE",
  () => setMode(Mode.Create, createButton)
);

const editButton = new Button(
  new Transform(new Point(25, 25), 0, Point.unit),
  "\uF044",
  () => setMode(Mode.Edit, editButton)
);
editButton.selected = true;

function setEditMode(newMode, btn) {
  if (tabulateCandidate) {
    tabulateCandidate.selected = false;
    tabulateCandidate = null;
  }
  currEditMode = newMode;
  editButtons.forEach((btn) => (btn.selected = false));
  btn.selected = true;
  draw();
}

const moveButton = new Button(
  new Transform(new Point(25, 75), 0, Point.unit),
  "\uF047",
  () => setEditMode(EditMode.Move, moveButton)
);
moveButton.selected = true;

const rotateButton = new Button(
  new Transform(new Point(75, 75), 0, Point.unit),
  "\uF021",
  () => setEditMode(EditMode.Rotate, rotateButton)
);

const scaleButton = new Button(
  new Transform(new Point(125, 75), 0, Point.unit),
  "\uF065",
  () => setEditMode(EditMode.Scale, scaleButton)
);

const tabulateButton = new Button(
  new Transform(new Point(175, 75), 0, Point.unit),
  "\uF07D",
  () => setEditMode(EditMode.Tabulate, tabulateButton)
);

function setCreateMode(newMode, btn) {
  currCreateMode = newMode;
  createButtons.forEach((btn) => (btn.selected = false));
  btn.selected = true;
  draw();
}

const squareButton = new Button(
  new Transform(new Point(25, 75), 0, Point.unit),
  "\uF0C8",
  () => setCreateMode(CreateMode.Square, squareButton)
);
squareButton.selected = true;

const triangleButton = new Button(
  new Transform(new Point(75, 75), 0, Point.unit),
  "\uF0D8",
  () => setCreateMode(CreateMode.Triangle, triangleButton)
);

const arrowButton = new Button(
  new Transform(new Point(125, 75), 0, Point.unit),
  "\uF124",
  () => setCreateMode(CreateMode.Arrow, arrowButton)
);

const starButton = new Button(
  new Transform(new Point(175, 75), 0, Point.unit),
  "\uF005",
  () => setCreateMode(CreateMode.Star, starButton)
);

let editShape: Shape = null;
let editPrevPoint: Point = null;

const modeButtons = [createButton, editButton];
const editButtons = [moveButton, rotateButton, scaleButton, tabulateButton];
const createButtons = [squareButton, triangleButton, arrowButton, starButton];

let buttons = [];

let debugMode = false;

function switchDebug() {
  debugMode = !debugMode;
  draw();
}

globalThis.switchDebug = switchDebug;

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
    let visibleLines: Array<Line> = [];//shapes[0].getLines();

    for (let i = 0; i < shapes.length; i++) {
      const subShapes = shapes[i].triangulate();
      for (const subShape of subShapes) {
        if (debugMode) {
          const subShapeLines = subShape.getLines();
          subShapeLines.forEach(line => drawLine(line.a, line.b, "blue"))
        }
        let newVisibleLines: Array<Line> = [];
        for (const visible_line of visibleLines) {
          const line_parts = cyrus_beck(visible_line, subShape)
          newVisibleLines = newVisibleLines.concat(line_parts);
          if (debugMode) {
            for (const line of line_parts) {
              if (line.a != visible_line.a) {
                drawRect(line.a, 5, 'red');
              }
              if (line.b != visible_line.b) {
                drawRect(line.b, 5, 'red');
              }
            }
          }
        }
        visibleLines = newVisibleLines;
      }
      let shapeLines = shapes[i].getLines();
      if (shapes[i].selected) {
        for (const line of shapeLines) {
          line.o = true;
        }
      }
      visibleLines = visibleLines.concat(shapeLines);
    }

    for (const visibleLine of visibleLines) {
      drawLine(visibleLine.a, visibleLine.b, visibleLine.o ? "red" : "black");
    }
  }
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

let tabulateCandidate: Shape = null;

canvas.addEventListener("mousedown", (evt) => {
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
          shapes.push(
            new Polygon(new Transform(clickPoint, 0, Point.unit), [
              new Point(1, -1),
              new Point(1, 1),
              new Point(-1, 1),
              new Point(-1, -1),
            ])
          );
          break;
        case CreateMode.Triangle:
          shapes.push(
            new Polygon(new Transform(clickPoint, 0, Point.unit), [
              new Point(1, 1),
              new Point(-1, 1),
              new Point(0, -1),
            ])
          );
          break;
        case CreateMode.Arrow:
          shapes.push(
            new Polygon(new Transform(clickPoint, 0, Point.unit), [
              new Point(0, -1),
              new Point(2, -2),
              new Point(1, 0),
              new Point(1, -1),
            ])
          );
          break;
        case CreateMode.Star:
          shapes.push(
            new Polygon(
              new Transform(clickPoint, 0, Point.unit),
              [
                new Point(0, -2.5),
                new Point(0.9, -0.5),
                new Point(3, -0.5),
                new Point(1.35, 0.5),
                new Point(2.25, 2.5),
                new Point(0, 1.5),
                new Point(-2.25, 2.5),
                new Point(-1.35, 0.5),
                new Point(-3, -0.5),
                new Point(-0.9, -0.5),
              ].map((p) => p.multiply(0.5))
            )
          );
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

canvas.addEventListener("mousemove", (evt) => {
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

setTimeout(draw, 100);
setTimeout(draw, 500);
setTimeout(draw, 1000);
setTimeout(draw, 3000);
setTimeout(draw, 10000);
