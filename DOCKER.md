# 🐳 Docker Deployment Guide

This guide explains how to run the SaaS Monitoring System using Docker.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

## 🚀 Quick Start

### 1. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.docker .env
```

Edit `.env` and fill in your actual values:

```env
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
NEXTAUTH_SECRET=your_generated_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
POSTGRES_PASSWORD=your_postgres_password
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

**Get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 2. **Build and run all services**

```bash
docker-compose up --build
```

Or run in detached mode:

```bash
docker-compose up -d --build
```

### 3. **Initialize the database**

Run the database initialization script (after containers are running):

```bash
docker-compose exec server-1 node scripts/init-db.js
```

### 4. **Access the application**

- **Frontend**: http://localhost:3000
- **Server-1 (Main API)**: http://localhost:5000
- **Server-2 (Traffic API)**: http://localhost:5001
- **PostgreSQL**: localhost:5432

## 🛠️ Docker Commands

### View running containers

```bash
docker-compose ps
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f server-1
docker-compose logs -f server-2
docker-compose logs -f postgres
```

### Stop all services

```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes database data)

```bash
docker-compose down -v
```

### Restart a specific service

```bash
docker-compose restart server-1
```

### Rebuild after code changes

```bash
docker-compose up --build
```

### Execute commands in a container

```bash
# Access server-1 shell
docker-compose exec server-1 sh

# Run npm commands
docker-compose exec server-1 npm install new-package
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│              (Next.js on :3000)                 │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼────────┐
│   Server-1     │   │   Server-2      │
│  (API :5000)   │   │ (Traffic :5001) │
└───────┬────────┘   └────────┬────────┘
        │                     │
        └──────────┬──────────┘
                   │
           ┌───────▼────────┐
           │   PostgreSQL   │
           │    (:5432)     │
           └────────────────┘
```

## 🗄️ Database Management

### Access PostgreSQL

```bash
docker-compose exec postgres psql -U postgres -d saas_monitoring
```

### Backup database

```bash
docker-compose exec postgres pg_dump -U postgres saas_monitoring > backup.sql
```

### Restore database

```bash
docker-compose exec -T postgres psql -U postgres saas_monitoring < backup.sql
```

### View database tables

```bash
docker-compose exec postgres psql -U postgres -d saas_monitoring -c "\dt"
```

## 🔧 Environment Configuration

### Frontend Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL (default: http://localhost:5000)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `NEXTAUTH_SECRET`: NextAuth encryption secret
- `NEXTAUTH_URL`: Frontend URL (default: http://localhost:3000)
- `NEXT_PUBLIC_Razpy_Key_Id`: Razorpay public key

### Server-1 Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)
- `Key_Id`: Razorpay key ID
- `Key_Secret`: Razorpay key secret
- `NODE_ENV`: Environment (production/development)

### Server-2 Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5001)
- `NODE_ENV`: Environment (production/development)

## 🐛 Troubleshooting

### Container fails to start

```bash
# Check logs
docker-compose logs <service-name>

# Rebuild specific service
docker-compose up --build <service-name>
```

### Database connection errors

```bash
# Check if postgres is healthy
docker-compose ps

# Restart postgres
docker-compose restart postgres

# Check postgres logs
docker-compose logs postgres
```

### Port already in use

```bash
# Find process using port (Windows)
netstat -ano | findstr :3000

# Kill process
taskkill /PID <pid> /F
```

### Clear everything and start fresh

```bash
# Stop and remove all containers, networks, volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all -v

# Rebuild from scratch
docker-compose up --build
```

## 🚀 Production Deployment

For production deployment:

1. **Update environment variables** in `.env`:
   - Change database password
   - Use production OAuth credentials
   - Set `NODE_ENV=production`

2. **Use external database** (recommended):
   - Comment out `postgres` service in `docker-compose.yml`
   - Update `DATABASE_URL` to point to your hosted database (Supabase, AWS RDS, etc.)

3. **Enable SSL**:
   - Set up reverse proxy (Nginx, Traefik)
   - Configure SSL certificates

4. **Security**:
   - Never commit `.env` files
   - Use Docker secrets for sensitive data
   - Implement rate limiting
   - Set up monitoring and alerts

## 📦 Docker Hub Deployment (Optional)

Build and push images:

```bash
# Build images
docker build -t your-username/saas-frontend:latest ./frontend
docker build -t your-username/saas-server-1:latest ./server-1
docker build -t your-username/saas-server-2:latest ./server-2

# Push to Docker Hub
docker push your-username/saas-frontend:latest
docker push your-username/saas-server-1:latest
docker push your-username/saas-server-2:latest
```

## 📝 Notes

- PostgreSQL data persists in a Docker volume named `postgres_data`
- All services are on the same Docker network for internal communication
- Health checks ensure services start in correct order
- Containers restart automatically unless stopped manually

## 🆘 Need Help?

- Check the [main README](README.md) for project overview
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub for bugs or questions
