const itemsPerPage = 100; // 每頁顯示的章節數
let totalChapters = 0;
let currentPage = 1;

// 取得 URL 參數中的 num1（書籍 ID）
function getBookIdFromURL() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[2] || 1; // 預設為第 1 本書
}
const novelId = getBookIdFromURL();
// 取得總章節數

async function fetchTotalChapters() {
    try {
        const response = await fetch(`http://localhost:3000/api/novel/${novelId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        totalChapters = data.totalPages; // `totalPages` 其實代表 **總章節數**

        renderChapterLinks(currentPage); // 初始化渲染章節連結
    } catch (error) {
        console.error("獲取總章節數失敗:", error.message);
        alert("無法獲取章節列表，請稍後再試。");
    }
}

// 渲染章節連結
function renderChapterLinks(page) {
    const linkContainer = document.getElementById('link-container');
    if (!linkContainer) return;

    linkContainer.innerHTML = ''; // 清空容器

    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalChapters);

    for (let i = startIndex; i <= endIndex; i++) {
        const link = document.createElement('a');
        link.href = `../../novel/${novelId}/read/${i}`; // 連結到 `/read/{chapter}`
        link.textContent = `第${i}章`;
        link.className = 'btn';
        linkContainer.appendChild(link);
    }
}

// 跳轉上一頁章節列表
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderChapterLinks(currentPage);
    } else {
        alert('已經是第一頁！');
    }
}

// 跳轉下一頁章節列表
function nextPage() {
    if (currentPage < Math.ceil(totalChapters / itemsPerPage)) {
        currentPage++;
        renderChapterLinks(currentPage);
    } else {
        alert('已經是最後一頁！');
    }
}

// 跳轉到指定章節頁
function jumpToPage() {
    const pageInput = document.getElementById('page-input');
    const targetPage = parseInt(pageInput.value, 10);

    if (targetPage >= 1 && targetPage <= Math.ceil(totalChapters / itemsPerPage)) {
        currentPage = targetPage;
        renderChapterLinks(currentPage);
    } else {
        alert('無效的頁碼！');
    }
}

// 頁面載入時執行
document.addEventListener("DOMContentLoaded", fetchTotalChapters);
