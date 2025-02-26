const itemsPerPage = 100; // The max number of the buttons that show on each page
let totalChapters = 0;
let currentPage = 1;


function getTextIdFromURL() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[2] || 1; 
}
const textId = getTextIdFromURL();


async function fetchTotalChapters() {
    try {
        const response = await fetch(`http://localhost:3000/api/text/${textId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        totalChapters = data.totalPages; 

        renderChapterLinks(currentPage); 
    } catch (error) {
        console.error("Get total chapters failed:", error.message);
        alert("Cannot Get Chapters");
    }
}


function renderChapterLinks(page) {
    const linkContainer = document.getElementById('link-container');
    if (!linkContainer) return;

    linkContainer.innerHTML = ''; 

    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalChapters);

    for (let i = startIndex; i <= endIndex; i++) {
        const link = document.createElement('a');
        link.href = `../../text/${novelId}/read/${i}`;
        link.textContent = `Text ${i}`;
        link.className = 'btn';
        linkContainer.appendChild(link);
    }
}


function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderChapterLinks(currentPage);
    } else {
        alert('It is the first page!');
    }
}


function nextPage() {
    if (currentPage < Math.ceil(totalChapters / itemsPerPage)) {
        currentPage++;
        renderChapterLinks(currentPage);
    } else {
        alert('It is the end page');
    }
}


function jumpToPage() {
    const pageInput = document.getElementById('page-input');
    const targetPage = parseInt(pageInput.value, 10);

    if (targetPage >= 1 && targetPage <= Math.ceil(totalChapters / itemsPerPage)) {
        currentPage = targetPage;
        renderChapterLinks(currentPage);
    } else {
        alert('Invalid page number！');
    }
}

// 頁面載入時執行
document.addEventListener("DOMContentLoaded", fetchTotalChapters);
