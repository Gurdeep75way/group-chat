# Frontend - Group Chat Application

## 📌 Project Overview
This is the **frontend** of the Group Chat Application, built using modern web technologies to provide a seamless and responsive user experience.

## 🚀 Tech Stack
- **Framework:** React + Vite
- **State Management:** React Context API / Redux (if applicable)
- **Styling:** Tailwind CSS / SCSS
- **Routing:** React Router
- **API Handling:** Axios
- **Authentication:** JWT-based authentication
- **WebSockets:** (If applicable, mention socket implementation)

## 📂 Project Structure
```
frontend/
├── public/            # Static files (favicon, manifest, etc.)
├── src/
│   ├── assets/        # Images, icons, and styles
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages
│   ├── context/       # React Context API (if used)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API service functions
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point for React
│   ├── vite.config.ts # Vite configuration
├── .env               # Environment variables (ignored in Git)
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## 📦 Installation & Setup
Make sure you have **Node.js (v18 or later)** installed.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Gurdeep75way/group-chat.git
cd group-chat/frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Build for Production
```bash
npm run build
```

## 🔑 Environment Variables
Create a `.env` file in the root of the **frontend** folder and configure the necessary variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=ws://localhost:5000
```

## 🚀 Features
✅ User Authentication (JWT-based Login/Signup)  
✅ Real-time Messaging (via WebSockets)  
✅ Group Creation & Management  
✅ Secure API Calls with Token Handling  
✅ Responsive UI with Dark Mode Support  

## 🤝 Contributing
1. Fork the repo and create your branch: `git checkout -b feature-branch`
2. Commit your changes: `git commit -m 'Added new feature'`
3. Push to the branch: `git push origin feature-branch`
4. Submit a pull request

## 📝 License
This project is licensed under the **MIT License**.

