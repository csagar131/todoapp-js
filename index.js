var todoForm = document.getElementById('todo-from');
var btnSave = document.getElementById('btn-save');
var todoList = document.getElementById('todo-list');
var todoInput = document.getElementById('todo-input');

function getTodoList(){
  if(localStorage.getItem('todos') !== null){
    return JSON.parse(localStorage.getItem('todos'));
  }
  return [];
}

loadStoredTodo();


 function loadStoredTodo(){
      var todoStorageList = getTodoList();
      if(todoStorageList.length !== 0){
        for(var i=0;i < todoStorageList.length;i++){
            createTodoFromStorage(todoStorageList[i][Object.keys(todoStorageList[i])[0]]);
        }
      } 
}


function createTodoFromStorage(message){
    todoList.insertBefore(createTodoDiv(message),todoList.firstElementChild);
}


function createTodoDiv(message){
      var mainDiv = document.createElement('div');
      var count =  todoList.childElementCount + 1;
      mainDiv.id = 'todo-' + message;
      mainDiv.className = 'todo-item-container';

      var innerDiv = document.createElement('div');
      innerDiv.className = 'todo-item';

      var h3 = document.createElement('h3');
      h3.innerText = message;
      innerDiv.appendChild(h3);

      var innerMostDiv = document.createElement('div');

      var iEdit = document.createElement('i');
      iEdit.className = 'far fa-edit';
      iEdit.addEventListener('click', function(e){
          editTodo(e);
      });

      var iDelete = document.createElement('i');
      iDelete.className = 'fas fa-trash';
      iDelete.addEventListener('click', function(e){
          removeTodo(e);
      });

      innerMostDiv.appendChild(iEdit);
      innerMostDiv.appendChild(iDelete);

      innerDiv.appendChild(innerMostDiv);
      mainDiv.appendChild(innerDiv);

      
      editDiv = createEditDiv();
      mainDiv.appendChild(editDiv);

      return mainDiv;
}


function createEditDiv(){
  var editDiv = document.createElement('div');
  editDiv.className = 'todo-edit';
  
  var input = document.createElement('input');
  editDiv.appendChild(input);

  var btn = document.createElement('button');
  btn.innerText = 'Update';
  btn.addEventListener('click', function(e){
     editDoneTodo(e);
  });

  editDiv.appendChild(btn);

  return editDiv;
}


function editDoneTodo(e){
  var todoDiv = e.target.parentElement.parentElement;
  for(var i=0;i< todoDiv.childNodes.length;i++)
  {
     if(todoDiv.childNodes[i].className === 'todo-item-none'){
       if(i == 0){
        var todoStorageList = getTodoList();
        todoDiv.childNodes[i].firstElementChild.innerText = e.target.parentElement.firstElementChild.value;
        todoDiv.childNodes[i].className = 'todo-item';
        todoDiv.childNodes[i+1].className = 'todo-edit';
        for(var j = 0 ; j< todoStorageList.length ; j++){
          if(Object.keys(todoStorageList[j])[0] == e.target.parentElement.parentElement.id){
            todoStorageList = todoStorageList.filter(function(item){
              return Object.keys(item)[0] !== Object.keys(todoStorageList[j])[0];
             });
            var key = 'todo-' + e.target.parentElement.firstElementChild.value;
            var todoObj = {};
            todoObj[key] = e.target.parentElement.firstElementChild.value;
            todoStorageList.push(todoObj);
            localStorage.setItem('todos', JSON.stringify(todoStorageList));
          }
        }
       }
     }
  }
}


function removeTodo(e){
    var todoStorageList = getTodoList();
    var todoId = e.target.parentElement.parentElement.parentElement.id;
    todoStorageList = todoStorageList.filter(function(item){
       return Object.keys(item)[0] !== todoId;
      });
    localStorage.setItem('todos', JSON.stringify(todoStorageList));
    e.target.parentElement.parentElement.parentElement.remove();
}


function editTodo(e){
    var todoDiv = e.target.parentElement.parentElement.parentElement;
    for (var i=0 ; i<todoDiv.childNodes.length; i++){
       if(todoDiv.childNodes[i].className === 'todo-item'){
          todoDiv.childNodes[i].className = 'todo-item-none';
          todoDiv.childNodes[i+1].className = 'todo-edit-show';
          todoDiv.childNodes[i+1].firstElementChild.value = todoDiv.childNodes[i].innerText;
       }
    }
}


function createTodo(message){
    if(message === '')
    {
      alert('todo cannot be empty');
    }
    else{
      todoList.insertBefore(createTodoDiv(message),todoList.firstElementChild);
  
      key = 'todo-' + message;
      todoObj = {};
      todoObj[key] = message;
      var todoStorageList = getTodoList();
      todoStorageList.push(todoObj);
      localStorage.setItem('todos', JSON.stringify(todoStorageList));
      
      todoInput.value = '';
    }
}


btnSave.addEventListener('click',function(e){
    createTodo(e.target.parentElement.firstElementChild.value);
});

document.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
      e.preventDefault();
      createTodo(todoInput.value);
    }
});





