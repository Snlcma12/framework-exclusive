Surfaces.prototype.ParabolidCylinder = (a = 25, b = 10, count = 28, color = '#888888', x = 0, y = 0, z = 0) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i <= count; i++) {
        const T = (i / count) * Math.PI - Math.PI / 2;
        for (let j = 0; j <= count; j++) {
            const p = (j / count) * 3 * Math.PI;
            const px = b * Math.sinh(T) + x;
            const py = a * Math.cosh(T) + y;
            const pz = p * 2 + z;
            points.push(new Point(px, py, pz));
        }
    }

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const p1 = i * (count + 1) + j;
            const p2 = p1 + 1;
            const p3 = (i + 1) * (count + 1) + j;
            const p4 = p3 + 1;

            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p2, p4));
            edges.push(new Edge(p4, p3));
            edges.push(new Edge(p3, p1));
            let col = '#384aaf';

if (i <= 8 && i >= 4 && j >= 4 && j <= 8 && j >= i) (col = '#558800')
if (i <= 4 && i >= 0 && j >= 4 && j <= 8 && j >= 8 - i) (col = '#414461')
if (i <= 4 && i >= 0 && j >= 8 && j <= 10 && j <= i + 8) (col = '#7927b1')
if (i <= 8 && i >= 4 && j >= 8 && j <= 10 && j <= 16 - i) (col = '#d62f2f')

polygons.push(new Polygon([p1, p2, p4, p3], col));
        }
    }

    return new Surface(points, edges, polygons);
};

  