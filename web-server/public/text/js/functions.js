/*
    ONLINE-TEXT-READER Copyright (C) 2025 YI-EN JHAN  

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


let clickCount = [];
let mode = false;
let intervalId = null;

function speakContent() {
    const read_content = content;
    const utterance = new SpeechSynthesisUtterance(read_content);
    utterance.lang = "zh-TW";
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

function init_functions() {
    clickCount = [];
    clearInterval(intervalId);
    intervalId = null;
    speechSynthesis.cancel();
}
