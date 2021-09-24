// Глобальные переменные:                            
let FIELD_SIZE_X = 20;//строки
let FIELD_SIZE_Y = 20;//столбцы
let SNAKE_SPEED = 200; // Интервал между перемещениями змейки
let snake = []; // Сама змейка
let direction = 'y+'; // Направление движения змейки
let gameIsRunning = false; // Запущена ли игра
let snake_timer; // Таймер змейки
let food_timer; // Таймер для еды
let score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    let wrap = document.querySelector('.wrap');

    // События кнопок Старт и Новая игра
    document.querySelector('#snake-start').onclick = startGame;
    document.querySelector('#snake-renew').onclick = refreshGame;

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

function prepareGameField() {
    // Создаём таблицу
    let game_table = document.createElement('TABLE');
    game_table.className = 'game-table';

    let online_score = document.createElement('SPAN');
    online_score.classList.add('score')
    online_score.textContent = 'Ваш текущий счёт: ' + score;
    document.querySelector('#snake-field').appendChild(online_score);

    // Генерация ячеек игровой таблицы
    for (let i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        let row = document.createElement('TR');
        row.className = 'game-table-row row-' + i;

        for (let j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            let cell = document.createElement('TD');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.querySelector('#snake-field').appendChild(game_table); // Добавление таблицы
}

function startGame() {
    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 0);
    setInterval(createBadBlock, 6000);
}

function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    let start_coord_x = parseInt(FIELD_SIZE_X / 2);
    let start_coord_y = parseInt(FIELD_SIZE_Y / 2);

    // Хвост змейки
    let snake_tail = document.querySelector('.cell-' + start_coord_y + '-' + start_coord_x);
    snake_tail.classList.add('snake-unit');
    // Голова змейки
    let snake_head = document.querySelector('.cell-' + (start_coord_y - 1) + '-' + start_coord_x);
    snake_head.classList.add('snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);
}

function move() {
    // Сборка классов
    let snake_head_classes = snake[snake.length - 1].classList;

    // Сдвиг головы
    let new_unit;
    let snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив

    let coord_y = parseInt(snake_coords[1]);
    let coord_x = parseInt(snake_coords[2]);
    console.log(coord_y, coord_x)

    // Определяем новую точку
    if (direction == 'x-') {
        if (coord_x - 1 < 0) {
            coord_x += FIELD_SIZE_X;
        }
        new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x - 1));
    }
    else if (direction == 'x+') {
        if (coord_x + 1 >= FIELD_SIZE_X) {
            coord_x = -1;
        }
        new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x + 1));
    }
    else if (direction == 'y+') {
        if (coord_y - 1 < 0) {
            coord_y += FIELD_SIZE_Y;
        }
        new_unit = document.querySelector('.cell-' + (coord_y - 1) + '-' + (coord_x));
    }
    else if (direction == 'y-') {
        if (coord_y + 1 >= FIELD_SIZE_Y) {
            coord_y = -1;
        }
        new_unit = document.querySelector('.cell-' + (coord_y + 1) + '-' + (coord_x));
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не врезалась в препятствие

    if (!isSnakeUnit(new_unit) && !new_unit.classList.value.split(' ').includes('bad-unit')) {
        // Добавление новой части змейки
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            let removed = snake.splice(0, 1)[0];
            let classes = removed.classList.value.split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {

    let check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;

}

/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    let check = false;

    let unit_classes = unit.classList.value.split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        unit.classList.remove('food-unit')
        createFood();
        score++;
        document.querySelector('.score').textContent = 'Ваш текущий счёт: ' + score;
    }
    return check;
}

function createFood() {
    let foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        let food_x = parseInt(Math.random() * FIELD_SIZE_X);
        let food_y = parseInt(Math.random() * FIELD_SIZE_Y);

        let food_cell = document.querySelector('.cell-' + food_y + '-' + food_x);

        // проверка на змейку
        if (!isSnakeUnit(food_cell)) {

            food_cell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

function createBadBlock() {

    // рандом
    let block_x = parseInt(Math.random() * FIELD_SIZE_X);
    let block_y = parseInt(Math.random() * FIELD_SIZE_Y);

    let block_cell = document.querySelector('.cell-' + block_y + '-' + block_x);

    // проверка на змейку
    if (!isSnakeUnit(block_cell)) {

        block_cell.classList.add('bad-unit');

    }
    setTimeout(removeBadBlock, 5000)
}

function removeBadBlock() {

    document.querySelector('.bad-unit').classList.remove('bad-unit');
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}


/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
    refreshGame();
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}


window.onload = init;
