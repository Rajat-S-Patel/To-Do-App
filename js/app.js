window.onload = function() {
   
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // localStorage.removeItem('tasks');
    if(tasks!=null){
        tasks.sort((a,b)=>{
            a = new Date(a.deadline);
            b = new Date(b.deadline);
            if (a < b) return 1;
            else if (a==b) return 0;
            else return -1;
        });
        
        for(const task of tasks) {
            addTask(task);
        }
    }
}
let saveTask = (task)=>{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks == null) tasks = [];
    tasks.push(task);

    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

let addNewTask=()=>{
    let title = document.getElementById('task-title');
    let deadline = document.getElementById('task-deadline');
    let task = {
        "title":title.value,
        "deadline":new Date(deadline.value),
        done:false
    }
    title.value="";
    deadline.value="";
    addTask(task);
    saveTask(task);
}
let addTask = (task) => {
    let taskContainer = document.getElementById('task-container');
    let taskList = document.createElement('li');
    taskList.classList.add('task-list');
    let row = document.createElement('div');
    row.ondblclick = editTask;
    row.classList.add('row');
    
    if(new Date(task.deadline) < Date.now()) {
        row.classList.add('expired-task');
    }
    row.innerHTML+=`<input type="checkbox" onchange="changeState(event)"><h4>${task.title}</h4> 
    <div class="right-div">
    <h5>${new Date(task.deadline).toLocaleDateString("en-IN")}</h5>
    <button class="delete-btn" onclick="deleteTask(event)">delete</button>
    </div>`
    
    taskList.appendChild(row);
    taskContainer.appendChild(taskList);
}

let deleteTask = (event)=>{
    let list = event.currentTarget.parentElement.parentElement.parentElement;
    removeTask(list);
}
let removeTask = (list)=>{
    let targetTask= getTaskObject(list);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(tasks.findIndex((x)=> x === targetTask),1);
    list.parentElement.removeChild(list);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
let changeState = (event) =>{
    let list = event.currentTarget.parentElement.parentElement;
    let task=getTaskObject(list);
    list.parentElement.removeChild(list);

    if(task.done)
        addTaskToDone(task);
    else addTask(task);
}
let getTaskObject = (parent)=>{
    let elements = parent.children[0].children;
    let done = elements[0].checked;
    let title = elements[1].innerHTML;
    let deadline = elements[2].children[0].innerHTML;
    let splits = deadline.split("/");
    console.log(splits,splits[-1],Number(splits[1])-1,splits[0]);    
    return {done,title,"deadline":new Date(splits[2],Number(splits[1])-1,splits[0])};
}

let addTaskToDone = (task) =>{
    let taskContainer = document.getElementById('done-task-container');
    let taskList = document.createElement('li');
    taskList.classList.add('task-list');
    let row = document.createElement('div');
    row.classList.add('row','task-done');
    row.innerHTML+=`<input type="checkbox" checked onchange="changeState(event)"><h4>${task.title}</h4> 
    <div class="right-div">
    <h5>${task.deadline.toLocaleDateString("en-IN")}</h5>
    </div>`
    taskList.appendChild(row);
    taskContainer.appendChild(taskList);
}

let editTask = (event) =>{
    let list = event.currentTarget.parentElement;
    let task = getTaskObject(list);
    let title = document.getElementById('task-title');
    let deadline = document.getElementById('task-deadline');
    title.value = task.title;
    deadline.valueAsDate = task.deadline;
    removeTask(list);
}