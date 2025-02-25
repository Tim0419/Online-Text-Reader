// 解析 URL，取得章節編號 (chapterId) 和頁數 (pageNum)
function extractParamsFromURL() {
    const path = window.location.pathname; // 取得當前網址的路徑
    const match = path.match(/\/novel\/(\d+)\/read\/(\d+)/);
    if (match) {
        return { chapterId: parseInt(match[1]), pageNum: parseInt(match[2]) };
    }
    return { chapterId: 1, pageNum: 1 }; // 預設章節與頁數
}

let { chapterId, pageNum } = extractParamsFromURL();
let totalPageCount = 1; // 該章節的最大頁數

// 讀取該章節的總頁數
async function fetchTotalPageCount() {
    try {
        const response = await fetch(`http://localhost:3000/api/novel/${chapterId}/pages`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        totalPageCount = data.totalPages;
        console.log(`Chapter ${chapterId} has ${totalPageCount} pages.`);
    } catch (error) {
        console.error(`Error fetching total pages for Chapter ${chapterId}:`, error.message);
        alert("無法載入頁數資訊，請稍後再試。");
    }
}

// 讀取並顯示當前頁面內容
async function fetchPageContent() {
    try {
        const response = await fetch(`http://localhost:3000/api/novel/${chapterId}/read/${pageNum}`);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        
        const data = await response.json();
        const contentContainer = document.querySelector(".container2");

        // 將 `\n` 拆分成多個 `<p></p>` 段落
        const formattedContent = `<p>${data.content.replace(/\n/g, "</p><p>")}</p>`;

        // 更新頁面標題與內容
        document.title = `第${pageNum}章`;
        contentContainer.innerHTML = `<h1>第${pageNum}章</h1>${formattedContent}`;
    } catch (error) {
        console.error(`Error fetching content for Chapter ${chapterId}, Page ${pageNum}:`, error.message);
        alert("無法載入內容，請稍後再試。");
    }
}


// 切換到上一頁
function goToPreviousPage() {
    if (pageNum > 1) {
        pageNum--;
        updateURLAndLoadContent();
    } else {
        alert("已經是第一頁！");

    }
    window.scrollTo(0, 0);
}

// 切換到下一頁
function goToNextPage() {
    if (pageNum < totalPageCount) {
        pageNum++;
        updateURLAndLoadContent();
    } else {
        alert("已經是最後一頁！");
    }
    window.scrollTo(0, 0);
}

// 更新 URL 並重新載入頁面內容
function updateURLAndLoadContent() {
    history.pushState(null, "", `/novel/${chapterId}/read/${pageNum}`);
    fetchPageContent();
}

// 初始化頁面
async function initializePage() {
    await fetchTotalPageCount(); // 先讀取總頁數
    fetchPageContent(); // 再讀取當前頁面內容
}

window.onload = initializePage;
