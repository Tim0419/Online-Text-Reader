
function extractParamsFromURL() {
    const path = window.location.pathname; 
    const match = path.match(/\/text\/(\d+)\/read\/(\d+)/);
    if (match) {
        return { textId: parseInt(match[1]), pageNum: parseInt(match[2]) };
    }
    return { textId: 1, pageNum: 1 }; 
}

let { textId, pageNum } = extractParamsFromURL();
let totalPageCount = 1; 


async function fetchTotalPageCount() {
    try {
        const response = await fetch(`http://localhost:3000/api/text/${textId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        totalPageCount = data.totalPages;
        console.log(`Text ${textId} has ${totalPageCount} pages.`);
    } catch (error) {
        console.error(`Error fetching total pages for text ${textId}:`, error.message);
        //alert("");
    }
}


async function fetchPageContent() {
    try {
        const response = await fetch(`http://localhost:3000/api/text/${textId}/read/${pageNum}`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        const contentContainer = document.querySelector(".container2");

        const formattedContent = `<p>${data.content.replace(/\n/g, "</p><p>")}</p>`;


        document.title = `${pageNum}`;
        contentContainer.innerHTML = `<h1>${pageNum}</h1>${formattedContent}`;
    } catch (error) {
        console.error(`Error fetching content for Text ${textId}, Page ${pageNum}:`, error.message);
        alert("Unable to load content, please try again later.");
    }
}

function init_functions() {
    clickCount = [];
    clearInterval(intervalId);
    intervalId = null;
    speechSynthesis.cancel();
}

function goToPreviousPage() {
    if (pageNum > 1) {
        pageNum--;
        updateURLAndLoadContent();
        init_functions();
        window.scrollTo(0, 0);
    } else {
        alert("It is the first page");

    }
    
}


function goToNextPage() {
    if (pageNum < totalPageCount) {
        pageNum++;
        updateURLAndLoadContent();
        init_functions();
        window.scrollTo(0, 0);
    } else {
        alert("It is the end page");
    }
}


function updateURLAndLoadContent() {
    history.pushState(null, "", `/text/${chapterId}/read/${pageNum}`);
    fetchPageContent();
}

function startSpeaking() {
    const content = data.content;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "zh-tw";
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    speechSynthesis.cancel();
}  



let click = [];
let intervalID = null
const clicktimes=2

document.addEventListener("click",function() {
    click.push(Date.now());

    if (click.length > clicktimes) {
        click.shift();
    }

    if (click.length === clicktimes && click[clicktimes -1] - click[0] <= 500){
        if (!intervalID) {
            intervalID = setInterval(() => {
                window.scrollBy(0,1);
            }, 15);
        } else {
            click = [];
            clearInterval(intervalID);
            intervalID = null;
        }
    }


});

async function initializePage() {
    await fetchTotalPageCount(); 
    fetchPageContent(); 
}

window.onload = initializePage;
