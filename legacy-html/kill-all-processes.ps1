# Force kill all processes that might be blocking the terminal
Write-Host "Killing all blocking processes..."

# Kill git processes
Get-Process -Name "git*" -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill vim processes  
Get-Process -Name "vim*" -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill cmd processes (except current)
Get-Process -Name "cmd" -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne $PID } | Stop-Process -Force

# Kill conhost processes
Get-Process -Name "conhost*" -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean git state
if (Test-Path .git) {
    Write-Host "Cleaning git state..."
    git reset --hard HEAD
    git clean -fd
    git merge --abort
}

Write-Host "Done. Terminal should be free now."