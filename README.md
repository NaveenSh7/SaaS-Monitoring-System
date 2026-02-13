# SaaS Monitoring System 

A full-stack **SaaS Monitoring Platform** designed to collect, process, and visualize **real-time application traffic and metrics**.

The system uses a **modular, service-based architecture** with a lightweight SDK for traffic collection, a real-time backend, and a modern dashboard built with Next.js.

This project follows an **open-core SaaS model**: the core monitoring infrastructure is open-source and extensible.

---
##  Project Architecture

- frontend/ → Next.js dashboard (UI)
- server-1/ → Core backend (Realtime + APIs)
- server-2/ → Traffic ingestion service
- logger-sdk/ → Lightweight monitoring SDK

* Using V0 for UI designs is encouraged.

Please feel free to contact me if u need any assistance.

---

## Frontend (Next.js)

The frontend is a **Next.js dashboard** that provides visualization and control over monitored applications.

### Responsibilities
- User authentication (Google OAuth via NextAuth)
- Real-time metrics visualization using WebSockets
- API management UI
- Payment integration (Razorpay)
- Monitoring dashboards and analytics views

### Frontend Environment Variables

Create a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxx

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

## 🧠 Server 1 — Core Backend (Node.js + Express)

This service acts as the central backend for the platform.

### Responsibilities

Maintains WebSocket connections with the frontend for real-time updates

Provides APIs for:

Adding and managing monitored APIs

Payments and billing

Real-time metrics aggregation

Coordinates communication between frontend and traffic services

Example Environment Variables (server-1/.env)
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

JWT_SECRET=your_jwt_secret
SOCKET_CORS_ORIGIN=http://localhost:3000

## 📡 Server 2 — Traffic Ingestion Service

This service is responsible for handling high-volume traffic data coming from the SDK.

Responsibilities

Receives traffic and event data from logger-sdk

Processes and normalizes incoming data

Stores or forwards metrics for real-time visualization

### Example Environment Variables (server-2/.env)
PORT=6000
NODE_ENV=development

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

INGESTION_SECRET=your_ingestion_secret
CORE_BACKEND_URL=http://localhost:5000

## 📦 logger-sdk (Monitoring SDK)

logger-sdk is a lightweight npm package designed for easy integration into user applications.

### Purpose

Capture application traffic and events

Send monitoring data to the SaaS backend

Minimal performance overhead

### Example Usage

Step 1: Install the SDK
npm i saas-monitoring-sdk

Step 2: Get your API key

Step 3: Add this code to your server's entry point
// SaaS Monitoring for Node
app.set('trust proxy', true);
const Logger = require('saas-monitoring-sdk');

Logger.init({
  api_key: 'your_api_key',
});

app.use(Logger.middleware());

## ⚙️ Local Development Setup
### Prerequisites

Node.js (v18+ recommended)

npm

PostgreSQL (local or cloud)

### Install Dependencies
# Frontend
cd frontend && npm install

# Server 1
cd ../server-1 && npm install

# Server 2
cd ../server-2 && npm install

# Logger SDK
already published on NPM

### Run the Project
# Frontend
npm run dev

# Backend servers
npm start

🔐 Security & Access Control

Direct pushes to main are restricted

All changes must go through Pull Requests

Secrets and credentials are excluded from version control

🤝 Contributing

Contributions are welcome!
Please read CONTRIBUTING.md
 before opening a Pull Request.

📜 License

This project is licensed under the Apache License 2.0.

