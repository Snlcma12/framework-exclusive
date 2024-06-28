Surfaces.prototype.EllipticalParaboloid = (count = 20, a = 7, b = 4, color = '#888888') => {
    const points = [];
    const edges = [];
    const polygons = [];

    // Создаем точки
    const dt = Math.PI * 2 / count;
    for (let i = 0; i <= count; i++) {
        const t = i / count * Math.PI;
        for (let j = 0; j <= count; j++) {
            const p = j * dt;
            points.push(new Point(
                a * t * Math.cos(p),
                t * t,
                b * t * Math.sin(p)
            ));
        }
    }

    // Создаем ребра и полигоны
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const p1 = i * (count + 1) + j;
            const p2 = p1 + 1;
            const p3 = (i + 1) * (count + 1) + j;
            const p4 = p3 + 1;

            // Создаем ребра
            edges.push(new Edge(p1, p2));
            edges.push(new Edge(p1, p3));

            // Создаем полигоны
            let col = color;

            if (i <= 8 && i >= 4 && j >= 4 && j <= 8 && j >= i) col = '#558800';
            if (i <= 4 && i >= 0 && j >= 4 && j <= 8 && j >= 8 - i) col = '#414461';
            if (i <= 4 && i >= 0 && j >= 8 && j <= 10 && j <= i + 8) col = '#7927b1';
            if (i <= 8 && i >= 4 && j >= 8 && j <= 10 && j <= 16 - i) col = '#d62f2f';

            polygons.push(new Polygon([p1, p2, p4, p3], col));
        }
    }

    // Добавляем последние ребра для замыкания по высоте
    for (let i = 0; i < count; i++) {
        const p1 = i * (count + 1) + count;
        const p2 = (i + 1) * (count + 1) + count;
        edges.push(new Edge(p1, p2));
    }

    // Добавляем последние ребра для замыкания по окружности
    for (let j = 0; j < count; j++) {
        const p1 = count * (count + 1) + j;
        const p2 = p1 + 1;
        edges.push(new Edge(p1, p2));
    }

    return new Surface(points, edges, polygons);
};
