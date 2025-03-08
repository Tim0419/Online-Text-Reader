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

async function initializePage() {
    await fetchTotalPageCount(); 
    fetchPageContent(); 
}

window.onload = initializePage;
