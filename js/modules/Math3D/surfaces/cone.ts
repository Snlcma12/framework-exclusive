import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class Cone extends Surface {
    constructor({
        r = 2, count = 8, color1 = '#FF0000', color2 = '#FF4500', x = 0, y = 0, z = 0
    } = {}) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        const colors = [color1, color2];

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
        //@ts-ignore
        const color = points[p].color;
        for (let i = 0; i < points.length; i++) {
            
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                // @ts-ignore
                const nextColor = points[p + 1].color;
                // @ts-ignore
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], [color, nextColor]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                // @ts-ignore
                const nextColor = points[p + 1 - count].color;
                // @ts-ignore
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], [color, nextColor]));
            }
        }
        
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
    }

    
}

export default Cone;
