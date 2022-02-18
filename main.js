const input = document.querySelector(".task-add input"),
    addBtn = document.querySelector(".task-add span"),
    taskContent = document.querySelector(".task-content .tasks");

let taskValue = localStorage.getItem('task')
let proArr = []

window.onload = start()

function start() {
    input.focus()
    if(localStorage.task != null){

        proArr = JSON.parse(localStorage.task)
        taskContent.innerHTML = ''
        for(let i = 0 ; i < proArr.length ; i++){
            
            taskContent.innerHTML += `<div class="task">
            <p onclick="Checked(this)">${proArr[i]}<input type="text"></p>
                <div>
                    <span class="edit" onclick = "editTask(this,${i})"> Edit </span>
                    <span class="delete" onclick="deleteTask(${i})"> Delete </span>
                </div>
            </div>`
        }
    }else {
        taskContent.innerHTML = ""
    }
    
    // Number of Tasks
    document.querySelector('.tasks-count span').innerHTML = proArr.length
    console.log(proArr.length)

    //Show Clear All Button
    let clearBtn = document.querySelector('.counters > span')
    clearBtn.style.cssText = 'display:none'
    if(proArr.length > 2) {
        clearBtn.style.cssText = 'display;""'
    }
}
addBtn.addEventListener ("click",addTask)
input.addEventListener("keyup",function(e){
    if(e.keyCode === 13){
        addBtn.click()
    }
})
function addTask(){
    input.focus()
    if(input.value != ""){
        proArr.push(input.value)
        localStorage.setItem("task",JSON.stringify(proArr))
    
    taskContent.innerHTML = ''
    for(let i = 0 ; i < proArr.length ; i++){
        
        taskContent.innerHTML += `<div class="task">
        <p onclick="Checked(this)"> ${proArr[i]}<input type="text"></p>
            <div>
                <span class="edit" onclick = "editTask(this,${i})">Edit</span>
                <span class="delete" onclick="deleteTask(${i})">Delete</span>
            </div>
        </div>`
    }
    
    input.value = ''
    }
    start()
}
function deleteTask(i) {
    proArr.splice(i,1)
    localStorage.setItem("task",JSON.stringify(proArr))
    start()
}
function deleteAll() {

    proArr = []
    localStorage.clear()
    start()
}
function editTask(e,i) {
let inputEdit = e.parentElement.parentElement.children[0].children[0]
    
    if(inputEdit.classList != 'active' ){
        inputEdit.classList.add("active")
        inputEdit.focus()
    }else{
        proArr[i] = inputEdit.value
        inputEdit.classList.remove('active')
        localStorage.setItem("task",JSON.stringify(proArr))
        start()
    }
    inputEdit.addEventListener('keyup',function(i){
        if(i.keyCode === 13){
            this.parentElement.parentElement.children[1].children[0].click()
        }
    })
}

function Checked(i) {
    i.classList.toggle('line')
    // Number Of Completed Task
    document.querySelector('.completed span').innerHTML = document.querySelectorAll('.tasks p.line').length
}
