#!/bin/bash

echo "🚀 Starting In-Folio Application..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "✅ Starting backend server on http://localhost:3000"
echo ""
echo "📝 API Endpoints:"
echo "   POST /api/auth/signup - Create account"
echo "   POST /api/auth/login - Login"
echo "   GET  /api/test - Test server"
echo ""
echo "🌐 Open login.html in your browser to start!"
echo "   Recommended: Use a local server like 'npx http-server'"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm start
