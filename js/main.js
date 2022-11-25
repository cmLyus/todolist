// Listeye boş karakter eklenemiyor. Bununla birlikte hiçbir şey yazılmadığında da aynı hatayı veriyor.
// Yazacağınız JavaScript kodu içerisinde element eklemeyi sağlayan bir fonksiyon, element silmeyi sağlayan bir fonksiyon, yapıldı işaretlenmesini sağlayan bir fonksiyon olması gerekiyor.
// Element eklendiğinde ve hata verirken sağ üstte uyarı verdiğini fark etmişsinizdir. Bunu sağlayan Bootstrap Toast bildirimdir. Sayfaya gidip toast nedir nasıl yapılır bunu araştırın ve kodunuza ekleyin.
// Önce ana fonksiyonlar için uğraşın. Yapıldı, toast bildirim bunlar biraz daha için artistliği. Öncelikli amacını sağlıyor olması lazım.
// Yazdığınız js dosyasını projenize eklemeyi unutmayın.

// Bonus
// Yaptığınız yapıya Local Storage'ı da ekleyip verilerin kaybolmamasını sağlayın.

// -----------------------------------------------------------------------------

// selectors

const todoForm = document.querySelector("#task");
const todoList = document.querySelector("#list");

// eventListeners

eventListeners();

function eventListeners() {
    todoForm.addEventListener("onClick", newElement);
    todoList.addEventListener("click", deleteTodo);
    todoList.addEventListener("click", doneTodo);
    document.addEventListener("DOMContentLoaded", loadTodosToUI);
}

// localstoragedaki todoları listede gösterme
function loadTodosToUI(){
    let todos;

    todos = JSON.parse(localStorage.getItem("todos"));

    for (i=0; i<todos.length; i++) {
        console.log(todos[i]);
        liDOM = document.createElement("li");
        liDOM.innerHTML = `${todos[i]} <span class="badge badge-remove" >X</span>`//(todoForm.value);
        liDOM.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center");
        todoList.append(liDOM);
    }
}
// Yeni bir todo ekleme

function newElement() {
    liDOM = document.createElement("li");
    liDOM.innerHTML = `${todoForm.value} <span class="badge badge-remove" >X</span>`//(todoForm.value);
    liDOM.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center");
    
    if ((todoForm.value).trim() === "") {
        $("#liveToastEmpty").toast("show")
        } else {
            todoList.append(liDOM); // ekrandaki listeye anında kaydeder.
            $("#liveToastSuccess").toast("show");
            addtodoToStorage();

        }
}

// localStorage todo kaydetme

function addtodoToStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // string olduğu için Json.parse ile arraye çevirdik
    }

    todos.push(todoForm.value);

    localStorage.setItem("todos", JSON.stringify(todos)); // arrayleri stringe çeviriyoruz stringify ile
}

// Bir todo silme


function deleteTodo(e) {
    
    if (e.target.className === "badge badge-remove") {
        e.target.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.textContent);

    }
}

// Bir todoyu localStoragedan silme

function deleteTodoFromStorage(deletedTodo) {

    let todos = JSON.parse(localStorage.getItem("todos"));

    let i;

    for (i=0; i<todos.length; i++) {
        if(todos[i] + " X" === deletedTodo) {
            console.log(deletedTodo);
            todos.splice(i,1);
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));

}

// Bir todo yapıldı olarak işaretleme

function doneTodo(e) {
        e.target.classList.toggle("list-group-item-success");
}




