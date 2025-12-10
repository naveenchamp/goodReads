## 📚 GoodReads – Full-Stack Book Management App
A complete MERN-style full-stack application with:
✔ React Frontend  
✔ Node + Express Backend  
✔ SQLite database  
✔ CRUD operations (Add, Edit, Delete, View Books)
✔ Clean folder structure
✔ Single-command startup (npm run dev)
<img width="1875" height="881" alt="Image" src="https://github.com/user-attachments/assets/821b8068-2835-4b16-b7e5-8906390569b0" />

🗂 Project Folder Structure
goodReads/
│
├── backend/
│   ├── index.js
│   ├── goodreads.db
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── node_modules/
│
├── package.json   ← Root file for running both servers together
└── README.md

🚀 Features
• Display all books  
• View detailed information for each book  
• Add a new book  
• Edit an existing book  
• Delete a book  
• Fully responsive UI  
• Express API with SQLite DB  

🛠 Tech Stack
Frontend: React, React Router  
Backend: Node.js, Express.js  
Database: SQLite  
Tools: Nodemon, Concurrently  

▶ How to Run the App (one command)
1️⃣ Install all dependencies

Run inside root folder:

npm install


This installs dependencies for:

root

backend

frontend

2️⃣ Start backend + frontend together
npm run dev


This runs:

backend → localhost:3001
frontend → localhost:3000

🔌 API Endpoints
GET    /books/           → Get all books  
GET    /books/:id/       → Get a single book  
POST   /books/           → Add a new book  
PUT    /books/:id/       → Update a book  
DELETE /books/:id/       → Delete a book  

🖥 Screenshots
Landing Page
----------------------------------
[ Big header image + Title + Quote ]


Books List
----------------------------------
[ Each book card showing title, rating, description ]


Book Details
----------------------------------
[ Full details + Edit + Delete buttons ]

📌 Scripts
Root package.json contains:
"scripts": {
  "dev": "concurrently \"npm start --prefix backend\" \"npm start --prefix frontend\""
}

👨‍💻 Author
Naveen Reddy Tippasani  
GitHub: https://github.com/naveenchamp
