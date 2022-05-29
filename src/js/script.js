// var testingInput = document.querySelector('.activity-item__time');

// function randomNum() {
//     testingInput.innerHTML = Math.floor(Math.random() * 10);
//     testingInput.style.color = 'red';
// }

// randomNum();

var app = document.querySelector('.tracking-app');
var appFooter = app.querySelector('.tracking-app__footer');
var addItemButton = document.querySelector('.add-item-button');
var listTemplate = document.querySelector('#activity-list').content.querySelector('.activity-list');
var itemTemplate = document.querySelector('#activity-item').content.querySelector('.activity-item');
let creationFormTemplate = document.querySelector('#creation-form').content.querySelector('.creation-form');

addItemButton.addEventListener('click', onAddItemButtonClick);

//Добавление нового элемента
function onAddItemButtonClick() {
    let creationForm = creationFormTemplate.cloneNode(true);
    let creationInput = creationForm.querySelector('.creation-form__input');
    appFooter.insertBefore(creationForm, null);
    creationInput.focus();
    let creationAddButton = creationForm.querySelector('.creation-form__button--add');
    let creationCloseButton = creationForm.querySelector('.creation-form__button--close');
    creationAddButton.addEventListener('click', onCreationAddButtonClick);
    creationCloseButton.addEventListener('click', onCreationCloseButton);
}

function onCreationAddButtonClick(event) {
    let creationForm = app.querySelector('.creation-form');
    event.currentTarget.removeEventListener('click', onCreationAddButtonClick);
    let creationCloseButton = creationForm.querySelector('.creation-form__button--close');
    creationCloseButton.removeEventListener('click', onCreationCloseButton);
    let creationInput = creationForm.querySelector('.creation-form__input');
    var activityList = app.querySelector('.activity-list');
    var newItem = itemTemplate.cloneNode(true);
    let newItemTitle = creationInput.textContent;

    if (!activityList) {
        var newList = listTemplate.cloneNode(true);
        newList.insertBefore(newItem, null);
        newItem.querySelector('.activity-item__title').textContent = newItemTitle;
        newItem.querySelector('.delete-item-button').addEventListener('click', onDeleteItemButtonClick);
        app.insertBefore(newList, appFooter);
    } else {
        activityList.insertBefore(newItem, null);
        newItem.querySelector('.activity-item__title').textContent = newItemTitle;
        newItem.querySelector('.delete-item-button').addEventListener('click', onDeleteItemButtonClick);
    }

    creationForm.remove();
}

function onCreationCloseButton(event) {
    let creationForm = app.querySelector('.creation-form');
    event.currentTarget.removeEventListener('click', onCreationCloseButton);
    let creationAddButton = creationForm.querySelector('.creation-form__button--add');
    creationAddButton.removeEventListener('click', onCreationAddButtonClick);
    creationForm.remove();
}

// Удаление элемента
function onDeleteItemButtonClick(event) {
    var itemForDeletion = event.currentTarget.parentNode;
    itemForDeletion.remove();
}