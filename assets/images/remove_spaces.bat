@echo off
setlocal enabledelayedexpansion

echo Removing spaces from filenames...
echo.

for %%f in (* *) do (
    set "filename=%%f"
    set "newname=!filename: =!"
    if not "!filename!"=="!newname!" (
        echo Renaming "%%f" to "!newname!"
        ren "%%f" "!newname!"
    )
)

echo.
echo Complete!
pause