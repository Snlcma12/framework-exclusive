class Math3D {
  constructor(WIN) {
    this.WIN = WIN;
  }

  xs(point) {
    const zs = this.WIN.CENTER.z;
    const z0 = this.WIN.CAMERA.z;
    const x0 = this.WIN.CAMERA.x;
    return ((point.x - x0) / (point.z - z0)) * (zs - z0) + x0;
  }

  ys(point) {
    const zs = this.WIN.CENTER.z;
    const z0 = this.WIN.CAMERA.z;
    const y0 = this.WIN.CAMERA.y;
    return ((point.y - y0) / (point.z - z0)) * (zs - z0) + y0;
  }

  multMatrix(T1, T2) {
    const result = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i][j] = 0;
        for (let k = 0; k < 4; k++) {
          result[i][j] += T1[i][k] * T2[k][j];
        }
      }
    }
    return result;
  }

  multPoint(T, m) {
    const a = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      let b = 0;
      for (let j = 0; j < 4; j++) {
        b += T[j][i] * m[j];
      }
      a[i] = b;
    }
    return a;
  }

  zoom(delta) {
    return [
      [delta, 0, 0, 0],
      [0, delta, 0, 0],
      [0, 0, delta, 0],
      [0, 0, 0, 1]
    ];
  }

  move(dx, dy, dz) {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [dx, dy, dz, 1]
    ];
  }

  rotateOx(alpha) {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(alpha), Math.sin(alpha), 0],
      [0, -Math.sin(alpha), Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  rotateOy(alpha) {
    return [
      [Math.cos(alpha), 0, -Math.sin(alpha), 0],
      [0, 1, 0, 0],
      [Math.sin(alpha), 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  rotateOz(alpha) {
    return [
      [Math.cos(alpha), Math.sin(alpha), 0, 0],
      [-Math.sin(alpha), Math.cos(alpha), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  transform(matrix, point){
    const result = this.multPoint(matrix, [point.x, point.y, point.z, 1]);
    point.x = result[0];
    point.y = result[1];
    point.z = result[2];
   }	
   
   getTransform(...args){
    return args.reduce(
      (s,t) => this.multMatrix(s,t),
      [[1,0,0,0],
      [0,1,0,0],
      [0,0,1,0],
      [0,0,0,1]]
    );	
  }

  getVector(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y,
      z: b.z - a.z,
  
    }
  }

  multVector(a, b) {
    return {
        x: a.y * b.z - a.z * b.y,
        y: -a.x * b.z + a.z * b.x,
        z: a.x * b.y - a.y * b.x
    }
}

moduleVector(a) {
    return Math.sqrt( a.x**2 + a.y**2 + a.z**2 );
}

calcCenter(surface) {
  surface.polygons.forEach(polygon => {
      const x = polygon.points.reduce((sum, index) => sum + surface.points[index].x, 0) / 4;
      const y = polygon.points.reduce((sum, index) => sum + surface.points[index].y, 0) / 4;
      const z = polygon.points.reduce((sum, index) => sum + surface.points[index].z, 0) / 4;
      polygon.center = new Point(x, y, z);
  });
}

calcRadius(surface) {
  const points = surface.points;
  surface.polygons.forEach(polygon => {
      const center = polygon.center;
      const p1 = points[polygon.points[0]];
      const p2 = points[polygon.points[1]];
      const p3 = points[polygon.points[2]];
      const p4 = points[polygon.points[3]];
      polygon.R = (this.moduleVector(this.getVector(center, p1))
              + this.moduleVector(this.getVector(center, p2))
              + this.moduleVector(this.getVector(center, p3))
              + this.moduleVector(this.getVector(center, p4)))
          /4;
  });
}


calcShadow(polygon, scene, LIGHT) {
  const result = {isShadow:false};
  const m1 = polygon.center;
  const r = polygon.R;
  const S = this.getVector(m1, LIGHT);
  scene.forEach( (surface, index) => {
      if (polygon.index === index) 
         return;
      surface.polygons.forEach( polygon2 => {
          const m0 = polygon2.center;
          if (m1.x === m0.x && m1.y === m0.y && m1.z === m0.z) return;
          if (polygon2.lumen >= polygon.lumen) return;
          const dark = this.moduleVector(
              this.multVector(
                  this.getVector(m0, m1),
                  S)) / this.moduleVector(S);

          if (dark < r) {
              result.isShadow = true;
              result.dark = dark / 1.3;
          }
      } );
  } );
  return result;
}



  

  calcDistance(surface, endPoint, name) {
    surface.polygons.forEach((polygon) => {
      let x = 0, y = 0, z = 0;
      polygon.points.forEach((index) => {
        x += surface.points[index].x;
        y += surface.points[index].y;
        z += surface.points[index].z;
      });
      x /= polygon.points.length;
      y /= polygon.points.length;
      z /= polygon.points.length;
      polygon[name] = Math.sqrt(
        (endPoint.x - x) ** 2 +
        (endPoint.y - y) ** 2 +
        (endPoint.z - z) ** 2
      );
    });
  }

  sortByArtistAlgorithm(polygons) {
    polygons.sort((a, b) => b.distance - a.distance);
  }

  calcIllumination(distance, lumen) {
    const illum = distance ? lumen / distance ** 2 : 1;
    return illum > 1 ? 1 : illum; 
  }
}

