# [Disclaimer](https://github.com/Tim1000419/Online-Text-Reader/blob/main/LICENSE)

This software is released under the **[GPL-3.0 License](https://www.gnu.org/licenses/)**, allowing users to freely use, modify, and distribute it.  

**This software is intended for legal use only. The developers are not responsible for any misuse or illegal activities involving this software.**  

By using this software, you agree to take full responsibility for its usage. The developers provide no warranty or legal liability.

---

# Introduction

---

# Functions

---

# Structure
## 1. File Structure
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
│   │   │   │   └── table-style.css
│   │   │   └── js/
│   │   │       ├── functions.js
│   │   │       ├── script.js
│   │   │       └── table-script.js
│   │   └── index.html
│
├── api-server/
│   ├── api-server.js
│   ├── database/
│   │   ├── texts/
│   │   │   ├── {num}/
│   │   │   │   ├── text
│   │   │   │   │   ├── p{num2}.txt // text content
│   │   │   │   └── title.json
│   │   │   └── ...
|
└──...
```
## 2. URL Structure
   - Web
      - The table of content of the texts: `/texts`
      - The table of content of the text pages: `/text/{num}`
      - The reader: `/text/{num}/read/{num2}`
   - API(database)
      - The number and title of texts: `api/texts`
        - Response 
          ```json
          {
             "id": "your_id"
             "title": "your_title"
          }
      - The total pages of the text: `/api/text/{num}/pages`
         - Response
           ```
           {
              "totalPages": num
           }
           ```
      - The content:　`/api/text/{num}/read/{num2}`
         - Response
           ```json
           {
              "content": "your_content"
           }
           ```

---

# Environment Build by Node.js
1. Install [Node.js](https://nodejs.org/) or
   - Linux/macOS
      ```bash
      curl -o- https://fnm.vercel.app/install | bash
      fnm install 22
      ```
   - Windows
      ```batch
      winget install Schniz.fnm
      fnm install 22
      ```

2. Install modules
    - For web-server
        ```
        npm install express path
        ```
    - For database-server
        ```
        npm install express cors path fs
        ```

---

# Start to use
1. Where to put text: database-server/database/texts/{num}/text/ <-- here
2. Where should you modify:
   - web-server/public/texts/js/script.js `const API_URL = "http://localhost:3000(here)/api/texts";`
   - web-server/public/text/js/table-script.js `const API_URL = "http://localhost:3000(here)";`
   - web-server/public/text/js/script.js `const API_URL = "http://localhost:3000(here)";`
3. How to set the title of text: database-server/database/texts/{num}/title.json
  ```json
  {
    "title": "your title"
  }
  ```
