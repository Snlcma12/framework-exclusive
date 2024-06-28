Surfaces.prototype.HyperbolicParaboloid = (p = 3, q = 4, count = 10, color = "#ffff00", x = 0, y = 0, z = 0) => {
    const points = [];
    const edges = [];
    const polygons = [];

    // Создаем точки поверхности
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x1 = i - count / 2;
            const y1 = j - count / 2;
            const z1 = ((x1 * x1) / p - (y1 * y1) / q) / 2;
            points.push(new Point(x1 + x, z1 + y, y1 + z));
        }
    }

    // Создаем рёбра и полигоны поверхности
    for (let i = 0; i < count - 1; i++) {
        for (let j = 0; j < count - 1; j++) {
            const p1 = i * count + j;
            const p2 = p1 + 1;
            const p3 = (i + 1) * count + j;
            const p4 = p3 + 1;

            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p1, p3));

            let col = '#384aaf';
            if (i >= 4 && i <= 8 && j >= 4 && j <= 8 && j >= i) col = '#558800';
            if (i <= 4 && i >= 0 && j >= 4 && j <= 8 && j >= 8 - i) col = '#414461';
            if (i <= 4 && i >= 0 && j >= 8 && j <= 10 && j <= i + 8) col = '#7927b1';
            if (i >= 4 && i <= 8 && j >= 8 && j <= 10 && j <= 16 - i) col = '#d62f2f';

            polygons.push(new Polygon([p1, p2, p4, p3], col));
        }
    }

    return new Surface(points, edges, polygons);
};
