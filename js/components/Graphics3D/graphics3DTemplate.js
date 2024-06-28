Template.prototype.graphics3DTemplate = () => `
<div class="graphics3d">
    <div class="gp3d">
        <label for="SelectSurface">Выберите:</label>
        <select id="SelectSurface">
            <option value="cube">Куб</option>
            <option value="sphere">Сфера</option>
            <option value="cone">Конус</option>
            <option value="EllipticalParaboloid">Elliptical Paraboloid</option>
            <option value="TwoSheetHyperboloid">Two Sheet Hyperboloid</option>
            <option value="Ellipsoid">Ellipsoid</option>
            <option value="EllipticalCylinder">Elliptical Cylinder</option>
            <option value="HyperbolicCylinder">Hyperbolic Cylinder</option>
            <option value="HyperbolicParaboloid">Hyperbolic Paraboloid</option>
            <option value="OneWayHyperboloid">One Way Hyperboloid</option>
            <option value="ParabolidCylinder">Parabolid Cylinder</option>
            <option value="torus">torus</option>
        </select>
    </div>
    <div class="gp3d">
        <input class='surfaceCustom' data-custom='pointOnly' id="pointOnly" type="checkbox"  />
        <label for="pointOnly">Точки</label>
    </div>
    <div class="gp3d">
        <input class='surfaceCustom' data-custom='edgesOnly' id="edgesOnly" type="checkbox" />
        <label for="edgesOnly">Ребра</label>
    </div>
    <div class="gp3d">
        <input class='surfaceCustom' data-custom='polygonsOnly' id="polygonsOnly" type="checkbox" checked/>
        <label for="polygonsOnly">Полигоны</label>
    </div>
    <div class="gp3d">
        <input class='surfaceCustom' data-custom='color' type="color" id="meshColor" value="#e66465" />
        <label for="meshColor">Color</label>
    </div>
    <div class="gp3d">
    <input id="animationActive" type="checkbox" checked />
    <label for="animationActive">Анимация</label>
    </div>
    <canvas id='graph3D'></canvas>
</div>
`;

