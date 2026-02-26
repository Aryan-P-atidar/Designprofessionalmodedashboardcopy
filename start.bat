@echo off
echo.
echo 🚀 Starting In-Folio Application...
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the server
echo ✅ Starting backend server on http://localhost:3000
echo.
echo 📝 API Endpoints:
echo    POST /api/auth/signup - Create account
echo    POST /api/auth/login - Login
echo    GET  /api/test - Test server
echo.
echo 🌐 Open login.html in your browser to start!
echo    Recommended: Use a local server like 'npx http-server'
echo.
echo Press Ctrl+C to stop the server
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call npm start
