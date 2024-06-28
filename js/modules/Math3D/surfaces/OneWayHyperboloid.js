Surfaces.prototype.OneWayHyperboloid = (
    point = new Point(0, 0, 0),
    color = '#384aaf',
    scale = 3,
    thetaSegments = 25,
    vSegments = 25,
    thetaMax = Math.PI, // параметр ширины
    vMax = 2, // параметр высоты
    a = 1,
    b = 1,
    c = 1,
    R = 1
) => {
    const dtheta = (thetaMax * 2) / thetaSegments;
    const dv = (vMax * 2) / vSegments;
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i <= thetaSegments; i++) {
        const theta = -thetaMax + i * dtheta;
        for (let j = 0; j <= vSegments; j++) {
            const v = -vMax + j * dv;
            const x = point.x + a * Math.cosh(v) * Math.cos(theta) * scale;
            const y = point.y + b * Math.cosh(v) * Math.sin(theta) * scale;
            const z = point.z + c * Math.sinh(v) * scale;
            points.push(new Point(x, z, y));
        }
    }

    // ребра по ширине
    for (let i = 0; i <= thetaSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
            const p1 = j + i * (vSegments + 1);
            const p2 = p1 + 1;
            edges.push(new Edge(p1, p2));
        }
    }

    // ребра по длине
    for (let i = 0; i <= vSegments; i++) {
        for (let j = 0; j < thetaSegments; j++) {
            const p1 = i + j * (vSegments + 1);
            const p2 = p1 + vSegments + 1;
            edges.push(new Edge(p1, p2));
        }
    }

    // полигоны
    for (let i = 0; i < thetaSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
        const p1 = j + i * (vSegments + 1);
        const p2 = p1 + 1;
        const p3 = p1 + vSegments + 1;
        const p4 = p3 + 1;
        
        if (j < vSegments && i < thetaSegments) {
        // Определение цвета в шахматном порядке
        const isEven = (i + j) % 2 === 0;
        const col1 = isEven ? '#384aaf' : '#000000';
        const col2 = isEven ? '#000000' : '#384aaf';
        
        // Два треугольника вместо одного квадрата
        polygons.push(new Polygon([p1, p2, p3, p1], col1));
        polygons.push(new Polygon([p2, p4, p3, p2], col2));
        }
        }
        }
        

    return new Surface(points, edges, polygons);
};
