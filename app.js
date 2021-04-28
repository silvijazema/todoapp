//Selectors

const newTaskInput = document.querySelector(".newTaskInput");
const newTaskButton = document.querySelector(".newTaskButton");
const toDoItem = document.querySelector(".toDoItem");

//Event listener

newTaskButton.addEventListener("click", addToDo);

//Functions

function addToDo(event) {
  event.preventDefault();

  const addedItem = document.createElement("div");

  //Drag class added + attribute
  addedItem.classList.add("addedItem", "box__dragabble");
  addedItem.setAttribute("draggable", true);

  const newToDo = document.createElement("li");
  newToDo.innerText = newTaskInput.value;
  newToDo.classList.add("taskName");
  addedItem.appendChild(newToDo);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="far fa-trash-alt"> </i>';
  deleteButton.classList.add("deleteButton");
  addedItem.appendChild(deleteButton);

  //Append
  toDoItem.appendChild(addedItem);

  //Event listener + function for delete button
  deleteButton.addEventListener("click", deleteItem);
  function deleteItem() {
    addedItem.remove();
  }
}

//Draggable stuff

class Draggable {
  constructor() {
    this.container = document.querySelector(".box__dragabble");
    this.box = document.querySelectorAll(".box");
    this._addEventListener();
  }

  _addEventListener() {
    this.box.forEach((element) => {
      element.addEventListener("dragenter", this.dragenter);
      element.addEventListener("dragleave", this.dragleave);
      element.addEventListener("dragover", this.dragover);
      element.addEventListener("drop", this.drop);
    });

    this.container.addEventListener("dragstart", this.dragstart);
    this.container.addEventListener("dragend", this.dragend);
  }

  dragstart(e) {
    this.classList.add("drag_start");
    setTimeout(() => {
      this.classList.add("invisible");
    }, 0);
  }

  dragend(e) {
    console.log("dragend");
    this.classList.remove("invisible");
    this.classList.remove("drag_start");
  }

  dragenter(e) {
    e.preventDefault();

    console.log("dragenter");
    this.classList.add("drag_enter");
  }

  dragleave(e) {
    console.log("dragleave");
    this.classList.remove("drag_enter");
  }

  dragover(e) {
    e.preventDefault();
    console.log("dragover");
  }

  drop() {
    let container = document.querySelector(".box__dragabble");
    this.classList.remove("drag_enter");
    this.append(container);
  }

  static init() {
    return new this();
  }
}

document.addEventListener("load", Draggable.init());
