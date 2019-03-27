const ulElement = document.getElementById('list');

let todoList = [];

function add() {
    if ($('#input').val() == '') {
        alert("Введите текст!");
    } else {
        todoList.unshift({
            content: $('#input').val(),
            done: false,
            selected: false
        });
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

        const names = ['red','green','yellow'];
        const color = names[Math.floor(Math.random()*names.length)];

        const liElement = $('<li>', {
            class: 'list-group-item',
            id: 'liElement'
        });
        
        liElement.addClass(color);

        liElement.appendTo(ulElement);

        const divElement = $('<div>', {
            class: 'list-group form-check',
            id: 'divElement'
        }).appendTo(liElement);

        const lebelElement = $('<lebel>', {
            class: 'form-check-lebel',
            id: 'lebelElement',
            text: todoItem.content
        });

        if (todoItem.done) {
            lebelElement.addClass(' todoDone')
        }

        lebelElement.appendTo(divElement);

        const buttonDoneElement = $('<button>', {
            class: 'btn btn_outline-primary',
            id: 'buttonDoneElement',
            type: 'button',
            html: 'Done'
        }).appendTo(divElement);

        const buttonRemoveElement = $('<button>', {
            class: 'btn btn_outline-primary',
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
    }
}

function AllActiveCompleted() {

    const activeTodo = todoList.filter(item => item.done === false).length;
    inProcess.innerHTML = ": " + (activeTodo);

    const okey = todoList.slice(todoList.done);
    all.innerHTML = ": " + (okey.length);

    complete.innerHTML = ": " + (okey.length - activeTodo);
}

$('#Completed').click(function Completed() {
    const knopka1 = todoList.filter(item => item.done === true);
    let temp = todoList;
    todoList = knopka1;
    upgradeView();
    todoList = temp;
});

$('#Active').click(function Active() {
    const knopka2 = todoList.filter(item => item.done === false);
    let temp = todoList;
    todoList = knopka2;
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
    const sear = todoList.filter(todoItem => todoItem.content == $('#input').val());
    let temp = todoList;
    todoList = sear;
    upgradeView();
    todoList = temp;
});
