'use strict';

//Размеры квадрата
const SQUARE_WIDTH = 100;
const SQUARE_HEIGHT = 100;

// Центр квадрата
const SQUARE_CENTER_X = SQUARE_WIDTH / 2;
const SQUARE_CENTER_Y = SQUARE_HEIGHT / 2;

// Количество квадратов по X Y
const SUM_SQUARE_X = 6;
const SUM_SQUARE_Y = 4;

// Размеры контейнера
const CONTAINER_WIDTH = (SQUARE_WIDTH * SUM_SQUARE_X);
const CONTAINER_HEIGHT = (SQUARE_HEIGHT * SUM_SQUARE_Y);

// Цвета
const CONTAINER_COLOR = 0x666666;
const SQUARE_BORDER_COLOR = 0xFFFFFF;
const LINE_BORDER_COLOR = SQUARE_BORDER_COLOR;

// Прозрачность линий в %
const SQUARE_BORDER_OPACITY = 1;
const LINE_BORDER_OPACITY = SQUARE_BORDER_OPACITY;

// Ширина линий
const BORDER_WIDTH = 2;

// Массив с координатами
// формат данных: [num, num, ... ] или [[arr],[arr], ...]
let lines = [
  [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2], [3, 3, 3, 3, 3, 3],
  [1, 2, 1, 2, 1, 2], [0, 1, 0, 1, 0, 1], [2, 3, 2, 3, 2, 3], [2, 1, 2, 1, 2, 1],
  [1, 0, 1, 0, 1, 0], [3, 2, 3, 2, 3, 2], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1],
  [2, 3, 3, 3, 3, 2], [3, 2, 2, 2, 2, 3], [3, 3, 0, 0, 3, 3], [0, 0, 1, 1, 0, 0],
  [0, 0, 3, 3, 0, 0], [3, 3, 2, 2, 3, 3], [1, 2, 3, 3, 2, 1], [2, 1, 0, 0, 1, 2]
];

// Контейнер для квадратов
const app = new PIXI.Application({
  width: CONTAINER_WIDTH,
  height: CONTAINER_HEIGHT,
  backgroundColor: CONTAINER_COLOR,
  resolution: window.devicePixelRatio || 1,
});
document.querySelector('.wrapper').appendChild(app.view);

// Сетка из квадратов
for (let i = 0; i < (SUM_SQUARE_X * SUM_SQUARE_Y); i++) {
  const grid = new PIXI.Graphics();
  grid.lineStyle(BORDER_WIDTH, SQUARE_BORDER_COLOR, SQUARE_BORDER_OPACITY);
  grid.drawRect(0, 0, SQUARE_WIDTH, SQUARE_HEIGHT);
  grid.x = (i % SUM_SQUARE_X) * SQUARE_WIDTH;
  grid.y = Math.floor(i / SUM_SQUARE_X) * SQUARE_HEIGHT;
  grid.endFill();
  app.stage.addChild(grid);
}

// Отрисовка линий. На входе принимает lines
const paintLines = (item) => {
  for (let i = 0; i < item.length; i++) {
    const line = new PIXI.Graphics();
    line.lineStyle(BORDER_WIDTH, Math.random() * LINE_BORDER_COLOR, LINE_BORDER_OPACITY);
    line.moveTo(SQUARE_CENTER_X, SQUARE_CENTER_Y + (SQUARE_HEIGHT * item[0]));
    for (let j = 0; j < item.length; j++) {
      line.lineTo(SQUARE_CENTER_X + SQUARE_WIDTH * j, SQUARE_CENTER_Y + (SQUARE_HEIGHT * (item[j])));
    }
    line.endFill();
    app.stage.addChild(line);
  }
}

// Определяем, что находится в lines: [num, num, ... ] или [[arr],[arr], ...]
if (Array.isArray(lines[0])) {
  for (let item of lines) {
    paintLines(item);
  }
} else {
  paintLines(lines);
}
