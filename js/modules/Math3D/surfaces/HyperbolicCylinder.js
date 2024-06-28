Surfaces.prototype.HyperbolicCylinder = (
    a = 10, b = 10, segments = 20, color = '#888888', x = 0, y = 0, z = 0
) => {
    const points = [];
    const edges = [];
    const polygons = [];

    // Генерация точек
    for (let i = 0; i <= segments; i++) {
        const T = (Math.PI / segments) * (i - segments / 2);
        for (let j = 0; j <= segments; j++) {
            const p = ((3 * Math.PI) / segments) * j;
            points.push(new Point(b * Math.sinh(T) + x, a * Math.cosh(T) + y, p + z));
            points.push(new Point(b * Math.sinh(T) + x, -a * Math.cosh(T) + y, p + z));
        }
    }

    // Генерация ребер и полигонов
    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < segments; j++) {
            const p1 = i * (segments + 1) * 2 + j * 2;
            const p2 = p1 + 2;
            const p3 = (i + 1) * (segments + 1) * 2 + j * 2;
            const p4 = p3 + 2;

            // Верхняя часть цилиндра
            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p2, p4));
            edges.push(new Edge(p4, p3));
            edges.push(new Edge(p3, p1));
            polygons.push(new Polygon([p1, p2, p4, p3], color));

            // Нижняя часть цилиндра
            edges.push(new Edge(p1 + 1, p2 + 1));
            edges.push(new Edge(p2 + 1, p4 + 1));
            edges.push(new Edge(p4 + 1, p3 + 1));
            edges.push(new Edge(p3 + 1, p1 + 1));
            polygons.push(new Polygon([p1 + 1, p2 + 1, p4 + 1, p3 + 1], color));
        }
    }

    return new Surface(points, edges, polygons);
};
