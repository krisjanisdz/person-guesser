# Latvian Guesser - Project Setup Guide

Welcome to the **Latvian People Guesser** project! 🎉

This repository contains both the **frontend** (Vue.js) and **backend** (Node.js + Express + MongoDB) for the game.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

First, open **VS Code** and **open the terminal** (`Ctrl + ~` on Windows/Linux, `Cmd + ~` on Mac).

Run the following command in the terminal to clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with the actual GitHub repository URL.

Then, navigate into the project folder:

```bash
cd YOUR-REPO-NAME
```

---

## 🎯 Contributing (after installation)

1. Before making any changes, checkout to your own branch:
   ```bash
   git checkout -b your-feature-branch
   ```
2. After making changes, commit and push:
   ```bash
   git add .
   git commit -m "Added new feature"
   ```
3. Open a **Pull Request** on GitHub.

---

## 🏗️ Backend Setup (Node.js + Express + MongoDB)

### 2️⃣ Install Dependencies

Navigate to the `back-end` folder and install required packages:

```bash
cd back-end
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the `back-end` folder:

```bash
touch .env
```

Then open `.env` in VS Code and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Replace `your_mongodb_connection_string` with the actual MongoDB **connection string**.

### 4️⃣ Start the Backend Server

Run:

```bash
npm start
```

If everything is working, you should see:

```
Server running on port 3001
Connected to MongoDB!
```

---

## 🎨 Frontend Setup (Vue.js + TailwindCSS + DaisyUI)

### 5️⃣ Install Frontend Dependencies

Open a new terminal, navigate to the `latvian-guesser` folder, and install dependencies:

```bash
cd ../latvian-guesser
npm install
```

### 6️⃣ Start the Frontend Development Server

Run:

```bash
npm run dev
```

You should see the project running at:

```
Local: http://localhost:5173/
```

---

## 📝 Useful Commands

| Command                    | Description                           |
|----------------------------|---------------------------------------|
| `npm install`              | Install dependencies                  |
| `npm start`                | Start the backend server              |
| `npm run dev`              | Start the frontend development server |
| `git push`                 | Share your contribution               |
| `git pull origin main`     | Get the latest updates from GitHub    |
---

## ❓ Troubleshooting

- **Error: `MONGO_URI` is missing?** Make sure your `.env` file is properly set up.
- **Backend not running?** Ensure MongoDB is running.
- **Port issues?** Change the port in `.env` if 3001 is already in use.
