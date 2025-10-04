const addWaitress = document.querySelector(".add-staff")
let addInputLabel = document.querySelector(".add-server label")
let addInput = document.querySelector(".add-server input")
let waitStaff = document.querySelector(".waitstaff")
let serverButton = document.querySelector("#server-button")
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
    console.log(countEl)

let count = 0

addWaitress.addEventListener("click", function (){
    let onFloor = addInput.value;
    if (onFloor !==""){
        addToFloor(onFloor);
        clearFloor();
        //updateFloorPlan();
    }
});

let clearFloor = function (){
    addInput.value = "";
};

let addToFloor = function (onFloor){
    let serverList = document.createElement("li");
    serverList.innerText = onFloor;
    waitStaff.append(serverList);
};

function server(){
    count += 1
    countEl.textContent= count
}

function save(){
    let countStr = count + " - "
    saveEl.textContent += countStr
    countEl.textContent = 0
    count = 0
    console.log(count)
}
