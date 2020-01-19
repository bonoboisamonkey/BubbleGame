let isClicked = false;
let interval = null, anotherInterval = null;
let time = 1000;
const area = document.getElementsByClassName("game-area")[0];
let intervals = [];
let cntd = null;
let score = 0;

const user = getCookie("username");

checkLogedIn();

function checkLogedIn(){
    if(user!=""){
        gameStart();
        clearCokies();
    }else{
        document.location="login.html";
    }
}

function clearCokies(){
    document.cookie= "username=;"
}

function gameStart() {
    document.getElementById("start").addEventListener("click", () => {
        if (!isClicked) {
            isClicked = true;
            let scoreSpan = document.createElement("span");
            scoreSpan.id = "score";
            scoreSpan.innerText = 0;
            document.getElementsByClassName("score")[0].appendChild(scoreSpan);

            loadCounter();

            let levelSpan = document.createElement("span");
            levelSpan.id = "level";
            levelSpan.innerText = 0;
            document.getElementsByClassName("level")[0].appendChild(levelSpan);

            anotherInterval = setInterval(() => {
                time -= 100;
                let levelEl = document.getElementById("level");
                let level = parseInt(levelEl.innerText);
                level++;
                levelEl.innerText = level;

                intervals.push(setInterval(() => {
                    let element = document.createElement("span");
                    element.className = "bubble";
                    let ts = createRondomNumber(560);
                    let ls = createRondomNumber(500);
                    element.style.top = `${ts}px`;
                    element.style.left = `${ls}px`;
                    area.appendChild(element);

                    element.addEventListener("click", function (e) {
                        e.stopPropagation();
                        this.remove();
                        let scoreEl = document.getElementById("score");
                        score = parseInt(scoreEl.innerText);
                        score++;
                        scoreEl.innerText = score;
                        time += 50;
                    })
                    if (time < 0) {
                        cntd.innerText = `your score is: ${score}`;
                        resetAll();
                    }
                }, time));
            }, 10000);
        }
    })

    area.addEventListener("click", () => {
        resetAll();
        alert(`your score is: ${score}`);
    })
}

function createRondomNumber(mul) {
    let num = Math.random();
    return Math.round(num * mul);
}


function getCookie(cname) {
    let name = cname + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let arr = decodeCookie.split(';');

    for (let i = 0; i < arr.length; i++) {
        let word = arr[i];

        while (word.charAt(0) == ' ') {
            word = word.substring(1);
        }

        if (word.indexOf(name) == 0) {
            return word.substring(name.length, word.length);
        }
    }
    return "";
}

function resetAll() {
    isClicked = false;
    document.getElementById("score").remove();
    document.getElementById("level").remove();
    document.getElementsByClassName("game-area")[0].innerHTML = "";
    clearInterval(anotherInterval);
    intervals.forEach(anotherInterval => clearInterval(anotherInterval));
}


function loadCounter() {
    let counter = 10;
    let itl = null;
    cntd = document.getElementById("countDown");

    itl = setInterval(() => {
        if (counter == 0) {
            clearInterval(itl);
        } else {
            counter--;
            cntd.innerText = `${user} Be Ready in ${counter} sec`;
        }
    }, 1000);
}