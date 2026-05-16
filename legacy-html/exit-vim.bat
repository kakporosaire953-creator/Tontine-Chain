@echo off
echo Resolving git merge conflict...
echo q! > .git/MERGE_MSG
git merge --abort
echo Git merge conflict resolved.