// var testingInput = document.querySelector('.activity-item__time');

// function randomNum() {
//     testingInput.innerHTML = Math.floor(Math.random() * 10);
//     testingInput.style.color = 'red';
// }

// randomNum();

var app = document.querySelector('.tracking-app');
var addItemButton = document.querySelector('.add-item-button');
var listTemplate = document.querySelector('#activity-list').content.querySelector('.activity-list');
var itemTemplate = document.querySelector('#activity-item').content.querySelector('.activity-item');

addItemButton.addEventListener('click', onAddItemButtonClick);

//Добавление нового элемента
function onAddItemButtonClick() {
    var activityList = app.querySelector('.activity-list');
    var newItem = itemTemplate.cloneNode(true);

    if (!activityList) {
        var newList = listTemplate.cloneNode(true);
        newList.insertBefore(newItem, null);
        newItem.querySelector('.delete-item-button').addEventListener('click', onDeleteItemButtonClick);
        app.insertBefore(newList, addItemButton);
    } else {
        activityList.insertBefore(newItem, null);
        newItem.querySelector('.delete-item-button').addEventListener('click', onDeleteItemButtonClick);
    }
}

// Удаление элемента
function onDeleteItemButtonClick(event) {
    var itemForDeletion = event.currentTarget.parentNode;
    itemForDeletion.remove();
}