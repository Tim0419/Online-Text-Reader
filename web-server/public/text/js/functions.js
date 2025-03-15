let clickCount = [];
let mode = false;
let intervalId = null;

let crossPageScroll = null;


function speakContent() {
    const read_content = content;
    const utterance = new SpeechSynthesisUtterance(read_content);
    utterance.lang = "en-US";
    utterance.rate = 1.2;
    utterance.volume = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    speechSynthesis.cancel();
}

document.addEventListener("click", function() {
    const now = Date.now();
    clickCount.push(now);

    if (clickCount.length > 2) {
        clickCount.shift();
    }

    if (clickCount.length === 2 && (clickCount[1] - clickCount[0] <= 500)) {
        clearInterval(crossPageScroll);
        crossPageScroll = null;
        if (!intervalId) {
            intervalId = setInterval(() => {
                window.scrollBy(0, 1);
            }, 15);
        } else {
            clickCount = [];
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        gotoPage(1);
    } else if (event.key === "ArrowLeft") {
        gotoPage(-1);
    }
});

function scrolldownCrossPage() {
    clearInterval(intervalId);
    intervalId = null;
    if (crossPageScroll) {
        clearInterval(crossPageScroll);
        crossPageScroll = null;
    } else {
        crossPageScroll = setInterval(() => {
            window.scrollBy(0, 1);
        }, 20);
    }
}

function init_functions() {
    clickCount = [];
    clearInterval(intervalId);
    intervalId = null;
    speechSynthesis.cancel();
}
 