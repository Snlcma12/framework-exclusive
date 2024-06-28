Surfaces.prototype.EllipticalCylinder = (r = 1,  h = 5, count = 25, color = "ff0000", x = 0, y = 0, z = 0, R = 1) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i < count; i++) {
        const T = ((2 * Math.PI) / count) * i;
        for (let j = -count / 2; j < count / 2; j++) {
            const p = (h / count) * j;
            points.push(new Point(r * Math.cos(T) + x, p + y, r * Math.sin(T) + z));
        }
    }

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count - 1; j++) {
            const p1 = i * count + j;
            const p2 = p1 + 1;
            const p3 = ((i + 1) % count) * count + j;
            const p4 = p3 + 1;

            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p1, p3));

            let col = '#228B22';

            if (i <= 5   && j == 10) (col = '#FF8C00')
            if (i == 0   && j == 9) (col = '#FF8C00')
            if (i <= 5 && i > 4   && j == 9) (col = '#FF8C00')
            if (j  <= 14 && j > 10   && i == 1) (col = '#FF8C00')
            if (j  <= 15 && j > 10   && i == 4) (col = '#FF8C00')
            if (i <= 3  && i > 1  && j == 15) (col = '#FF8C00')

            if (i <= 10 && i > 7   && j == 9) (col = '#FF8C00')
            if (j  <= 11 && j > 9   && i == 7) (col = '#FF8C00')
            if (i <= 10 && i > 7   && j == 12) (col = '#FF8C00')
            if (j  <= 13 && j > 8   && i == 11) (col = '#FF8C00')
            if (i <= 10 && i > 7   && j == 14) (col = '#FF8C00')

            polygons.push(new Polygon([p1, p2, p4, p3], col));
        }
    }

    return new Surface(points, edges, polygons);
};
