
function extractParamsFromURL() {
    const path = window.location.pathname; 
    const match = path.match(/\/text\/(\d+)\/read\/(\d+)/);
    if (match) {
        return { chapterId: parseInt(match[1]), pageNum: parseInt(match[2]) };
    }
    return { chapterId: 1, pageNum: 1 }; 
}

let { chapterId, pageNum } = extractParamsFromURL();
let totalPageCount = 1; 


async function fetchTotalPageCount() {
    try {
        const response = await fetch(`http://localhost:3000/api/text/${chapterId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        totalPageCount = data.totalPages;
        console.log(`Chapter ${chapterId} has ${totalPageCount} pages.`);
    } catch (error) {
        console.error(`Error fetching total pages for Chapter ${chapterId}:`, error.message);
        //alert("");
    }
}


async function fetchPageContent() {
    try {
        const response = await fetch(`http://localhost:3000/api/text/${chapterId}/read/${pageNum}`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        const contentContainer = document.querySelector(".container2");

        const formattedContent = `<p>${data.content.replace(/\n/g, "</p><p>")}</p>`;


        document.title = `${pageNum}`;
        contentContainer.innerHTML = `<h1>${pageNum}</h1>${formattedContent}`;
    } catch (error) {
        console.error(`Error fetching content for Chapter ${chapterId}, Page ${pageNum}:`, error.message);
        alert("Unable to load content, please try again later.");
    }
}



function goToPreviousPage() {
    if (pageNum > 1) {
        pageNum--;
        updateURLAndLoadContent();
    } else {
        alert("It is the first page");

    }
    window.scrollTo(0, 0);
}


function goToNextPage() {
    if (pageNum < totalPageCount) {
        pageNum++;
        updateURLAndLoadContent();
    } else {
        alert("It is the end page");
    }
    window.scrollTo(0, 0);
}


function updateURLAndLoadContent() {
    history.pushState(null, "", `/text/${chapterId}/read/${pageNum}`);
    fetchPageContent();
}


async function initializePage() {
    await fetchTotalPageCount(); 
    fetchPageContent(); 
}

window.onload = initializePage;
