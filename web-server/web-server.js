const express = require("express");
const path = require("path");

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, "public")));

// 📌 make `/texts/` to `texts/index.html`
app.get("/texts/", (req, res) => res.sendFile(path.join(__dirname, "public", "texts", "index.html")));

// 📌 make `/text/:id/` to `text/index.html` (id.list)
app.get("/text/:id/", (req, res) => res.sendFile(path.join(__dirname, "public", "text", "index.html")));

// 📌 make `/text/:id/read/:page` to `text/read/index.html` (text content)
app.get("/text/:id/read/:page", (req, res) => res.sendFile(path.join(__dirname, "public", "text", "read", "index.html")));

app.listen(PORT, () => console.log(`✅ Web server running on http://localhost:${PORT}`));
