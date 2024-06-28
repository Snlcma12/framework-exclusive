Surfaces.prototype.Ellipsoid = ( point = new Point(0, 0, 0),
radiusX = 5,
radiusY = 6,
radiusZ = 7,
scale = 1,
color = '#888888',
segments = 25
) => {
    radiusX = Math.abs(radiusX) * scale;
        radiusY = Math.abs(radiusY) * scale;
        radiusZ = Math.abs(radiusZ) * scale;

        const points = [];
        const edges = [];
        const polygons = [];

        for (let i = 0; i <= segments; i++) {
            const phi = (i / segments) * Math.PI;
            const y = point.y - radiusY * Math.cos(phi);

            for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * (2 * Math.PI);
                const x = point.x - radiusX * Math.sin(phi) * Math.cos(theta);
                const z = point.z - radiusZ * Math.sin(phi) * Math.sin(theta);
                points.push(new Point(x, y, z));
            }
        }

        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const p1 = i * (segments + 1) + j;
                const p2 = p1 + 1;
                const p3 = (i + 1) * (segments + 1) + j;
                const p4 = p3 + 1;

                edges.push(new Edge(p1, p2));
                edges.push(new Edge(p2, p4));
                edges.push(new Edge(p4, p3));
                edges.push(new Edge(p3, p1));
                
        
       
        // Определение цвета в шахматном порядке
        const isEven = (i + j) % 2 === 0;
        const col1 = isEven ? '#384aaf' : '#000000';
        const col2 = isEven ? '#000000' : '#384aaf';
        
        // Два треугольника вместо одного квадрата
        polygons.push(new Polygon([p1, p2, p3, p2], col1));
        polygons.push(new Polygon([p2, p4, p3, p1], col2));
        }
        }
    return new Surface(points, edges, polygons);
  };
  