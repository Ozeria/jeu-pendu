const listWords = ["javascript", "html", "css", "developpement", "believemy", "web", "vue", "git", "github", "react", "rocket"
];

const NBTRYMAX = 11;
const NBWORDS = listWords.length;
const listKeyClicked = [];
let gameOver = false;

console.log(NBWORDS);

function getNumberRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getWordToFind(position) {
    return listWords[position];
}

function updateInfos(idElt, value) {
    /*  console.log('value: ', value);
     console.log('idElt: ', idElt); */
    document.getElementById(idElt).innerHTML = '<strong>' + value + '</strong>';
}

function addStyleLetter(keyClicked, sNomClass) {
    const keys = document.querySelectorAll('.input-lettre');
    keys.forEach((key) => {
        let sKey = key.getAttribute('data-lettre');
        if (sKey == keyClicked) {
            // console.log("ajout class");
            key.classList.add(sNomClass);
        }
    });
}

function displayResult(value) {
    // console.log('value toto: ', value);
    document.getElementById('resultat').removeAttribute('class');
    document.getElementById('message-resultat').innerHTML = value;
    removeClickLetter();
    document.removeEventListener('keyup', keyUp, false);
    gameOver = true;
}

function displayWordHidden(word) {
    let wordToFind = document.getElementById('wordToFind');
    for (let index = 0; index < word.length; index++) {
        let underscore = document.createElement("li");
        underscore.textContent = "_";
        underscore.className = `underscore`;
        underscore.setAttribute("id", `car${index}`);
        wordToFind.appendChild(underscore);
    }
}

// $('.input-lettre').click(tryFindCar);
function addClickLetter() {
    const keys = document.querySelectorAll('.input-lettre');
    keys.forEach((key) => {
        let sKey = key.getAttribute('data-lettre');
        if (sKey != null) {
            key.addEventListener("click", () => {
                tryFindCar(sKey);
            });
        }
    });
}

function removeClickLetter() {
    const keys = document.querySelectorAll('.input-lettre');
    keys.forEach((key) => {
        let sKey = key.getAttribute('data-lettre');
        if (sKey != null) {
            key.removeEventListener("click", tryFindCar, false);
        }
    });
}

function printHanged(nbErr) {
    switch (nbErr) {
        case 1:
            context.beginPath(); // On démarre un nouveau tracé
            context.lineCap = 'round';
            context.lineWidth = "10";
            context.lineJoin = 'round';
            context.strokeStyle = "rgb(23, 145, 167)";
            context.moveTo(35, 295);
            context.lineTo(5, 295);
            context.stroke();
            break;
        case 2:
            context.moveTo(20, 295);
            context.lineTo(20, 5);
            context.stroke();
            break;
        case 3:
            context.lineTo(200, 5);
            context.stroke();
            break;
        case 4:
            context.lineTo(200, 50);
            context.stroke();
            break;
        case 5:
            context.moveTo(20, 50);
            context.lineTo(70, 5);
            context.stroke();
            break;
        case 6:
            context.beginPath();
            context.fillStyle = "red";
            context.arc(200, 50, 20, 0, Math.PI * 2);
            context.fill();
            break;
        case 7:
            context.beginPath();
            context.strokeStyle = "red";
            context.moveTo(200, 50);
            context.lineTo(200, 150);
            context.stroke();
            break;
        case 8:
            context.beginPath();
            context.moveTo(200, 80);
            context.lineTo(160, 110);
            context.stroke();
            break;
        case 9:
            context.beginPath();
            context.moveTo(200, 80);
            context.lineTo(240, 110);
            context.stroke();
            break;
        case 10:
            context.beginPath();
            context.moveTo(200, 150);
            context.lineTo(180, 200);
            context.stroke();
            break;
        case 11:
            context.beginPath();
            context.moveTo(200, 150);
            context.lineTo(220, 200);
            context.stroke();
            context.beginPath();
            context.fillStyle = "rgb(23, 145, 167)";
            context.arc(200, 62, 16, 0, Math.PI * 2);
            context.fill();
            context.beginPath();
            context.fillStyle = "red";
            context.arc(200, 50, 20, 0, Math.PI * 2);
            context.fill();
            break;
        default:
            nbErr = 0;
            context.clearRect(0, 0, 300, 300);
    }
}

function revealPositionsForLetter(letter) {
    let foundThisTurn = 0;
    for (let i = 0; i < wordToFind.length; i++) {
        if (wordToFind[i] === letter) {
            const slot = document.getElementById("car" + i);
            if (slot && slot.textContent === "_") {
                slot.textContent = letter;
                foundThisTurn++;
            }
        }
    }
    return foundThisTurn;
}

function tryFindCar(key) {
    // console.log("go " + key);
    if (gameOver) return;

    const keyClicked = key.toUpperCase();
    console.log('letterClicked: ', keyClicked);

    // Lettre déjà jouée ?
    if (listKeyClicked.includes(keyClicked)) {
        console.log("La lettre a déjà été pressée.");
        return;
    }

    listKeyClicked.push(keyClicked);
    nbTry++;
    updateInfos("nbTry", nbTry);

    const foundCount = revealPositionsForLetter(keyClicked);
    if (foundCount > 0) {
        nbCarFind += foundCount;
        addStyleLetter(keyClicked, "letter-find");
        updateInfos("nbCarFind", nbCarFind);

        // Condition de victoire
        if (nbCarFind === nbCar) {
            displayResult("<h2>Bravo 🎉</h2><h3>Vous avez trouvé : " + wordToFind + "</h3>");
        }
    } else {
        addStyleLetter(keyClicked, "letter-nofind");
        if (nbErr < NBTRYMAX) nbErr++;
        updateInfos("nbErr", nbErr);
        printHanged(nbErr);

        // Condition de défaite
        if (nbErr >= NBTRYMAX) {
            removeClickLetter();
            displayResult("<h2>Vous avez perdu</h2><h3>Le mot caché était : " + wordToFind + "</h3>");
        }
    }
}

let numberRandom = 0;
numberRandom = getNumberRandom(NBWORDS);

let wordToFind = getWordToFind(numberRandom);
wordToFind = wordToFind.toUpperCase();
console.log('wordToFind: ', wordToFind);

let nbCar = wordToFind.length;
console.log('nbCar: ', nbCar);
let nbCarFind = 0;
let nbTry = 0;
let nbErr = 0;

document.getElementById('nbCar').innerHTML = '<strong>' + nbCar + '</strong>';
document.getElementById('nbCarFind').innerHTML = '<strong>' + nbCarFind + '</strong>';
document.getElementById('nbTry').innerHTML = '<strong>' + nbTry + '</strong>';
document.getElementById('nbErr').innerHTML = '<strong>' + nbErr + '</strong>';

displayWordHidden(wordToFind);
addClickLetter();

function keyUp(e) {
    console.log('e: ', e.key);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        tryFindCar(e.key);
    }
    else {
        console.log("la touche pressée " + e.key + " n'est pas une lettre");
    }
}

document.addEventListener('keyup', keyUp, false);


var buttonPlay = document.getElementById('buttonPlay');
buttonPlay.addEventListener('click', function () {
    location.reload();
}, false);

var boutonTest = document.getElementById('testerLettre');
var context;
var canvas = document.getElementById('mon_canvas');


window.onload = function () {
    if (!canvas) {
        alert("Impossible de récupérer le canvas");
    } else {
        context = canvas.getContext('2d');
        if (!context) {
            alert("Impossible de récupérer le context du canvas");
        }
    }
}
