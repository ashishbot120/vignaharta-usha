# Vignaharta Usha — Frontend (Client)

Frontend for **Vignaharta Usha**, a full-stack real estate website built with **React (Vite)** and **Tailwind CSS**, connected to a **Node.js + Express + MongoDB** backend (deployed on Render).  

---

## ✨ Features

- Modern UI with **React + Tailwind**
- Responsive layout
- Dynamic content from backend APIs
- Admin panel for managing content
- Authentication (JWT-based)
- Clean and scalable project structure

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- React Router
- Axios / Fetch API
- Vercel (deployment)

---

PROJECT STRUCURE:
client/
src/
components/
pages/
routes/
services/ # API calls (axios/fetch)
context/ # Auth / global state
assets/
App.jsx
main.jsx
public/
index.html
vite.config.js
tailwind.config.js
package.json

## ⚙️ Setup & Run Locally

bash
git clone <your-repo-link>
cd client
npm install

Create .env file:
VITE_API_BASE_URL=http://localhost:5000
npm run dev

🔐 Admin Access

The application includes an Admin Panel to manage website content dynamically.

🔗 Access Admin Login

Navigate to:

/admin
eg:https://vignaharta-usha.vercel.app/admin

🧾 Admin Credentials

You can use the following credentials:

Email: admin@gmail.com 
Password: 1234 

How It Works
Admin enters email & password
Request is sent to backend API (/api/auth/admin)
Backend verifies credentials and returns a JWT token
Token is stored in:
localStorage / cookies (depending on implementation)
Token is used for authorized requests (e.g., updating content)

Protected Routes
Admin pages are protected using authentication.
If user is not logged in:
Redirected to /admin/login
Example protected routes:
/admin/dashboard 

