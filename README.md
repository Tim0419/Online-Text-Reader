# File Structure
```
Online-Text-Reader/
│
├── web-server/
│   ├── web-server.js
│   ├── public/
│   │   ├── texts/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       └── script.js
│   │   ├── text/
│   │   │   ├── index.html
│   │   │   ├── read/
│   │   │   │   └── index.html
│   │   │   ├── css/
│   │   │   │   ├── style.css
│   │   │   │   └── map-style.css
│   │   │   └── js/
│   │   │       ├── script.js
│   │   │       └── map-script.js
│   │   └── index.html
│
├── database-server/
│   ├── database-server.js
│   ├── database/
│   │   ├── texts/
│   │   │   ├── {num}/
│   │   │   │   ├── text
│   │   │   │   │   ├── p{num}.txt // text content
│   │   │   │   └── title.json
│   │   │   └── ...
|
└──...
```

---

# Environment Build by Node.js
1. Install [Node.js](https://nodejs.org/) or
   ```
   winget install Schniz.fnm
   fnm install 22
   ```

2. Install modules
    1. For web-server
        ```
        npm install express
        ```
    2. For database-server
        ```
        npm install express cors
        ```

---

# Start to use
1. Where to put text: database-server/database/texts/{num}/text/ <-- here
2. How to set the title of text: database-server/database/texts/{num}/title.json
  ```json
  {
    "title": "your title"
  }
  ```
  
