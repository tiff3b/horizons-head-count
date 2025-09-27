let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
    console.log(countEl)

let count = 0

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
