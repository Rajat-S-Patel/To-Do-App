window.onload = function() {
   
    let tasks = JSON.parse(localStorage.getItem('tasks'));
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
        "deadline":new Date(deadline.value).toLocaleDateString("en-IN"),
        done:false
    }
    title.value="";
    deadline.value="";
    addTask(task);
    saveTask(task);
}
let addTask = (task) => {
    console.log("task: "+task);
    let taskContainer = document.getElementById('task-container');
    let taskList = document.createElement('li');
    taskList.classList.add('task-list');
    let atag = document.createElement("a");
    atag.href = `details.html?title=${task.title}&checked=${task.done}&date=${task.deadline}`;
    let row = document.createElement('div');
    row.classList.add('row');
    row.innerHTML+=`<input type="checkbox" onchange="changeState(event)"><h4>${task.title}</h4> <h5>${task.deadline}</h5>`
    atag.appendChild(row);
    taskList.appendChild(atag);
    taskContainer.appendChild(taskList);
}

let changeState = (event) =>{
    let task=getTaskObject(event);
    console.log(task);
    if(task.done)
        addTaskToDone(task);
    else addTask(task);
}
let getTaskObject = (event)=>{
    let parentList = event.currentTarget.parentElement.parentElement.parentElement;
    parentList.parentElement.removeChild(parentList);
    let elements = parentList.children[0].children[0].children;
    let done = elements[0].checked;
    let title = elements[1].innerHTML;
    let deadline = elements[2].innerHTML;
    console.log("deadline: "+deadline);
    return {done,title,deadline};
}

let addTaskToDone = (task) =>{
    console.log(task);
    let taskContainer = document.getElementById('done-task-container');
    let taskList = document.createElement('li');
    taskList.classList.add('task-list');
    let atag = document.createElement("a");
    atag.href = `details.html?title=${task.title}&checked=${task.done}&date=${task.deadline}`;
    let row = document.createElement('div');
    row.classList.add('row','task-done');
    row.innerHTML+=`<input type="checkbox" checked onchange="changeState(event)"><h4>${task.title}</h4> <h5>${task.deadline}</h5>`
    atag.appendChild(row);
    taskList.appendChild(atag);
    taskContainer.appendChild(taskList);
}
