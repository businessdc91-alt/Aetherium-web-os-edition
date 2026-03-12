# Firebase Deployment Script
# 1. Builds the Next.js Frontend
# 2. Deploys to Firebase Hosting

Write-Host "🚀 Starting Firebase Deployment..." -ForegroundColor Green

# Navigate to Frontend
Set-Location "web_platform/frontend"

# Install Dependencies (just in case)
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
npm install

# Build Static Site
Write-Host "🏗️  Building Frontend..." -ForegroundColor Yellow
npm run build

# Go back to root
Set-Location ..\..

# Deploy
Write-Host "🔥 Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy --only hosting

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
