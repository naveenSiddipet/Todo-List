let todoItemContainer = document.getElementById("todoItemsContainer");
let addButton = document.getElementById("onAddTodo");
let saveBtn = document.getElementById("saveBtn");


function getTodoListFromLocalStorage() {
    let stringifyList = localStorage.getItem("todolist");
    let parsedList = JSON.parse(stringifyList);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}





let TodoList = getTodoListFromLocalStorage();

let todoCount = TodoList.length;




saveBtn.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(TodoList));
};

function onDelete(todoId) {
    let todoE = document.getElementById(todoId);
    todoItemContainer.removeChild(todoE);

    let deleteIndex = TodoList.findIndex(function(eachTodo) {
        let id = "todo" + eachTodo.uniqueNo;
        if (todoId === id) {
            return true;
        } else {
            return false;
        }
    });
    TodoList.splice(deleteIndex, 1);
}

function onStatusChange(checkboxId, labelId, todoId) {
    let labelE = document.getElementById(labelId);
    labelE.classList.toggle("checked");

    let todoObjectIndex = TodoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let object = TodoList[todoObjectIndex];
    if (object.isChecked === true) {
        object.isChecked = false;
    } else {
        object.isChecked = true;
    }



}


function createAndAppend(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoItemContainer.appendChild(todoElement);

    let InputElement = document.createElement("input");
    InputElement.type = "checkbox";
    InputElement.id = checkboxId;
    InputElement.classList.add("checkbox-input");
    InputElement.checked = todo.isChecked;
    todoElement.appendChild(InputElement);
    InputElement.onclick = function() {
        onStatusChange(checkboxId, labelId, todoId);
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        onDelete(todoId);
    }
}
for (let todo of TodoList) {
    createAndAppend(todo);
}

function addTodos() {
    let userInput = document.getElementById("todoUserInput");
    let userValue = userInput.value;

    if (userValue === "") {
        alert("please enter a valid text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    createAndAppend(newTodo);
    TodoList.push(newTodo);
    userInput.value = "";
}

addButton.onclick = function() {
    addTodos();
}