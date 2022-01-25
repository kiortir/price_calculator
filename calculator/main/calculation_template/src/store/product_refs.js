let options = {
  Кромка: {
    component: 'edge',
    type: 'primary',
    data: {
      width: '',
      length: null,
      type: '',
      angle: '',
    },
  },
  Мойка: {
    component: 'sink',
    type: 'primary',
    data: {
      quantity: null,
      type: '',
    },
  },
  Бортик: {
    component: 'border',
    type: 'primary',
    data: {
      type: 'Простой',
      length: null,
    },
  },
  'Вырез под розетку': {
    component: 'socket',
    type: 'primary',
    data: {
      quantity: null,
    },
  },
  'Варочная панель': {
    component: 'cookpanel',
    type: 'primary',
    data: {
      quantity: null,
      type: '',
    },
  },
  'Данные ступеней': {
    component: 'ladder',
    type: 'secondary',
    data: {
      edgeType: '',
      stepLength: null,
      underStepLength: null,
    },
  },
  'Длина стеновой панели': {
    component: 'wallpanel-length',
    type: 'secondary',
    data: {
      length: null,
    },
  },
  'Стыковка плоскости': {
    component: 'surface-docking',
    type: 'primary',
    data: {
      type: '',
      quantity: null,
    },
  },
  'Отверстия D⌀ <= 35мм': {
    component: 'cutout',
    type: 'primary',
    data: {
      quantity: null,
    },
  },
};

let products = {
  Столешница: {
    defaultOptions: [
      options.Кромка,
      options.Бортик,
      options['Вырез под розетку'],
    ],
  },
  'Барная стойка': {
    defaultOptions: [
      options.Кромка,
      options.Бортик,
      options['Варочная панель'],
    ],
  },
  Подоконник: {
    defaultOptions: [options.Кромка],
  },
  'Стеновая панель': {
    defaultOptions: [options['Длина стеновой панели']],
  },
  Ступени: {
    defaultOptions: [options['Данные ступеней']],
  },
};

let defaultAddons = [
  {
    name: 'Радиусный угол > 12',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Другие отверстия',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Обход пиластры',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Конвекция',
    type: {
      selectors: ['вровень', 'фрезеровка'],
      selected: '',
    },
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Лучи под сток воды',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Капельник',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Монтаж хром опоры заказчика',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Стыковка опорной ноги из камня под 45',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Шлифовка подворота камня',
    type: {
      selectors: ['до 150 мм', 'более 150мм'],
      selected: '',
    },
    count: null,
    measurement: 'шт./м2',
  },
  {
    name: 'Подворот из камня',
    count: null,
    measurement: 'шт.',
  },
  {
    name: 'Демонтаж старых изделий (до 6 п.м.)',
    isChecked: false,
  },
];

export { products, options, defaultAddons };
