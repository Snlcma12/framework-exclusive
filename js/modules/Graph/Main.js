class Main {
  constructor() {
    this.functions = [];

    this.canMove = false;

    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };

    this.zoomStep = 1.5;

    this.graph = new Graph({
      id: "canvas",
      WIN: this.WIN,
      width: 500,
      height: 500,
      callbacks: {
        wheel: () => this.wheel(),
        mouseUp: () => this.mouseUp(),
        mouseDown: () => this.mouseDown(),
        mouseMove: () => this.mouseMove(),
        mouseLeave: () => this.mouseLeave(),
      },
    });

    this.graph.canvas.addEventListener("wheel", this.wheel);
    this.graph.canvas.addEventListener("mousemove", this.mouseMove);
    this.graph.canvas.addEventListener("mouseleave", this.mouseLeave);
    this.graph.canvas.addEventListener("mouseup", this.mouseUp);
    this.graph.canvas.addEventListener("mousedown", this.mouseDown);

    this.ui = new UI(this.functions, {
      addFunction: (f, num) => this.onAddFunction(f, num),
      deleteFunction: (index) => this.onDeleteFunction(index),
    });
  }

  wheel(event) {
    const delta = event.wheelDelta > 0 ? -this.zoomStep : this.zoomStep;
    this.WIN.WIDTH += delta;
    this.WIN.HEIGHT += delta;
    this.WIN.LEFT -= delta * 0.5;
    this.WIN.BOTTOM -= delta * 0.5;

    this.render();
  }

  mouseUp() {
    this.canMove = false;
  }
  mouseDown() {
    this.canMove = true;
  }

  mouseMove(event) {
    if (this.canMove) {
      this.WIN.LEFT -= this.graph.sx(event.movementX);
      this.WIN.BOTTOM -= this.graph.sy(event.movementY);
      this.render();
    }
  }
  mouseLeave() {
    this.canMove = false;
  }

  onAddFunction(f, num, tan = false) {
    this.functions[num] = {
      f,
      color: "#f00",
      width: 2,
      tangent: tan,
    };
    this.render();
    console.log("onAddFunctiondmvl;sbd");
  }

  onDeleteFunction(index) {
    this.functions.splice(index, 1);
    this.render();
  }

  render() {
    this.graph.clear();
    this.drawAxis();
    this.functions.forEach(
      (func) =>
        func && this.drawFunction(func.f, func.color, func.width, func.tangent)
    );
  }

  drawAxis() {
    // X axis
    this.graph.drawLine(
      this.WIN.LEFT,
      0,
      this.WIN.LEFT + this.WIN.WIDTH,
      0,
      "black"
    );
    this.graph.drawLine(
      this.WIN.BOTTOM,
      0,
      this.WIN.BOTTOM + this.WIN.HEIGHT,
      0,
      "black"
    );

    for (
      let i = Math.ceil(this.WIN.LEFT);
      i < this.WIN.LEFT + this.WIN.WIDTH;
      i++
    )
      this.graph.drawLine(
        i,
        this.WIN.BOTTOM,
        i,
        this.WIN.BOTTOM + this.WIN.HEIGHT,
        "#0003"
      );
    for (let i = Math.floor(this.WIN.LEFT); i > this.WIN.LEFT; i--)
      this.graph.drawLine(
        i,
        this.WIN.BOTTOM,
        i,
        this.WIN.BOTTOM + this.WIN.HEIGHT,
        "#0003"
      );
    for (
      let i = Math.ceil(this.WIN.BOTTOM);
      i < this.WIN.BOTTOM + this.WIN.HEIGHT;
      i++
    )
      this.graph.drawLine(
        this.WIN.LEFT,
        i,
        this.WIN.LEFT + this.WIN.WIDTH,
        i,
        "#0003"
      );
    for (let i = Math.floor(this.WIN.BOTTOM); i > this.WIN.BOTTOM; i--)
      this.graph.drawLine(
        this.WIN.LEFT,
        i,
        this.WIN.LEFT + this.WIN.WIDTH,
        i,
        "#0003"
      );
  }

  drawFunction(f, color, width, tan = false, isDashed = false, n = 200) {
    let x = this.WIN.LEFT;
    const dx = this.WIN.WIDTH / n;

    while (x <= this.WIN.WIDTH + this.WIN.LEFT) {
      const dash = isDashed || Math.abs(f(x + dx) - f(x)) >= this.WIN.HEIGHT;
      this.graph.drawLine(x, f(x), x + dx, f(x + dx), color, width, dash);
      x += dx;
    }
    if (tan) this.drawTangentFunction(f, 1); 
  }

  drawTangentFunction(f, x, dx = 0.001) {
    // y = ax + b
    const a = (f(x + dx) - f(x)) / dx;
    const b = f(x) - a * x;
    let tanF = (x) => a * x + b;

    this.drawFunction(tanF, "blue", 2, true);
  }

  getIntegral(f, a, b, subDiv = 1000) {
    const dx = (b - a) / subDiv;
    let x = a;
    let sum = 0;
    while (x <= b) {
      sum += 0.5 * dx * (Math.abs(f(x)) + Math.abs(f(x + dx)));
    }
    return sum;
  }

  drawIntegral(f, a, b, subDiv = 100) {
    if (a == b) return;

    const dx = (b - a) / subDiv;
    let x = a;
    const points = [{ x, y: 0 }];
    while (x <= b) {
      x += dx;
      points.push({ x, y: f(x) });
    }
    points.push({ x: b, y: 0 });
    this.graph.drawPolygon(points);
  }

  getDimensionsHandle() {
    this.graph.width = window.innerWidth;
    this.graph.height = window.innerHeight;
    render();
  }

  getZero(f, a, b, eps = 0.001) {
    if (f(a) * f(b) > 0) return null;
    if (Math.abs(f(a) - f(b)) <= eps) return (a + b) / 2;
    const half = (a + b) / 2;
    if (f(a) * f(half) <= eps) return this.getZero(f, a, half, eps);
    if (f(half) * f(b) <= eps) return this.getZero(f, half, b, eps);
  }
}
