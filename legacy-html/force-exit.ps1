# Force exit from vim and clean git state
Write-Host "Forcing exit from vim..."

# Try to write escape sequence to exit vim
$wshell = New-Object -ComObject wscript.shell
Start-Sleep -Milliseconds 500
$wshell.SendKeys(":q!{ENTER}")
Start-Sleep -Milliseconds 500

# Clean git state
git merge --abort
git reset --hard HEAD
git clean -fd

Write-Host "Git state cleaned."