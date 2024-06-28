Surfaces.prototype.cone = (r = 2, count = 25, color = '#888888', x = 0, y = 0, z = 0) => {
    const points = [];
    const edges = [];
    const polygons = [];
    
    // Points
    for (let i = -count; i <= count; i++) {
        const T = ((2 * Math.PI) / count) * i;
        for (let j = 0; j < count; j++) {
            const p = ((2 * Math.PI) / count) * j;
            points.push(new Point(r * T * Math.cos(p) + x, r * T + y, Math.sin(p) * r * T + z));
        }
    }

    // Edges
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        if (i < points.length - count) {
            edges.push(new Edge(i, i + count));
        }
    }

    // Polygons
    for (let i = 0; i < count * (count * 2 + 1); i++) {
        for (let j = 0; j < count; j++) {
            const p1 = i * count + j;
            const p2 = p1 + 1;
            const p3 = p1 + count;
            const p4 = p3 + 1;
            let col = '#384aaf';

            if (j < count - 1 && i < count * 2) {
                if (j >= 0 && i == 0) (col = '#558800')
                polygons.push(new Polygon([p1, p2, p4, p3], col));
            } else if (j === count - 1 && i < count * 2) {
                if (j >= 0 && i == 0) (col = '#558800')
                polygons.push(new Polygon([p1, p1 + 1 - count, p1 + 1, p3], col));
            }
        }
    }

    return new Surface(points, edges, polygons);
};
