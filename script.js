const subjectInput=document.getElementById("subjectInput");
const timerText=document.getElementById("timer");
const totalTimeText=document.getElementById("totalTime");
const sessionList=document.getElementById("sessionList");
let timer=null;
let seconds=0;
let currentSubject="";
let sessions=JSON.parse(localStorage.getItem("studySessions")) || [];
function updateDisplay() {
    const hrs=String(Math.floor(seconds/3600)).padStart(2,"0");
    const mins=String(Math.floor((seconds%3600)/60)).padStart(2,"0");
    const secs=String(seconds%60).padStart(2,"0");
    timerText.textContent=`${hrs}:${mins}:${secs}`;
}
function startSession() {
    if (timer) {
        return;
    }
    currentSubject=subjectInput.value.trim();
    if (currentSubject==="") {
        alert ("Please enter a subject first!");
        return;
    }
    timer=setInterval(()=>{
        seconds++;
        updateDisplay();
    }, 1000);
}
function stopSession() {
    if (!timer) {
        return;
    }
    clearInterval(timer);
    timer=null;
    const minutes=Math.ceil(seconds/60);
    const session={
        subject: currentSubject,
        minutes: minutes
    };
    sessions.push(session);
    localStorage.setItem("studySessions", JSON.stringify(sessions));
    renderSessions();
    seconds=0;
    updateDisplay();
    subjectInput.value="";
}
function renderSessions() {
    sessionList.innerHTML="";
    let totalMinutes=0;
    sessions.forEach((item)=>{
        totalMinutes+=item.minutes;
        const li=document.createElement("li");
        li.textContent=`${item.subject}-${item.minutes}min`;
        sessionList.appendChild(li);
    });
    totalTimeText.textContent=`${totalMinutes}min`;
}
document.getElementById("startBtn").addEventListener("click", startSession);
document.getElementById("stopBtn").addEventListener("click", stopSession);
renderSessions();