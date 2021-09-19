'use strict'
/* Подсмотрел решение в интернете, чуть изменил.*/
function createBoard() {
    const table = document.createElement('table');
    let switcher = true;

    for (let i = 0; i < 8; i++) {
        const line = document.createElement('tr');
        const num = document.createElement('td');
        num.classList.add('x');
        num.innerHTML = 8 - i;
        line.appendChild(num);

        for (var j = 0; j < 8; j++) {
            if (j == 0)
                switcher = !switcher;
            var cell = document.createElement('td');
            if (switcher) {
                cell.classList.add('z');
            } else
                cell.classList.add('x');

            line.appendChild(cell);
            switcher = !switcher;
        }
        table.appendChild(line);
    }
    const fline = document.createElement('tr');
    const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (var k = 0; k < 9; k++) {

        var cell = document.createElement('td');
        cell.classList.add('x')
        cell.innerHTML = letters[k];

        fline.appendChild(cell);

    }
    table.appendChild(fline);

    document.body.appendChild(table);
}


function fillLine(switcher, line, fig = false) {
    for (let j = 0; j < 8; j++) {
        if (j == 0)
            switcher = !switcher;
        const cell = document.createElement('td');
        if (fig) cell.innerHTML = fig[j];
        if (switcher) {
            cell.classList.add('z');
        } else
            cell.classList.add('x');

        line.appendChild(cell);
        switcher = !switcher;

    }
    return switcher
}


function createBoardPlus() {
    const table = document.createElement('TABLE'); // создание элемента для доски
    let switcher = true;
    // Массивы с кодами фигур
    const wfig = ['&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'];
    const wwfig = ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;'];
    const bfig = ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];
    const bbfig = ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;'];
    // Отрисовка доски
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('TR'); // Строка таблицы
        const num = document.createElement('TD'); // Ячейка таблицы (в данном случае для нумерации)
        num.classList.add('x');
        num.innerHTML = 8 - i;
        line.appendChild(num);
        switch (i) {
            case 0: switcher = fillLine(switcher, line, bfig); break

            case 1: switcher = fillLine(switcher, line, bbfig); break

            case 6: switcher = fillLine(switcher, line, wwfig); break

            case 7: switcher = fillLine(switcher, line, wfig); break

            default: switcher = fillLine(switcher, line);
        }


        table.appendChild(line);
    }
    // Отрисовка строки с буквами
    const fline = document.createElement('TR');
    const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (var k = 0; k < 9; k++) {

        var cell = document.createElement('TD');
        cell.classList.add('x')
        cell.innerHTML = letters[k];

        fline.appendChild(cell);

    }
    table.appendChild(fline);

    document.body.appendChild(table);
}

createBoard();

const div = document.createElement('DIV');
div.innerText = '1 и 3 задания от 5 урока.'
div.classList.add('div');
document.body.appendChild(div);

createBoardPlus();
