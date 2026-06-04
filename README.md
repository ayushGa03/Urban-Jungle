# 🌿 Urban Jungle - E-Commerce Platform

<div align="center">

**Transform Your Space with Premium Plants & Greenery**

A modern, full-stack e-commerce platform built with cutting-edge technologies for buying and selling plants online.

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [Project Structure](#project-structure)

</div>

---

## 🌟 Overview

Urban Jungle is a comprehensive e-commerce solution designed to bring the beauty of nature to urban spaces. With an intuitive interface, secure payment processing, and a full-featured admin dashboard, we make plant shopping and management seamless and enjoyable.

---

## ✨ Features

- **🔐 Secure Authentication**
  - JWT-based user authentication
  - Password hashing with bcryptjs
  - Role-based access control (Admin/User)

- **🛍️ Shopping Experience**
  - Browse extensive plant catalog
  - Advanced product filtering and search
  - Persistent shopping cart
  - Real-time inventory management

- **💳 Payment Integration**
  - Secure payment processing
  - Order tracking and history
  - Invoice generation

- **👨‍💼 Admin Dashboard**
  - Product management (CRUD operations)
  - Order management and fulfillment
  - User management
  - Analytics and reporting

- **🤖 AI Chatbot**
  - Real-time customer support
  - Plant care recommendations
  - Order assistance

- **📧 Email Notifications**
  - Order confirmations
  - Shipping updates
  - Password reset links

- **📱 Responsive Design**
  - Mobile-first approach
  - Seamless experience across all devices
  - Tailwind CSS styling

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs, CORS
- **File Upload:** Multer
- **Email:** EmailJS

### Frontend
- **Framework:** React 19+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **State Management:** Context API
- **HTTP Client:** Axios
- **UI Components:** React Icons, Remixicon
- **Notifications:** React Hot Toast
- **Email:** EmailJS

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/urban-jungle.git
cd urban-jungle
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### Start the Backend Server
```bash
cd backend
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

The server will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will open at `http://localhost:5173`

---

## 📁 Project Structure

```
urban-jungle/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Request handlers
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── upload.js            # File upload handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product routes
│   │   ├── cart.js              # Cart routes
│   │   └── orders.js            # Order routes
│   ├── public/                  # Static files
│   ├── server.js                # Express app setup
│   ├── seed.js                  # Database seeding
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── Home_comp/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ...
│   │   ├── sections/
│   │   │   └── Home/            # Homepage sections
│   │   ├── Context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js           # API configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch product details
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Fetch user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Fetch order details

---

## 🧪 Testing

Run tests with:
```bash
npm test
```

---

## 📝 Database Models

### User
```javascript
- username, email, password (hashed)
- role (admin/user)
- timestamps
```

### Product
```javascript
- name, description, price
- category, image, stock
- rating, reviews
- timestamps
```

### Cart
```javascript
- userId, products[]
- total price
- timestamps
```

### Order
```javascript
- userId, products[], totalPrice
- status, address, paymentMethod
- timestamps
```

---

## 🔐 Security Features

- ✅ JWT authentication with token validation
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation and sanitization
- ✅ Secure file upload handling

---

## 🚢 Deployment

### Backend (Node.js)
- Heroku, Railway, or Render

### Frontend (React + Vite)
- Vercel (recommended)
- Netlify
- GitHub Pages

### Database
- MongoDB Atlas (Cloud)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 📞 Support

For support, email support@urbanjungle.com or open an issue on GitHub.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB University](https://university.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- All contributors and supporters

---

<div align="center">

**Made with ❤️ for plant lovers everywhere**

⭐ If you found this project helpful, please consider giving it a star!

</div>
