let startingTime = 0;       
let countedTime = 0;         //czas od startu
let active = false;         
let interval = null;         

const display = document.getElementById("timeDisplay");

//default display
display.textContent = "00h 00min 00s";

function startStopwatch() {
    if (active === true) return;

    startingTime = Date.now() - countedTime;
    active = true;

    
    interval = setInterval(() => { //setInterval(code, delay)
        countedTime = Date.now() - startingTime;  //code to make it run repeatedly
        console.log(countedTime) // CHECK
        display.textContent = formatTime(countedTime);  
    }, 100); //delay co 100ms
}

function stopStopwatch() {  
    clearInterval(interval); //clears the code 
    interval = null;          
    active = false;           
}

function resetStopwatch() {
    stopStopwatch();          
    countedTime = 0;          
    display.textContent = "00h 00min 00s";  
}


function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}h ${pad(minutes)}min ${pad(seconds)}s`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
