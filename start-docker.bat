@echo off
setlocal enabledelayedexpansion

echo.
echo ^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|
echo   Starting SaaS Monitoring System with Docker
echo ^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo [WARNING] No .env file found. Creating from .env.docker...
    copy .env.docker .env >nul
    echo [WARNING] Please edit .env file with your actual credentials.
    echo.
    pause
)

REM Build and start containers
echo [INFO] Building Docker images...
docker-compose build

echo.
echo [INFO] Starting containers...
docker-compose up -d

echo.
echo [INFO] Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Initialize database
echo.
echo [INFO] Initializing database...
docker-compose exec server-1 node scripts/init-db.js

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Access your application:
echo   Frontend:  http://localhost:3000
echo   Server-1:  http://localhost:5000
echo   Server-2:  http://localhost:5001
echo.
echo Useful commands:
echo   View logs:         docker-compose logs -f
echo   Stop services:     docker-compose down
echo   Restart services:  docker-compose restart
echo.
pause
