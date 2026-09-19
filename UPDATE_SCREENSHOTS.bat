@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0UPDATE_SCREENSHOTS.ps1"
endlocal
