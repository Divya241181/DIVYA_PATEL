@echo off
echo Starting Portfolio Backend Server...
start "Portfolio Backend" cmd /k "cd backend && node server.js"

echo Starting Portfolio Frontend Server...
start "Portfolio Frontend" cmd /k "cd frontend && npm run dev"

echo Both servers are starting up in separate windows!
echo Once they are ready, you can access the frontend at http://localhost:5173/
