# zWSL Manager Professional Installer
# Built for Ashesh Development

$ErrorActionPreference = 'Stop'

function Write-Host-Color($msg, $color) {
    Write-Host "[zWSL] $msg" -ForegroundColor $color
}

Write-Host-Color "Starting zWSL Manager Setup..." "Cyan"

# 1. Check for Admin
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host-Color "Please run this script as Administrator." "Red"
    return
}

# 2. Check for Prerequisites (Node.js)
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host-Color "Node.js not found. Installing via winget..." "Yellow"
    winget install -e --id OpenJS.NodeJS
    Write-Host-Color "Node.js installed. Please restart your shell and re-run this script if it fails in the next step." "Green"
}

# 3. Create Application Directory
$AppDir = "$env:USERPROFILE\zWSL-Manager"
if (-not (Test-Path $AppDir)) {
    New-Item -ItemType Directory -Path $AppDir | Out-Null
    Write-Host-Color "Created app directory at $AppDir" "Green"
}
Set-Location $AppDir

# 4. Download Source (Simulated for this demo, usually git clone)
Write-Host-Color "Preparing source files..." "Cyan"
# In a real scenario: git clone https://github.com/AsheshDev/zWSL-Manager.git .

# 5. Install Dependencies
Write-Host-Color "Installing dependencies (npm install)..." "Cyan"
npm install --no-audit --no-fund

# 6. Create Desktop Shortcut
Write-Host-Color "Creating desktop shortcut..." "Cyan"
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$env:PUBLIC\Desktop\zWSL Manager.lnk")
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-NoExit -Command `"cd '$AppDir'; npm run dev`""
$Shortcut.IconLocation = "powershell.exe,0"
$Shortcut.Description = "Launch zWSL Manager Dashboard"
$Shortcut.Save()

Write-Host-Color "Installation Complete!" "Green"
Write-Host-Color "You can now launch 'zWSL Manager' from your Desktop." "White"
Write-Host-Color "------------------------------------------------" "Cyan"
Write-Host-Color "Running dashboard now..." "Green"

npm run dev
