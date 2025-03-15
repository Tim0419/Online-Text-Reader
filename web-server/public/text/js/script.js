const API_URL = "http://localhost:3000";

let content = "";

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
        const response = await fetch(`${API_URL}/api/text/${textId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        totalPageCount = data.totalPages;
        console.log(`Text ${textId} has ${totalPageCount} pages.`);
    } catch (error) {
        console.error(`Error fetching total pages for Text ${textId}:`, error.message);
        alert("Failed to fetch total pages. Please try again later.");
    }
}

async function fetchPageContent() {
    try {
        const response = await fetch(`${API_URL}/api/text/${textId}/read/${pageNum}`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        content = data.content;
        const contentContainer = document.querySelector(".container2");


        const formattedContent = `<p>${data.content.replace(/\r\n/g, "</p><p>")}</p>`;


        document.title = `Page ${pageNum}`;
        contentContainer.innerHTML = `<h1>Page ${pageNum}</h1>${formattedContent}`;
    } catch (error) {
        console.error(`Error fetching content for Text ${textId}, Page ${pageNum}:`, error.message);
        alert("Failed to fetch content. Please try again later.");
    }
}

function gotoPage(location = 0 ,mode = 1){

    if (!location) return; 

    function golocation() {
        pageNum += location;
        updateURLAndLoadContent();
    }
    
    if (mode === 1) {
        if (location > 0) (pageNum < totalPageCount) ? golocation() : (alert("It is the last page!"));
        else (pageNum > 1) ? golocation() : (alert("It is the first page!"));
    } else if (mode === 2){
        pageNum = location;
        updateURLAndLoadContent();
    }
}

function updateURLAndLoadContent() {
    history.pushState(null, "", `/text/${textId}/read/${pageNum}`);
    init_functions()
    window.scrollTo(0, 0);
    fetchPageContent();
}

async function initializePage() {
    await fetchTotalPageCount();
    fetchPageContent();
}

window.onload = initializePage;