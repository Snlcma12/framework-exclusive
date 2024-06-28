Surfaces.prototype.TwoSheetHyperboloid = (segments = 50, a = 7, b = 6, c = 5, color = '#888888') => {
    const points = [];
    const edges = [];
    const polygons = [];

    // Генерация точек
    const dt = Math.PI * 2 / segments;
    const numRows = Math.floor(Math.PI / dt) + 1;
    const numCols = segments;

    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                a * Math.sinh(i) * Math.cos(j),
                c * Math.cosh(i),
                b * Math.cosh(i) * Math.sin(j)
            ));
        }
    }
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                -a * Math.sinh(i) * Math.cos(j),
                -c * Math.cosh(i),
                -b * Math.cosh(i) * Math.sin(j)
            ));
        }
    }

    // Генерация рёбер и полигонов
    for (let i = 0; i < numRows - 1; i++) {
        for (let j = 0; j < numCols; j++) {
            const p1 = i * numCols + j;
            const p2 = p1 + 1 >= (i + 1) * numCols ? i * numCols : p1 + 1;
            const p3 = (i + 1) * numCols + j;
            const p4 = p3 + 1 >= (i + 2) * numCols ? (i + 1) * numCols : p3 + 1;

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

    for (let i = numRows; i < numRows * 2 - 1; i++) {
        for (let j = 0; j < numCols; j++) {
            const p1 = i * numCols + j;
            const p2 = p1 + 1 >= (i + 1) * numCols ? i * numCols : p1 + 1;
            const p3 = (i + 1) * numCols + j;
            const p4 = p3 + 1 >= (i + 2) * numCols ? (i + 1) * numCols : p3 + 1;

            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p2, p4));
            edges.push(new Edge(p4, p3));
            edges.push(new Edge(p3, p1));

            polygons.push(new Polygon([p1, p2, p4, p3], color));
        }
    }

    return new Surface(points, edges, polygons);
};
