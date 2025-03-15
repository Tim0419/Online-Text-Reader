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

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const app = express();

/*
const Allowed_Origins = [];

const corsOptions = {
    origin: Allowed_Origins,
    medthods: ["GET"],
    allowedHeaders: ['Authorization', 'Content-Type', 'x-api-key']
};

app.use(cors(corsOptions));

*/

app.use(cors());

app.use(express.static(path.join(__dirname, "database"))); 

const DATABASE_PATH = path.join(__dirname, "database/texts"); 

app.get("/api/texts", (req, res) => {
    fs.readdir(DATABASE_PATH, (err, files) => {
        if (err) return res.status(500).json({ error: "Cannot Get the file storage path" });
        files.sort((a,b) => parseInt(a) - parseInt(b));
        const texts = files.map((id) => {
            const titlePath = path.join(DATABASE_PATH, id, "title.json");
            let title = `Text ${id}`;

            
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


app.get("/api/text/:id/pages", (req, res) => {
    const textPath = path.join(DATABASE_PATH, req.params.id, "text"); 

    if (!fs.existsSync(textPath)) return res.status(404).json({ error: "The text does NOT exist" });

    fs.readdir(textPath, (err, files) => {
        if (err || !files.length) return res.status(404).json({ error: "There are no available pages" });

        res.json({ totalPages: files.filter(file => file.endsWith(".txt")).length });
    });
});

app.get("/api/text/:id/read/:page", (req, res) => {
    const filePath = path.join(DATABASE_PATH, req.params.id, "text", `p${req.params.page}.txt`);

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "The page does NOT exist" });

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Cannot read the page" });

        res.json({ content: data });
    });
});

app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
