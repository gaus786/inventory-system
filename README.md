# Inventory Management System

A full-stack Inventory Management System built using React, FastAPI, PostgreSQL, and Docker. The application helps businesses manage products, customers, and orders efficiently through a modern web interface.

## 🚀 Features

- Product Management
  - Add, update, delete, and view products
  - Track inventory levels

- Customer Management
  - Store customer information
  - Manage customer records

- Order Management
  - Create and manage orders
  - Track order history

- Dashboard
  - Overview of inventory statistics
  - Real-time inventory monitoring

- Responsive User Interface
  - Modern React-based frontend
  - User-friendly design

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose

## 📂 Project Structure


inventory-system/
│
├── backend/
│ ├── app/
│ ├── requirements.txt
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── Dockerfile
│
├── .env
├── docker-compose.yml
└── README.md


## ⚙️ Installation

### Prerequisites

- Docker Desktop
- Git

### Clone Repository

```bash
git clone https://github.com/gaus786/inventory-system.git
cd inventory-system
Configure Environment Variables

Update the .env file:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
POSTGRES_DB=inventorydb
Run Application
docker compose up --build
Access Application

Frontend:

http://localhost:3000

Backend API:

http://localhost:8000

PostgreSQL:

localhost:5432
🗄️ Database

The project uses PostgreSQL as the primary database.

Default configuration:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
POSTGRES_DB=inventorydb
🔧 Useful Commands

Start Containers

docker compose up

Rebuild Containers

docker compose up --build

Stop Containers

docker compose down

View Running Containers

docker ps

View Logs

docker compose logs -f
📸 Screenshots

Add screenshots of:

Dashboard
Products Page
Customers Page
Orders Page
🌐 Deployment

The project can be deployed using:

Vercel (Frontend)
Render / Railway (Backend)
PostgreSQL Cloud Database
🤝 Contributing
1.Fork the repository
2.Create a feature branch
3.Commit your changes
4.Push to your branch
5.Create a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Gulam Gaus

GitHub: https://github.com/gaus786
