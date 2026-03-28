# 🍔 Dadwals Restaurant — Full Stack MERN Application

A modern **full-stack restaurant web application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project provides a complete **online food ordering experience** with secure authentication, cart management, order tracking, and an advanced admin dashboard.

---

## 🚀 Live Demo
- **Frontend:**  - https://dadwals-restaurant-feus.vercel.app
- **Backend API:** https://dadwals-restaurant.vercel.app

---

## ✨ Features

### 👤 User Features
- User Registration & Login
- Secure JWT Authentication
- Protected Routes
- Browse food menu
- Search & filter by category
- Food details page
- Add to cart
- Update item quantity
- Remove items from cart
- Cart persistence with localStorage
- Place COD orders
- Order tracking with stepper UI
- Profile management

### 👑 Admin Features
- Admin login
- Dashboard with analytics
- Add new food items
- Edit existing food items
- Delete food items
- Manage all orders
- Update order status
- Upload food images with Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

## 📂 Project Structure

```bash
dadwals-restaurant/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── services/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Sanjeev6235/Dadwals-Restaurant.git
cd dadwals-restaurant
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Run backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Food
- `GET /api/food`
- `GET /api/food/:id`
- `POST /api/food`
- `PUT /api/food/:id`
- `DELETE /api/food/:id`

### Orders
- `POST /api/orders`
- `GET /api/orders/my`
- `PUT /api/orders/:id/status`

---

## 📸 Screenshots
Add your project screenshots here.

```markdown
![Home Page](your-image-link)
![Admin Dashboard](your-image-link)
```

---

## 🎯 Project Highlights
- Full-stack MERN architecture
- Authentication & authorization
- RESTful APIs
- Cloud image upload
- Responsive UI design
- Admin dashboard
- Real-world project structure

---

## 📌 Future Enhancements
- Online payment integration
- Wishlist feature
- Email notifications
- Reviews & ratings
- Real-time order updates

---

## 👨‍💻 Author
**Sanjeev Kumar**

GitHub: https://github.com/Sanjeev6235

---

## 📄 License
This project is open-source and available under the **MIT License**.
