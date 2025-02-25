async function fetchDataA() {
    const apiUrl = "http://localhost:3000/api/texts";

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API request failed with status code: ${response.status}`);
        }

        const data = await response.json();
        renderButtons(data);
    } catch (error) {
        console.error("An error occurred while retrieving data:", error.message);
    }
}

// **Generate Button**
function renderButtons(items) {
    const container = document.getElementById('button-container');
    if (!container) {
        console.error("Cannot find the containers of the buttons :　#button-container");
        return;
    }

    container.innerHTML = ''; // Clear old content

    items.forEach(item => {
        const button = document.createElement('button');
        button.textContent = item.title || "Unnamed"; // Avoid empty title
        button.className = 'btn';
        button.onclick = () => window.location.href = `../../text/${item.id}/`;

        container.appendChild(button);
    });
}

// **Execute on load**
document.addEventListener("DOMContentLoaded", fetchDataA);
