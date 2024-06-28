import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class Sphere extends Surface {
    constructor({
        R = 10, count = 20, name = "МИША"
    }) {
        super();
        
        const points = [];
const edges = [];
const polygons = [];

// точки
const dt = Math.PI * 2 / count;
for (let i = 0; i <= Math.PI; i += dt) {
for (let j = 0; j < Math.PI * 2; j += dt) {
points.push(new Point(
R * Math.cos(j) * Math.sin(i),
R * Math.cos(i),
R * Math.sin(j) * Math.sin(i),
));
}
}

// ребра
for (let i = 0; i < points.length; i++) {
// вдоль
if (i + 1 < points.length && (i + 1) % count !== 0) {
edges.push(new Edge(
i,
i + 1
));
} else if ((i + 1) % count === 0) {
edges.push(new Edge(
i,
i + 1 - count
));
}
// поперек
if (i < points.length - count) {
edges.push(new Edge(
i,
i + count
));
}
}

// Полигоны
for (let i = 0; i < points.length; i++) {
let color = '#FFFFFF';


const row = Math.floor(i / count);
const col = i % count;


const charIndex = Math.floor(col / 6);
const char = name[charIndex];
const pattern = getCharPattern(char);


const offsetRow = row - 2;


if (char && offsetRow >= 0 && offsetRow < 5 && (col % 6) < 5) {
if (pattern[offsetRow][col % 6] === 'X') {
color = '#000000';
}
}

if (i + 1 + count < points.length && (i + 1) % count !== 0) {
polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
} else if (i + count < points.length && (i + 1) % count === 0) {
polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
}
}

this.points = points; 
        this.edges = edges; 
        this.polygons = polygons;
        this.bulge = true;
    }
}
// @ts-ignore
function getCharPattern(char) {
const patterns = {
'М': [
' ',
'XX XX',
'X X X',
'X X',
'X X'
],
'И': [
' ',
'X X',
'X XX',
'XX X',
'X X'
],
'Ш': [
' ',
'X X X',
'X X X',
'X X X',
'XXXXX'
],
'А': [
' ',
' XX ',
'X X',
'XXXX',
'X X'
]
};
//@ts-ignore

return patterns[char] || [' ', ' ', ' ', ' ', ' '];
}
      

export default Sphere;