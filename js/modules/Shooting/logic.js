function shotToCenter(x, y, x0, y0, points) {
  x0 = x0 || 0;
  y0 = y0 || 0;
  points = points || 10;
  return (x === x0 && y === y0) ? points : 0;
}

function shotToRomb(x, y, x0, y0, radius, points) {
  x0 = x0 || 0;
  y0 = y0 || 0;
  radius = radius || 1;
  points = points || 3;

  return Math.abs(x - x0) + Math.abs(y - y0) < radius ? points : 0;
}

function shotToCircle(x, y, x0, y0, radius, points) {
  x0 = x0 || 0;
  y0 = y0 || 0;
  radius = radius || 1;
  points = points || 2;

  return (x - x0) ** 2 + (y - y0) ** 2 < radius ? points : 0;
}

function shotToStar(x, y, x0, y0, radius, points) {
  x0 = x0 || 0;
  y0 = y0 || 0;
  radius = radius || 1;
  points = points || 4;

  return Math.pow(x - x0, 2 / 3) + Math.pow(y - y0, 2 / 3) < radius ? points : 0;
}

function shotToSquare(x, y, x0, y0, radius, points) {
  x0 = xo || 0;
  y0 = yo || 0;
  radius = radius || 1;
  points = points || 1;
  return (x - x0) ** 2 + (y - y0) ** 2 > radius && Math.abs(x - x0) < raduis && Math.abs(y - y0) < radius ? points : 0;
}

function shotToTarget(params) {
  if (!isNaN(x) && !isNaN(y)) {
      if (params) {
          var x = params.x;
          var y = params.y;
          var x0 = params.x0;
          var y0 = params.y0;
          var r = params.r;
          var star = params.starPoints;
          var center = params.center;
          var romb = params.romb;
          var n = params.n;
          var customShots =  params.customShots || [];
          var circle = params.circle;
          var square = params.square;
      }
      return shotToCenter(x, y, x0, y0, r, center, -1) ||
      shotToStar(x, y, x0, y0, r, star, -2) ||
      shotToRomb(x, y, x0, y0, r, romb, -3) ||
      shotToCircle(x, y, x0, y0, r, circle, -4) ||
      shotToSquare(x, y, x0, y0, r, square, -5)
  }
  return 0;
}

function shots(params) {
  var result = {
      score: 0,
      accuracy: 0
  };
  if (params) {
      var n = params.n;
      var D = params.D || 2;
      if (!isNaN(n) && n > 0) {
          for (var i = 0; i < n; i++) {
              var x = Math.random() * D - D / 2;
              var y = Math.random() * D - D / 2;
              var points = shotToTarget(x, y, params);
              result.score += points;
              result.accuracy += points ? 1 / n : 0;
          }
      }
      if (customShots.length) {
          for (var i = 0; i < customShots.length; i++) {
              var x = customShots[i].x;
              var y = customShots[i].y;
              var points = shotToTarget(params);
              result.score += points;
              result.accuracy += points ?
                  1 / customShots.length :
                  0;
          }
      }
  }
  return result;
}

var params = {
  n: 39,
  customShots: [
    { x: -1, y: 0.5 },
    { x: 1, y: 1 },
  ],
  D: 4,
  x: 0,
  y: 0,
  x0: 0,
  y0: 0,
  radius: 1,
  starPoints: 4,
  rombPoints: 3,
  circlePoints: 2,
  squarePoints: 1,
  centerPoints: 100,
}
