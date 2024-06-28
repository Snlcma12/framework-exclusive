function Graph({ id, width, height, WIN, callbacks = null }) {
  let canvas;
  if (id) {
    canvas = document.getElementById(id);
  } else {
    canvas = document.createElement("canvas");
    document.querySelector("body").appendChild(canvas);
  }
  canvas.width = width || 700;
  canvas.height = height || 500;
  const ctx = canvas.getContext("2d");

  const { wheel, mouseMove, mouseLeave, mouseUp, mouseDown } = callbacks;
  canvas.addEventListener("wheel", wheel);
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mouseleave", mouseLeave);
  canvas.addEventListener("mouseup", mouseUp);
  canvas.addEventListener("mousedown", mouseDown);

  this.sx = (x) => (x * WIN.WIDTH) / canvas.width;
  this.sy = (y) => (-y * WIN.HEIGHT) / canvas.height;

  this.xs = (x) => ((x - WIN.LEFT) / WIN.WIDTH) * canvas.width;
  this.ys = (y) =>
    canvas.height - ((y - WIN.BOTTOM) / WIN.HEIGHT) * canvas.height;

  this.clear = function () {
    ctx.fillStyle = "#ffe";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  this.drawLine = function (x1, y1, x2, y2, color, width, isDash) {
    ctx.beginPath();

    ctx.strokeStyle = isDash ? "#ff0" : color;
    ctx.lineWidth = width || 1;
    if (isDash) {
      ctx.setLineDash([5, 15]);
    } else {
      ctx.setLineDash([]);
    }

    ctx.moveTo(this.xs(x1), this.ys(y1));
    ctx.lineTo(this.xs(x2), this.ys(y2));
    ctx.stroke();

    ctx.closePath();
  };

  this.drawPolygon = function (points, color = "#f805") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.xs(points[0].x), this.ys(points[0].y));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(this.xs(points[i].x), this.ys(points[i].y));
    }
    ctx.lineTo(this.xs(points[0].x), this.ys(points[0].y));
    ctx.closePath();
    ctx.fill();
  };

  this.drawPoint = function (x, y, color, radius) {
    ctx.beginPath();
    ctx.strokeStyle = color || "#f00";
    ctx.arc(this.xs(x), this.ys(y), radius || 2, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  };

  this.drawText = function (text, x, y, color) {
    ctx.fillStyle = color || "#000";
    ctx.font = "20px Arial";
    ctx.fillText(text, this.xs(x), this.ys(y));
  };
}
