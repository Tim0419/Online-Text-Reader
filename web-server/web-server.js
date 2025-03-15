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
const path = require("path");

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, "public")));


app.get("/texts/", (req, res) => res.sendFile(path.join(__dirname, "public", "texts", "index.html")));


app.get("/text/:id/", (req, res) => res.sendFile(path.join(__dirname, "public", "text", "index.html")));


app.get("/text/:id/read/:page", (req, res) => res.sendFile(path.join(__dirname, "public", "text", "read", "index.html")));

app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));
