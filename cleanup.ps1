# Pre-Deployment Cleanup Script (PowerShell)
# Removes unnecessary files and directories before deployment

Write-Host "🧹 Starting pre-deployment cleanup..." -ForegroundColor Cyan

# Remove build artifacts
if (Test-Path ".next") {
    Write-Host "Removing .next build directory..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "✓ .next removed" -ForegroundColor Green
}

# Remove node_modules (will be installed fresh on server)
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules" -Recurse -Force
    Write-Host "✓ node_modules removed" -ForegroundColor Green
}

# Remove TypeScript build info
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item "tsconfig.tsbuildinfo"
    Write-Host "✓ TypeScript build info removed" -ForegroundColor Green
}

# Remove zip archives
Get-ChildItem -Filter "*.zip" | ForEach-Object {
    Remove-Item $_.FullName
    Write-Host "✓ $($_.Name) removed" -ForegroundColor Green
}

# Remove log files
if (Test-Path "build.log") {
    Remove-Item "build.log"
    Write-Host "✓ build.log removed" -ForegroundColor Green
}

# Remove test files
if (Test-Path "test-telegram.js") {
    Remove-Item "test-telegram.js"
    Write-Host "✓ test-telegram.js removed" -ForegroundColor Green
}

# Remove load test files
@("load-test.js", "load-test-simple.js", "test-simple-connection.js") | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item $_
        Write-Host "✓ $_ removed" -ForegroundColor Green
    }
}

# Remove LOAD_TEST_REPORT if exists
if (Test-Path "LOAD_TEST_REPORT.md") {
    Remove-Item "LOAD_TEST_REPORT.md"
    Write-Host "✓ LOAD_TEST_REPORT.md removed" -ForegroundColor Green
}

# Remove .env.local (development only)
if (Test-Path ".env.local") {
    Remove-Item ".env.local"
    Write-Host "✓ .env.local removed (use .env.production on server)" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Files ready for deployment. Next steps:"
Write-Host "1. Generate NEXTAUTH_SECRET: openssl rand -base64 32"
Write-Host "2. Update .env.production with the secret"
Write-Host "3. Upload files to server"
Write-Host "4. Run deploy.sh on server"
Write-Host ""
