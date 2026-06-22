# WorkConnect - Local Micro-Opportunities Platform

A professional, production-ready modern web app for local job connecting, built with the MERN stack and high-end UI/UX.

## 🚀 Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary (Images)
- **Authentication:** JWT (JSON Web Tokens)

---

## 🛠️ Setup Instructions

### Backend `.env` variables
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend `.env` variables
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📈 Deployment Guide

### 1. MongoDB Atlas Setup
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster.
3. Under "Database Access", create a user with read/write permissions.
4. Under "Network Access", allow access from "0.0.0.0/0" (for Render/Vercel).
5. Get your connection string (SRV) and replace `your_mongodb_atlas_uri` in `.env`.

### 2. Cloudinary Setup
1. Create a free account on [Cloudinary](https://cloudinary.com/).
2. Go to "Dashboard" to find your Cloud Name, API Key, and API Secret.
3. Add these to your backend `.env`.

### 3. Backend Deployment (Render)
1. Push your code to a GitHub repository.
2. Sign in to [Render](https://render.com/).
3. Create a new "Web Service".
4. Connect your repo and set the "Root Directory" to `workconnect-server`.
5. Build Command: `npm install`
6. Start Command: `node index.js`
7. Add all Environment Variables from your `.env` file in the "Environment" tab.

### 4. Frontend Deployment (Vercel)
1. Sign in to [Vercel](https://vercel.com/).
2. Create a new "Project" and connect your repo.
3. Set the "Root Directory" to `workconnect-client`.
4. Framework Preset: "Vite".
5. Add `VITE_API_URL` as an Environment Variable (pointing to your Render URL: `https://your-api.onrender.com/api`).
6. Deploy!

---

## 💎 Features
- **Modern Responsive Design:** Zomato-inspired Red & White theme with smooth animations.
- **Glassmorphism:** Elegant card designs with backdrop filters.
- **Role-based Auth:** Separate workflows for Workers and Employers.
- **Image Uploads:** Direct Cloudinary integration for profile and job images.
- **Search & Filters:** Categorized job discovery.
```
