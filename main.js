//유저가 값을 입력
//+버튼을 (클릭)누르면 할일 추가
//delete 누르면 할일 삭제
//check 누르면 할일 끝나면서 밑줄
    //1. check 클릭하는 순간 true/false
    //2. true이면 끝난걸로 간주하고 밑줄 보여주기
    //3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭 누르면 언더바 이동
//끝난탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//전체탭을 누르면 전체아이템으로 돌아옴

//아이콘
//체크버튼 밑줄 하면 배경회색
//체크하면 체크 -> 되돌리기
//입력하면 입력창 자동으로 비워지게 (완)
//할일 없으면 아이템 추가x 버튼을 막아버리거나 버튼 클릭시 할일입력 등의 메세지 출력
//예븐 슬라이드바.
//엔터하면 자동으로 추가


let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let tabs=document.querySelectorAll(".task-tabs div");
let underLine=document.getElementById("under-line");
let taskList=[];
let mode="all";
let filterList=[];

addButton.addEventListener("click", addTask);
//버튼 클릭 이벤트방법 1
taskInput.addEventListener("focus", function(){
    taskInput.value="";
});

taskInput.addEventListener("keypress",function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add-button").click();
    }
});

taskInput.addEventListener("keyup",function(event){
    if(taskInput.value!==""){
        addButton.disabled=false;
    }else{
        addButton.disabled=true;
    }
});

addButton.disabled=true;

for(let i=0; i<tabs.length; i++){ //선 제외해서 1부터
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

function addTask(){
    //추가정보 -> 객체로 
    let task={
        //각각 아이템에 아이디 부여 각각 유니크한 값
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false, //끝났는지?
    }
    taskList.push(task);
    console.log(taskList);
    render(); //입력하면 입력창 자동으로 비워지게
    taskInput.value="";
    addButton.disabled=true;
}

console.log(addButton);


function render(){ //그림 이걸로 처리
    let list=[];
    //1. 내가 선택한 탭에 따라
    if(mode==="all"){
        //all taskList
        list=taskList;
    }
    else if(mode==="ongoing" ||mode==="done"){
        //ongoing, done -> filterList
        list=filterList;
    }

    //2. 리스트 달리 보여줌
    //all -> taskList
    //ongoing, done -> filterList
    let resultHTML=''; //html을 다시 그려줌
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete==true){//밑줄
            resultHTML+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="click-button">
                <div onclick="toggleComplete('${list[i].id}')"><div class="fa-regular fa-circle-check" style="color: #ff0095;"></div></div>
                <div onclick="deleteTask('${list[i].id}')"><div class="fa-solid fa-trash-can" style="color: #940040;"></div></div>
            </div>
        </div>`;
        
        }
        else{//밑줄x
            resultHTML+=`<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="click-button">
                <div onclick="toggleComplete('${list[i].id}')"><div class="fa-regular fa-circle-check" style="color: #ff0095;"></div></div>
                <div onclick="deleteTask('${list[i].id}')"><div class="fa-solid fa-trash-can" style="color: #940040;"></div></div>
            </div>
        </div>`;
        }
       
    }//button onclick->이 버튼이 생성되는 순간 onclick
    //버튼 클릭 이벤트방법 2
    //toggleComplete('${taskList[i].id}')" toggleComplete함수가 실행될때마다 아이디값 부여

    document.getElementById("task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
        taskList[i].isComplete=!taskList[i].isComplete;
        break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
    console.log(taskList);
}


function filter(event){
    mode=event.target.id;
    /*잘 모르겠어서 코드 참고함*/
    if(event){
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
    filterList=[];

    if(mode==="all"){
        //전체 리스트를 보여준다
        render();
    }else if(mode==="ongoing"){
        //진행중 아이템 보여줌
        //task.isComplete=false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode==="done"){
        //끝나는 케이스
        //task.isComplete=true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){        //각각 아이템에 아이디 부여 각각 유니크한 값 랜덤으로
    return '_' + Math.random().toString(36).substr(2, 9);
}
