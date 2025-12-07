const body = document.body;
let backgroundTheme = document.querySelector(".background-theme")
const background = document.getElementById("backgrounds")
const addWaitress = document.querySelector(".add-staff")
let addInput = document.querySelector(".add-server input")
let addServerSection = document.querySelector(".add-server")
let waitStaff = document.querySelector(".waitstaff")
let doneButton = document.querySelector(".end-list")
let endNight = document.querySelector(".end-night")

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

window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

background.addEventListener("change", function (){
    let theme = background.value;

    body.classList.remove("horizons", "fall", "halloween", "thanksgiving", "christmas", "new-year", "winter", "duck");
    localStorage.removeItem("theme");

    if (theme === "fall"){
        body.classList.add("fall");
    }   else if (theme === "halloween"){
        body.classList.add("halloween");
    }   else if (theme === "thanksgiving"){
        body.classList.add("thanksgiving");
    }   else if (theme === "christmas"){
        body.classList.add("christmas");
    }   else if (theme === "new-year"){
        body.classList.add("new-year");
    }   else if (theme === "winter"){
        body.classList.add("winter");
    }   else if(theme === "horizons"){
        body.classList.add("horizons");
    }   else if(theme === "duck"){
        body.classList.add("duck");
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

let addToFloor = function (name, count = 0){
    let serverList = document.createElement("li");
    serverList.classList.add("server-entry");
    
    let nameSpan = document.createElement("span");
    nameSpan.textContent = name;

    let countContainer = document.createElement("div");
    countContainer.classList.add("counter-container");

    let countDisplay = document.createElement("div");
    countDisplay.classList.add("count-display");
    countDisplay.textContent = count;

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

    let quickSix = document.createElement("button");
    quickSix.textContent = "+6";
    quickSix.addEventListener("click", function (){
        let count =parseInt(countDisplay.textContent);
        countDisplay.textContent = count + 6;
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

    let serverDone = document.createElement("button");
        serverDone.textContent = "CUT";
        serverDone.addEventListener("click", function (){
            if (confirm("Are you sure you want to remove server?") == true){
                serverList.remove();
                saveToLocalStorage();
            }              
        });


    countContainer.appendChild(countDisplay);
    countContainer.appendChild(quickTwo);
    countContainer.appendChild(quickFour);
    countContainer.appendChild(quickSix);
    countContainer.appendChild(plusBtn);
    countContainer.appendChild(minusBtn);
    countContainer.appendChild(saveCount);
    countContainer.appendChild(serverDone);

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
    endNight.addEventListener("click", function(){
    waitStaff.innerHTML= '';
    background.value = "horizons";
    body.classList.remove("horizons", "fall", "halloween", "thanksgiving", "christmas", "new-year", "winter", "duck");
    body.classList.add("horizons");
    localStorage.setItem("theme", "horizons");
    localStorage.removeItem("servers");

    addServerSection.style.display="flex";
    backgroundTheme.style.display="flex";
    addInput.value = "";
});

function saveToLocalStorage() {
    const serverEntries = document.querySelectorAll(".server-entry");
    const servers = Array.from(serverEntries).map(entry => {
        const name = entry.querySelector("span").textContent;
        const count = parseInt(entry.querySelector(".count-display").textContent);
        return { name, count };
    });

    localStorage.setItem("servers", JSON.stringify(servers));
}




