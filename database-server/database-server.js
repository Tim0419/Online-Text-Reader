const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "database"))); // 📌 File storage path

const DATABASE_PATH = path.join(__dirname, "database/texts"); 

// 📌 Get table of contents of the texts
app.get("/api/texts", (req, res) => {
    fs.readdir(DATABASE_PATH, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot Get the file storage path" });

        const texts = files.map((id) => {
            const titlePath = path.join(DATABASE_PATH, id, "title.json");
            let title = `Text ${id}`;

            // 📌 If `title.json` exists, read the title of text
            if (fs.existsSync(titlePath)) {
                const rawData = fs.readFileSync(titlePath, "utf-8");
                const titleData = JSON.parse(rawData);
                title = titleData.title || title;
            }

            return { id, title };
        });

        res.json(texts);
    });
});

// 📌 Get the numbers of the chapters of the texts
app.get("/api/text/:id/pages", (req, res) => {
    const textPath = path.join(DATABASE_PATH, req.params.id, "text"); 

    if (!fs.existsSync(textPath)) return res.status(404).json({ error: "The text does NOT exist" });

    fs.readdir(textPath, (err, files) => {
        if (err || !files.length) return res.status(404).json({ error: "There are no available chapter" });

        res.json({ totalPages: files.filter(file => file.endsWith(".txt")).length });
    });
});

// 📌 Get the content of the chapters of the texts
app.get("/api/text/:id/read/:page", (req, res) => {
    const filePath = path.join(DATABASE_PATH, req.params.id, "text", `p${req.params.page}.txt`);

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Chapter does NOT exist" });

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Cannot read the chapter" });

        res.json({ content: data });
    });
});

app.listen(3000, () => console.log("✅ Database API server running on http://localhost:3000"));
