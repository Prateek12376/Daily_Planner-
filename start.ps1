# PowerShell script to start the TodoList Pro application

Write-Host "Starting Daily Planner Application..." -ForegroundColor Green

# Check if MongoDB is running (optional check)
Write-Host "`nNote: Make sure MongoDB is running on localhost:27017" -ForegroundColor Yellow
Write-Host "Or update MONGODB_URI in server/.env to use MongoDB Atlas`n" -ForegroundColor Yellow

# Create .env file if it doesn't exist
$envPath = "server\.env"
if (-not (Test-Path $envPath)) {
    Write-Host "Creating server/.env file..." -ForegroundColor Cyan
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
"@ | Out-File -FilePath $envPath -Encoding utf8
    Write-Host "✓ Created server/.env file" -ForegroundColor Green
} else {
    Write-Host "✓ server/.env file already exists" -ForegroundColor Green
}

# Start backend server
Write-Host "`nStarting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend client
Write-Host "Starting frontend client..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm start" -WindowStyle Normal

Write-Host "`n✓ Both servers are starting in separate windows" -ForegroundColor Green
Write-Host "`nBackend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000 (will open automatically)`n" -ForegroundColor Yellow

Write-Host "Press any key to exit this script (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

