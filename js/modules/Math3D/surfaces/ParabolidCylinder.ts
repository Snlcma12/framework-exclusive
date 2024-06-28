import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class ParabalidCylinder extends Surface {
    constructor({
        a = 25, b = 10, count = 28, color = "lightgreen", x = 0, y = 0, z = 0
    } = {}) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        for (let i = -count / 2; i <= count / 2; i++) {
            const T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(b * Math.sinh(T) + x, a * Math.cosh(T) + y, p * 2 + z));
            }
        }

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
        for (let i = 0; i < points.length; i++) {
            if (i + count + 1 < points.length && (i + 1) % count != 0) {
                const opacity = 1 - Math.abs(i % count - count / 2) / (count / 2); // Увеличение прозрачности к краям
                //@ts-ignore
                polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color, opacity));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default ParabalidCylinder;
