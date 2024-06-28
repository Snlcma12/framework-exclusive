Surfaces.prototype.sphere = (point = new Point(0, 0, 0), radius = 7.5, scale = 1, color = '#888888', segments = 50, x = 0, y = 0) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI;
        const y = point.y + radius * Math.cos(phi);

        for (let j = 0; j <= segments; j++) {
            const theta = (j / segments) * (2 * Math.PI);
            const x = point.x + radius * Math.sin(phi) * Math.cos(theta);
            const z = point.z + radius * Math.sin(phi) * Math.sin(theta);
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
            let col = '#384aaf';

            if (j <= 15 && i == 12 ) (col = '#000000')
            if (j <= 15 && i == 11 ) (col = '#000000')
            if (j <= 15 && i == 10 ) (col = '#000000')

            if (j <= 15 && i == 13 ) (col = '#000000')
            if (j <= 15 && i == 14 ) (col = '#000000')
            if (j <= 15 && i == 15 ) (col = '#000000')
        
            if (j <= 14 && j > 0 && i == 9 ) (col = '#000000')
            if (j <= 14 && j > 0 && i == 8 ) (col = '#000000')

            if (j <= 13 && j > 1 && i == 7) (col = '#000000')
            if (j <= 12 && j > 2 && i == 6) (col = '#000000')

            if (j <= 10 && j > 5 && i == 5) (col = '#000000')

            if (j <= 14 && j > 0 && i == 16 ) (col = '#000000')
            if (j <= 14 && j > 0 && i == 17 ) (col = '#000000')

            if (j <= 13 && j > 1 && i == 18) (col = '#000000')
            if (j <= 12 && j > 2 && i == 19) (col = '#000000')

            if (j <= 10 && j > 5 && i == 20) (col = '#000000')

            if (j <= 12 && j > 11 && i == 7) (col = '#FFFFFF')
            if (j <= 8 && j > 6 && i == 8 ) (col = '#FFFFFF')
            if (j <= 8 && j > 6 && i == 9 ) (col = '#FFFFFF')

            if (j <= 13 && j > 11 && i == 8 ) (col = '#FFFFFF')
            if (j <= 13 && j > 11 && i == 9 ) (col = '#FFFFFF')
            if (j <= 14 && j > 11 && i == 10 ) (col = '#FFFFFF')
            if (j <= 14 && j > 10 && i == 11 ) (col = '#FFFFFF')
            if (j <= 14 && j > 9 && i == 12 ) (col = '#FFFFFF')
            if (j <= 14 && j > 8 && i == 13 ) (col = '#FFFFFF')
            if (j <= 14 && j > 4 && i == 14 ) (col = '#FFFFFF')
            if (j <= 14 && j > 3 && i == 15 ) (col = '#FFFFFF')
            if (j <= 13 && j > 3 && i == 16 ) (col = '#FFFFFF')
            if (j <= 13 && j > 3 && i == 17 ) (col = '#FFFFFF')
            if (j <= 12 && j > 4 && i == 18 ) (col = '#FFFFFF')
            if (j <= 11 && j > 6 && i == 19 ) (col = '#FFFFFF')

            if (j <= 9 && j > 7 && i == 16 ) (col = '#000000')
            if (j <= 9 && j > 7 && i == 17 ) (col = '#000000')

            








            polygons.push(new Polygon([p1, p2, p4, p3], col));
        }
    }
  
    return new Surface(points, edges, polygons);
  };
  