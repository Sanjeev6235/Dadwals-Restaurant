# Dadwals Restaurant — MERN Food Ordering Platform

[![Frontend Demo](https://img.shields.io/badge/Frontend-Live%20Demo-0ea5e9?style=for-the-badge)](https://dadwals-restaurant-feus.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-API-334155?style=for-the-badge)](https://dadwals-restaurant.vercel.app)
![MERN](https://img.shields.io/badge/Stack-MERN-16a34a?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448c5?style=flat-square)

A full-stack restaurant website built with MongoDB, Express.js, React, and Node.js. The application brings together a customer-facing food ordering experience and an administration workflow for managing menu items and orders.

## Live Application

- **Frontend:** [dadwals-restaurant-feus.vercel.app](https://dadwals-restaurant-feus.vercel.app)
- **Backend API:** [dadwals-restaurant.vercel.app](https://dadwals-restaurant.vercel.app)

## Customer Features

- Register and log in securely
- Browse food items and categories
- Search and filter the menu
- View food details
- Add items to the cart
- Update quantities and remove cart items
- Keep cart data in local storage
- Place cash-on-delivery orders
- Track order progress
- Manage profile information

## Admin Features

- Admin authentication
- Dashboard and order overview
- Add, edit, and remove food items
- Manage customer orders
- Update order status
- Upload food images using Cloudinary

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| API | Axios |
| State | Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| File uploads | Multer, Cloudinary |
| Notifications | React Hot Toast |

## Project Structure

- `frontend/` — React pages, components, context, and API integration
- `backend/` — Express routes, controllers, middleware, models, and server

## Installation

### Prerequisites

- Node.js and npm
- MongoDB database
- Cloudinary account for image uploads

### 1. Clone the repository

`git clone https://github.com/Sanjeev6235/Dadwals-Restaurant.git`

### 2. Backend

Open a terminal in `backend/` and run `npm install`. Create a `.env` file and configure the values used by the backend, including the port, MongoDB connection, JWT secret, and Cloudinary credentials. Start the backend with `npm run dev`.

### 3. Frontend

Open another terminal in `frontend/`, run `npm install`, and then `npm run dev`. Use the local URL printed by Vite.

Never commit your real database credentials, JWT secret, or Cloudinary API secret.

## Potential Enhancements

- Online payment provider integration
- Customer reviews and ratings
- Wishlist support
- Live order status updates

## Author

**Sanjeev Kumar** · [GitHub](https://github.com/Sanjeev6235)

---

Thanks for checking out the project. ⭐