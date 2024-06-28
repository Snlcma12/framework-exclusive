Template.prototype.shootingTemplate = () =>   
    `<h1>Стрельба по мишеням</h1> 
    <div class="shooting"> 
        <label for="x">Введите 'x': </label> 
        <input class="shootingInput" type="text" id="x"> 
    </div> 
    <div class="shooting"> 
        <label for="y">Введите 'y': </label> 
        <input class="shootingInput" type="text" id="y"> 
    </div> 

    <div class="shooting"> 
        <label for="amount">Количество выстрелов: </label> 
        <input class="shootingInput" type="text" id="amount"> 
    </div> 

    <div> 
        <button class="shoot" onClick="">Выстрел</button> 
    </div> 

    <canvas id="myCanvas"></canvas>

    <div class="result"></div>
    `;
