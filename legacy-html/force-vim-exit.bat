@echo off
echo Forcing vim exit...

REM Create a file with vim exit command
echo :q! > vim-exit.txt

REM Try to send keys to vim
powershell -Command "$wshell = New-Object -ComObject wscript.shell; $wshell.SendKeys(':q!{ENTER}')"

REM Force kill vim
taskkill /F /IM vim.exe 2>nul

REM Clean git
git reset --hard HEAD
git clean -fd
git merge --abort

echo Terminal should be free now.
pause