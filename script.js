const ulElement = document.getElementById('list');

let todoList = [];
const names = ['red', 'yellow', 'green'];
let i = 0;
function add() {  
    if ($('#input').val() == '') {
        alert("Введите текст!");
    } else {
        let colorRnd = names[Math.floor(Math.random()*names.length)];
        todoList.unshift({
            content: $('#input').val(),
            done: false,
            selected: false,
            color: colorRnd,
            id: i
        });
        i++;
        $('#input').val('');
        upgradeView();
        return todoList;
    }
}

$('#add').click(function () {
    add();
});

$('#input').keydown(function (event) {
    if (event.which === 13) {
        add();
    }
});

function upgradeView() {

    AllActiveCompleted();

    ulElement.innerHTML = '';

    for (let index = 0; index < todoList.length; index++) {

        const todoItem = todoList[index];

        let color = names[Math.floor(Math.random()*names.length)];
    
        const liElement = $('<li>', {
            class: 'list-group-item',
            id: 'liElement'
        });
        liElement.addClass(todoItem.color);
        liElement.appendTo(ulElement);

        const divElement = $('<div>', {
            class: '',
            id: 'divElement'
        }).appendTo(liElement);

        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.checked = todoItem.selected;
        divElement.append(inputElement);

        const lebelElement = $('<lebel>', {
            class: '',
            id: 'lebelElement',
            text: todoItem.content
        });

        if (todoItem.done) {
            lebelElement.addClass('todoDone');
        }

        lebelElement.appendTo(divElement);

        const buttonDoneElement = $('<button>', {
            class: '',
            id: 'buttonDoneElement',
            type: 'button',
            html: 'Done'
        }).appendTo(divElement);

        const buttonRemoveElement = $('<button>', {
            class: '',
            id: 'buttonRemoveElement',
            type: 'button',
            html: 'Delete'
        }).appendTo(divElement);

        $(buttonDoneElement).click(function done() {
            todoItem.done = !todoItem.done;
            upgradeView();
        });

        $(buttonRemoveElement).click(function remove() {
            todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem);
            upgradeView();
        });

        lebelElement.dblclick(function edit() {
            $('#input').val(todoItem.content);
            todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem)
        });

        $(inputElement).change(function check() {
            todoItem.selected = inputElement.checked;
        });

        $('#buttonRed').click(function () {
            if (todoItem.selected) {
                todoItem.color = ('red')
                upgradeView()
                // liElement.removeClass()
                // liElement.addClass('list-group-item red');
            }       
        });

        $('#buttonGreen').click(function () {
            if (todoItem.selected) {
                todoItem.color = ('green')
                upgradeView()
            }       
        });

        $('#buttonYellow').click(function () {
            if (todoItem.selected) {
                todoItem.color = ('yellow')
                upgradeView()
            }       
        });
    }
}

$('li').addClass('red');

function AllActiveCompleted() {

    const activeTodo = todoList.filter(item => item.done === false).length;
    inProcess.innerHTML = ": " + (activeTodo);

    const okey = todoList.slice(todoList.done);
    all.innerHTML = ": " + (okey.length);

    complete.innerHTML = ": " + (okey.length - activeTodo);
}

$('#Completed').click(function Completed() {
    const completed = todoList.filter(item => item.done === true);
    let temp = todoList;
    todoList = completed;
    upgradeView();
    todoList = temp;
});

$('#Active').click(function Active() {
    const active = todoList.filter(item => item.done === false);
    let temp = todoList;
    todoList = active;
    upgradeView();
    todoList = temp;
});

$('#All').click(function All() {
    upgradeView();
});

$('#removeAction').click(function removeAction() {
    todoList = todoList.filter(todoItem => !todoItem.done);
    upgradeView();
});

$('#doneAction').click(function doneAction() {
    for (const todoItem of todoList) {
        todoItem.done = !todoItem.done;
    }
    upgradeView();
});

$('#search').click(function search() {
    const search = todoList.filter(todoItem => todoItem.content == $('#input').val());
    let temp = todoList;
    todoList = search;
    upgradeView();
    todoList = temp;
});
