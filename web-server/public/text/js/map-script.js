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
        link.href = `../../text/${textId}/read/${i}`;
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


document.addEventListener("DOMContentLoaded", fetchTotalChapters);
