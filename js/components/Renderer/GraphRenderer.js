class GraphRenderer extends Component {
  constructor(props) {
    super(props);
    const WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    };

    const functions = [];

    let canMove = false;
    const zoomStep = 1.2;

    function mouseUp() {
      canMove = false;
    }
    function mouseDown() {
      canMove = true;
    }
    function mouseLeave() {
      canMove = false;
    }
    function mouseMove(event) {
      if (canMove) {
        WIN.LEFT -= graph.sx(event.movementX);
        WIN.BOTTOM -= graph.sy(event.movementY);
        render();
      }
    }

    const graph = new Graph({
      id: "graphCanvas",
      width: 600,
      height: 600,
      WIN: WIN,
      callbacks: { wheel, mouseUp, mouseDown, mouseMove, mouseLeave },
    });

    document.querySelector("canvas").onwheel = wheel;
    window.addEventListener("resize", getDimensionsHandle);

    const ui = new UI(functions, {
      addFunction: (f, index) => onAddFunction(f, index),
      deleteFunction: (index) => onDeleteFunction(index),
    });

    function wheel(event) {
      const delta = event.wheelDelta > 0 ? -zoomStep : zoomStep;
      WIN.WIDTH += delta;
      WIN.HEIGHT += delta;
      WIN.LEFT -= delta * 0.5;
      WIN.BOTTOM -= delta * 0.5;

      render();
    }

    onAddFunction = function (f, index, tan = false) {
      let child = document
        .getElementById("functionList")
        .appendChild(document.createElement("div"))
        .appendChild(document.createElement("input"));
      child.classList.add("funcInput");
    };

    document.getElementById("applyFuncs").addEventListener("click", () => {
      let funcList = document.getElementById("functionList").children;

      for (let i = 0; i < funcList.length; i++) {
        let children = funcList[i].children;
        functions[i] = {
          f: (x) => eval(children[0].value),
          color: "#f00",
          width: 2,
          tangent: false,
        };
      }

      render();
    });

    function onDeleteFunction(index) {
      functions.splice(index, 1);
      render();
    }

    function render() {
      graph.clear();
      drawAxis();
      functions.forEach(
        (func) =>
          func && drawFunction(func.f, func.color, func.width, func.tangent)
      );
    }

    function drawAxis() {
      graph.drawLine(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0, "black");
      graph.drawLine(
        WIN.WIDTH + WIN.LEFT,
        0,
        WIN.WIDTH + WIN.LEFT - WIN.WIDTH / 30,
        WIN.HEIGHT / 80
      );
      graph.drawLine(
        WIN.WIDTH + WIN.LEFT - WIN.WIDTH / 30,
        -WIN.HEIGHT / 80,
        WIN.WIDTH + WIN.LEFT,
        0
      );
      graph.drawLine(0, WIN.BOTTOM, 0, WIN.BOTTOM + WIN.HEIGHT, "black");
      graph.drawLine(
        0,
        WIN.HEIGHT + WIN.BOTTOM,
        WIN.WIDTH / 80,
        WIN.HEIGHT + WIN.BOTTOM - WIN.HEIGHT / 30
      );
      graph.drawLine(
        -WIN.WIDTH / 80,
        WIN.HEIGHT + WIN.BOTTOM - WIN.HEIGHT / 30,
        0,
        WIN.HEIGHT + WIN.BOTTOM
      );

      for (let i = Math.ceil(WIN.LEFT); i < WIN.LEFT + WIN.WIDTH; i++)
        graph.drawLine(i, WIN.BOTTOM, i, WIN.BOTTOM + WIN.HEIGHT, "#0003");
      for (let i = Math.floor(WIN.LEFT); i > WIN.LEFT; i--)
        graph.drawLine(i, WIN.BOTTOM, i, WIN.BOTTOM + WIN.HEIGHT, "#0003");
      for (let i = Math.ceil(WIN.BOTTOM); i < WIN.BOTTOM + WIN.HEIGHT; i++)
        graph.drawLine(WIN.LEFT, i, WIN.LEFT + WIN.WIDTH, i, "#0003");
      for (let i = Math.floor(WIN.BOTTOM); i > WIN.BOTTOM; i--)
        graph.drawLine(WIN.LEFT, i, WIN.LEFT + WIN.WIDTH, i, "#0003");

      console.log("draw Axis");
    }

    function drawFunction(
      f,
      color,
      width,
      tan = false,
      isDashed = false,
      n = 200
    ) {
      let x = WIN.LEFT;
      const dx = WIN.WIDTH / n;

      while (x <= WIN.WIDTH + WIN.LEFT) {
        const dash = isDashed || Math.abs(f(x + dx) - f(x)) >= WIN.HEIGHT;
        graph.drawLine(x, f(x), x + dx, f(x + dx), color, width, dash);
        x += dx;
      }
      if (tan) drawTangentFunction(f, 1); 
    }

    function drawTangentFunction(f, x, dx = 0.001) {
      const a = (f(x + dx) - f(x)) / dx;
      const b = f(x) - a * x;
      let tanF = (x) => a * x + b;

      drawFunction(tanF, "blue", 2, true);
    }

    function getIntegral(f, a, b, subDiv = 1000) {
      const dx = (b - a) / subDiv;
      let x = a;
      let sum = 0;
      while (x <= b) {
        sum += 0.5 * dx * (Math.abs(f(x)) + Math.abs(f(x + dx)));
      }
      return sum;
    }

    function drawIntegral(f, a, b, subDiv = 100) {
      if (a == b) return;

      const dx = (b - a) / subDiv;
      let x = a;
      const points = [{ x, y: 0 }];
      while (x <= b) {
        x += dx;
        points.push({ x, y: f(x) });
      }
      points.push({ x: b, y: 0 });
      graph.drawPolygon(points);
    }

    function getDimensionsHandle() {
      graph.width = window.innerWidth;
      graph.height = window.innerHeight;
      render();
    }

    function getZero(f, a, b, eps = 0.001) {
      if (f(a) * f(b) > 0) return null;
      if (Math.abs(f(a) - f(b)) <= eps) return (a + b) / 2;
      const half = (a + b) / 2;
      if (f(a) * f(half) <= eps) return getZero(f, a, half, eps);
      if (f(half) * f(b) <= eps) return getZero(f, half, b, eps);
    }

    document
      .getElementById("checkBox")
      .addEventListener("click", function (event) {
        console.log(event.target.checked);
      });

    render();
    console.log("after render");
  }
  addEventListener() {}
}
