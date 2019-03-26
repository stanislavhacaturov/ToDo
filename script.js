const ulElement = document.getElementById('list');

let todoList = [];

function add(){
    if ($('#input').val() == ''){
        alert("Введите текст!")
    } else{
        todoList.unshift({
        content: $('#input').val(),
        done: false,
        selected: false
    });
    $('#input').val('');  
    upgradeView ();
    return todoList;}
}
$('#add').click(function (){
    add();
});
$('#input').keydown(function(event){
    if(event.which === 13)
       {
          add();
       }
});

function upgradeView (){

     ulElement.innerHTML = '';

    for (let index = 0; index < todoList.length; index++){

        const todoItem = todoList[index]

        const liElement = $('<li>', {className: 'shape', id: 'liElement'}).appendTo(ulElement);

        const divElement = $('<div>', {className: 'list-group form-check', id: 'divElement'}).appendTo(liElement);

        const lebelElement = $('<lebel>', {
            className: 'form-check-lebel', 
            id: 'liElement',
            html: todoItem.content})
        if (todoItem.done) {className += ' todoDone'}
        lebelElement.appendTo(divElement);

        const buttonDoneElement = $('<button>', {
            className: 'btn btn_outline-primary', 
            id: 'buttonDoneElement',
            type: 'button',
            html: 'Done'
        }).appendTo(divElement);

        const buttonRemoveElement = $('<button>', {
            className: 'btn btn_outline-danger', 
            id: 'buttonRemoveElement',
            type: 'button',
            html: 'Delete'
        }).appendTo(divElement);

        $(buttonDoneElement).click(function done(){
            todoItem.done = !todoItem.done;
            upgradeView ();
        })

        $(buttonRemoveElement).click(function remove(){
            todoList = todoList.filter( currentTodoItem => currentTodoItem !== todoItem);
            upgradeView ();
        })
    }  
}

