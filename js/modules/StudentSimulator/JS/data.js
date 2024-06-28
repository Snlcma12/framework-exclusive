var student = {
  life: 100,
  items: {
      protein: 0,
      vodka: 0,
      money: 100
  }
};

var roomId = "start";

var Rooms = {
  start: {
      title: "Клоповник",
      description: "Комната из шараги",
      img: "js/modules/RPG/img/start.jpg",
      actions: [
          { title: "Окно", id: "window", damage: -1, cost: 10 },
          { title: "коридор", id: "tall", damage: -1, cost: 10 }
      ]
  },
  window: {
      title: "Окно",
      description: "Зачем?",
      img: "js/modules/RPG/img/window.jpg",
      actions: []
  },
  kitchen: {
      title: "Кухня",
      description: "Всегда голодный",
      img: "js/modules/RPG/img/kitchen.jpg",
      actions: [
          { title: "Сьесть прокисший суп", id: "ponos", damage: -1 },
          { title: "Выйти обратно в коридор", id: "tall", damage: -1 }

      ]
  },
  tall: {
      title: "Коридор",
      description: "Место соединяющие комнаты",
      img: "js/modules/RPG/img/tall.jpg",
      actions: [
          { title: "Пойти в туалет", id: "toulet", damage: -1 },
          { title: "Идти в комнату", id: "start", damage: -1 },
          { title: "Выйти на пропускной пункт", id: "kpp", damage: -1 },
          { title: "Пойти хавать", id: "kitchen", damage: -1 },
          { title: "Поднять таракана", id: 'tall', eats: 1 }
      ]
  },
  kpp: {
      title: "Пропускной пункт",
      description: "Здесь сказать нечего",
      img: "js/modules/RPG/img/kpp.jpeg",
      actions: [
          { title: "Пойти в коридор", id: "tall", damage: -1 },
          { title: "Выйти на улицу", id: "street", damage: -1 },
          { title: "Поцеловать красоку", id: "kpp", damage: 'random' }
      ]
  },
  street: {
      title: "Улица",
      description: "Место через которое хочу в УДГУ",
      img: "js/modules/RPG/img/streeet.jpg",
      actions: [
          { title: "Пойти в кб за пивом", id: "KB", damage: -1 },
          { title: "Пойти в УДГУ", id: "udgu", damage: -1 },
          { title: "Пойти в общагу", id: "kpp", damage: -1 },
          { title: "Поднять хавчик", id: 'street', eats: 2 }
      ]
  },
  udgu: {
      title: "Университет",
      description: "Красивый, замечательный УДГУ",
      img: "js/modules/RPG/img/1.jpg",
      actions: [
          { title: "Тубзик", id: "TualetUdgu", damage: -1 },
          { title: "Кабинет Математики", id: "MathRoom", damage: -1 },
          { title: "Физра", id: "PE", damage: -1 },
          { title: "Выход на улицу", id: "street", damage: -1 }
      ]
  },
  TualetUdgu: {
      title: "Туалет Удгу",
      description: "Воняет",
      img: "js/modules/RPG/img/tual.jpeg",
      actions: [
          { title: "Выйти из туалета", id: "udgu" }
      ]
  },
  MathRoom: {
      title: "Кабинет Математики",
      description: "Больше сказать нечего",
      img: "js/modules/RPG/img/mat.jpg",
      actions: []
  },
  PE: {
      title: "Кабинет Физры",
      description: "Я футбольный мячик, пум пум",
      img: "https://avatars.mds.yandex.net/get-altay/2134557/2a0000016bda3d4dab42322f94c05e186e32/XXL_height",
      actions: [
          { title: "Выйти из каюинета физры", id: "udgu", damage: -1 }
      ]
  },
  KB: {
      title: "Кб",
      description: "Зашел за коктельчиком",
      img: "js/modules/RPG/img/kb.jpg",
      actions: [
          { title: "Выйти из кб", id: "udgu", damage: 'random' }
      ],
      

  },
  toulet: {
      title: "Толкан",
      description: "Как же здесь ужасно",
      img: "js/modules/RPG/img/toulet.jpg",
      actions: [
          { title: "Выйти из туалета", id: "tall", damage: -1 },
          { title: "Поднять таракана", id: 'toulet', eats: 2 }
      ]
  },
  ponos: {
      title: "Критичское давление на заднем клапоне",
      description: "он не выдержит...",
      img: "js/modules/RPG/img/ponosi.jpg",
      actions: []
  }
}
