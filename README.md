# 🍰 The Glaze Cake Shop

A full-stack bakery web application for **The Glaze Cake Shop**, built with **Java Spring Boot**, **React + Vite**, and **MySQL**. It allows users to browse custom-designed cakes, filter by categories, view product details, and allows admins to manage orders. The interface is styled with modern design principles using `styled-components`.

---

## 🚀 Features

- 🎂 Dynamic Cake Catalog with Filtering
- 📦 Product Detail Pages
- 🧭 Responsive Navigation with Navbar
- 🧾 About Us & Contact Pages
- 💬 Admin Dashboard
- 🗂 Organized Frontend & Backend Structure

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + Vite
- 💅 styled-components
- 🌐 React Router

### Backend
- ☕ Java Spring Boot
- 🛠️ REST APIs
- 🔐 JSON support

### Database
- 🐬 MySQL

---

the-glaze-cakeshop/
│
├── frontend/              # React frontend (Vite-based)
│   ├── public/            # Static assets (favicon, images, etc.)
│   ├── src/               # React source code
│   ├── index.html         # Main HTML file
│   ├── package.json       # Frontend dependencies and scripts
│   └── vite.config.js     # Vite config
│
├── backend/               # Java Spring Boot backend
│   ├── src/               # Java source code
│   ├── sql/               # SQL scripts (schemas/data)
│   ├── pom.xml            # Maven project descriptor
│   ├── Dockerfile         # Optional backend containerization
│   └── README.md          # Backend-specific instructions
│
└── README.md              # Main project documentation

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Java 17+
- MySQL 8+
- Maven

---

### Frontend

```bash
cd frontend
npm install
npm run dev

---

### Go into backend folder
cd backend

# (1) Create MySQL database if not already created
CREATE DATABASE glaze_cakeshop;

# (2) Update src/main/resources/application.properties (or application.yml)
# Example:
spring.datasource.url=jdbc:mysql://localhost:3306/glaze_cakeshop
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# (3) Build the project
mvn clean install

# (4) Run the backend server
mvn spring-boot:run

