const body = document.body;
let backgroundTheme = document.querySelector(".background-theme")
const background = document.getElementById("backgrounds")
const addWaitress = document.querySelector(".add-staff")
let addInput = document.querySelector(".add-server input")
let addServerSection = document.querySelector(".add-server")
let waitStaff = document.querySelector(".waitstaff")
let doneButton = document.querySelector(".end-list")

window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

background.addEventListener("change", function (){
    let theme = background.value;

    body.classList.remove("fall", "halloween", "thanksgiving");

    if (theme === "fall"){
        body.classList.add("fall");
    }   else if (theme === "halloween"){
        body.classList.add("halloween");
    }   else if (theme === "thanksgiving"){
        body.classList.add("thanksgiving");
    }

    localStorage.setItem("theme", theme);
});

addWaitress.addEventListener("click", function (){
    let serverName = addInput.value.trim();
    if (serverName !==""){
        addToFloor(serverName);
        addInput.value= "";
        saveToLocalStorage();
    }
});

doneButton.addEventListener("click", function (){
    addServerSection.style.display="none";
    backgroundTheme.style.display="none";
});

let addToFloor = function (name){
    let serverList = document.createElement("li");
    serverList.classList.add("server-entry");
    
    let nameSpan = document.createElement("span");
    nameSpan.textContent = name;

    let countContainer = document.createElement("div");
    countContainer.classList.add("counter-container");

    let countDisplay = document.createElement("div");
    countDisplay.classList.add("count-display");
    countDisplay.textContent = "0";

    let quickTwo = document.createElement("button");
    quickTwo.textContent = "+2";
    quickTwo.addEventListener("click", function (){
        let count =parseInt(countDisplay.textContent);
        countDisplay.textContent = count + 2;
        saveToLocalStorage();
    });

    let quickFour = document.createElement("button");
    quickFour.textContent = "+4";
    quickFour.addEventListener("click", function (){
        let count =parseInt(countDisplay.textContent);
        countDisplay.textContent = count + 4;
        saveToLocalStorage();
    });

    let plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", function (){
        let count = parseInt(countDisplay.textContent);
        countDisplay.textContent = count + 1;
        saveToLocalStorage();
    });

    let minusBtn = document.createElement("button");
    minusBtn.textContent="-";
    minusBtn.addEventListener("click", function (){
        let count = parseInt(countDisplay.textContent);
        if (count > 0) {
            countDisplay.textContent = count - 1;
            saveToLocalStorage();
        }
    });
    
    let saveCount = document.createElement("button");
        saveCount.textContent = "SAVE";
        saveCount.addEventListener("click", function (){
            sortNextServer();
    });

    countContainer.appendChild(countDisplay);
    countContainer.appendChild(quickTwo);
    countContainer.appendChild(quickFour);
    countContainer.appendChild(plusBtn);
    countContainer.appendChild(minusBtn);
    countContainer.appendChild(saveCount);

    serverList.appendChild(nameSpan);
    serverList.appendChild(countContainer);

    waitStaff.appendChild(serverList);
};

    function sortNextServer(){
        let headCount = Array.from(document.querySelectorAll(".server-entry"));
        if (headCount.length === 0) return;

        headCount.sort((a,b) => {
            let lowCount = parseInt(a.querySelector(".count-display").textContent);
            let highCount = parseInt(b.querySelector(".count-display").textContent);
            return lowCount - highCount;
        });

    waitStaff.innerHTML = '';
    headCount.forEach(entry=>{
        waitStaff.appendChild(entry);
    });
        saveToLocalStorage();
}

function loadFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem("servers"));
    const theme = localStorage.getItem("theme");

    if (theme) {
        background.value = theme;
        body.classList.add(theme);
    }

    if (saved && Array.isArray(saved)) {
        saved.forEach(server => {
            addToFloor(server.name, server.count);
        });
    }
}


