function isGameOver() {
  return student.life <= 0 ||
      Rooms[roomId].actions.length === 0;
}

function restart() {
  document.getElementById('studentLife').innerHTML = "Вы умерли";
  var button = document.createElement('button');
  button.innerHTML = 'Ещё разок или зассал?';
  button.className = 'red-button';
  button.addEventListener('click', function () {
      roomId = 'start';
      student.life = 100;
      student.items.protein = 0;
      student.items.vodka = 0;
      student.items.money = 100;
      goToRoom();
  });
  document.getElementById('actions').appendChild(button);
}

function goToRoom() {
  var room = Rooms[roomId];


  document.getElementById('roomTitle').innerHTML = room.title;
  document.getElementById('roomDescription')
      .innerHTML = room.description;
  document.getElementById('studentLife').innerHTML = "Здоровье:" + student.life;
  document.getElementById('eat').innerHTML = "Еды в кармане:" + student.items.protein;
  document.getElementById('money').innerHTML = "Монет в кармане: " + student.items.money;
  document.getElementById('roomImage').src = room.img;
  document.getElementById('actions').innerHTML = '';
  if (isGameOver()) {
      restart();
      return;
  }
  // сгенерировать переходы по комнатам
  for (var i = 0; i < room.actions.length; i++) {
      (function (i) {
          var action = room.actions[i];
          var button = document.createElement('button');
          button.innerHTML = action.title;
          button.className = 'green-button';
          button.addEventListener('click', function () {
              roomId = action.id;
              if (action.eats) {
                  student.items.protein += action.eats;
                  action.eats = 0;
              }
              if (action.damage) {
                  student.life += action.damage === 'random' ?
                      Math.trunc(Math.random() * 200 - 100) :
                      action.damage;
              }
              goToRoom();
          });
          document.getElementById('actions').appendChild(button);
      })(i);
  }
  // сгенерировать кнопку "Поесть"
  if (student.items.protein > 0) {
      var button = document.createElement('button');
      button.innerHTML = "ПокушаЦ";
      button.className = 'blue-button';
      button.addEventListener('click', function () {
          student.items.protein -= 1;
          student.life += 10;
          goToRoom();
      });
      document.getElementById('actions').appendChild(button);
  }
      // Покупка предмета
      if (student.items.money > 0) {
          var button = document.createElement('button');
          button.innerHTML = "Купить предмет";
          button.className = 'purple-button';
          button.id = 'buyItemButton';
          button.addEventListener('click', function () {
              if (student.items.money >= 50) {
                  student.items.protein += 1;
                  student.items.money -= 50;
                  goToRoom();
              } else {
                  console.log("Недостаточно монет для покупки предмета");
              }
          });
      
          // Вывод кнопки на страницу
          document.getElementById('actions').appendChild(button);
      }
      
      // Проверка, есть ли монетка в комнате и создание кнопки для ее поднятия
      if (room.items && room.items.money) {
          var button = document.createElement('button');
          button.innerHTML = "Поднять монетку";
          button.className = 'yellow-button';
          button.id = 'pickupCoinsButton';
      
          // Добавление обработчика события для кнопки
          button.addEventListener('click', function () {
              // Добавление монетки в инвентарь студента
              student.items.money += room.items.money;
              // Удаление монетки из комнаты
              room.items.money = 0;
              goToRoom();
          });
          
          // Вывод кнопки на страницу
          document.getElementById('actions').appendChild(button);
      }
      
}