@echo off
title Cloudflare Tunnel - Portfolio

echo ============================================
echo   Cloudflare Tunnel for Portfolio Preview
echo ============================================
echo.
echo  Make sure your dev servers are running first!
echo  (Use run.bat to start them)
echo.
echo  Starting tunnel to localhost:5173 ...
echo  A public URL will appear below.
echo  Open it on your phone to preview!
echo.
echo ============================================

cloudflared.exe tunnel --url http://localhost:5173

pause
