var icon = document.querySelector(".plus-icon");
icon.addEventListener("click",function(){
    var a = document.querySelector(".popup-container");
    var b = document.querySelector(".popup-child-container");
    a.style.display = "initial";
    b.style.display = "initial";

})
var cardsList = [];


var addButton = document.querySelector(".add-button");
addButton.addEventListener("click",() => {
    var a = document.querySelector(".popup-container");
    var b = document.querySelector(".popup-child-container");
    var c= document.querySelector("#temp-heading");
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    var heading = document.querySelector(".text-field").value;
    document.querySelector(".text-field").value = null;
    var subTaskList = [];
    var card = new Card(heading,subTaskList);
    cardsList.push(card);
    render();
    
    
});

function deleteCard(uid){
    cardsList.splice(uid,1);
    render();
}

function render(){
    
    var s = "";
    var t = "";
    
    for(var i=0 ; i < cardsList.length ; i++){
        for(  var j = 0;j < cardsList[i].subTaskList.length ; j++){
            if(cardsList[i].subTaskList[j].isMarked == true){
                t += '<div class = "subtask-item"><strike>'+cardsList[i].subTaskList[j].name+'</strike></div>';
            }
            else{
                t += '<div class = "subtask-item"><span class = "subtask-name">'+cardsList[i].subTaskList[j].name+'</span><span  onclick = "markSubtask(this.id,'+i+')" id = "'+(i*500 + (j+500))+'" class = "subtask-button">Mark Done<span></div>'
            }
            
        }
        s += ' <div class="task-card"><div class="reading-text">' + cardsList[i].heading +'</div><hr><div class = "sub-list">'+t+'</div><div id = "'+ (i+100)+'" onclick = "addItem(this.id)" class="task-card-plus-icon"><i class="fa fa-plus-circle" area-hidden = "true"></i></div><div onclick = "deleteCard(this.id)" id = "'+i+'" class="task-card-trash-icon"><i class="fa fa-trash"></i></div></div>'
        t = "";
    }
    
    document.getElementById("cards-list").innerHTML = s;
    
}

var tempIndex;
var subtaskTempIndex;
function addItem(index){
    document.querySelectorAll(".popup-child-container")[1].style.display = "initial";
    document.querySelector(".popup-container").style.display = "initial";
    tempIndex = index-100;
}

function markSubtask(subtaskIndex, cardno){
    subtaskTempIndex = subtaskIndex-((cardno*500)+500);
    cardsList[cardno].subTaskList[subtaskTempIndex].isMarked = true;
    render();
    
}


var addSub = document.querySelectorAll(".add-button")[1];
addSub.addEventListener("click",()=>{
    document.querySelectorAll(".popup-child-container")[1].style.display = "none";
    document.querySelector(".popup-container").style.display = "none";
    var name = document.querySelectorAll(".text-field")[1].value;
    document.querySelectorAll(".text-field")[1].value  = null;
    cardsList[tempIndex].subTaskList.push(new Subtask(name,false));
    render();
});
///constructor function
function Card(heading,subTaskList){
    this.heading = heading;
    this.subTaskList = subTaskList;
}

//constructor function
function Subtask(name,isMarked){
    this.name = name;
    this.isMarked = isMarked;
}

