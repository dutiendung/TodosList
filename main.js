const input = document.querySelector("input");
const button = document.querySelector("button");
const form = document.querySelector("form");
const todos = document.querySelector(".todos");

form.onsubmit = function (e) {
  e.preventDefault();
  let val = input.value;
  input.value = "";
  if (val) {
    addTodoElement({
      text: val,
    });
    saveTodoList();
  }
};

function addTodoElement(todo) {
  var li = document.createElement("li");
  li.innerHTML = `
    <span>${todo.text}</span>
    <i class="fas fa-trash"></i>`;
  if (todo.status === "completed") {
    li.classList.add("completed");
  }
  li.onclick = function () {
    this.classList.toggle("completed");
    saveTodoList();
  };
  li.querySelector("i").onclick = function () {
    this.parentElement.remove();
    saveTodoList();
  };
  todos.appendChild(li);
}
function saveTodoList() {
  let todoList = document.querySelectorAll("li");
  let todoListStorage = [];
  todoList.forEach((item) => {
    let text = item.querySelector("span").innerText;
    let status = item.getAttribute("class");
    todoListStorage.push({
      text,
      status,
    });
  });
  localStorage.setItem("todoList", JSON.stringify(todoListStorage));
}
function init() {
  let data = JSON.parse(localStorage.getItem("todoList"));
  data.forEach((item) => {
    addTodoElement(item);
  });
}
init();
