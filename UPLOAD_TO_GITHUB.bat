@echo off
setlocal EnableDelayedExpansion

REM ============================================================================
REM  ORA SWISS GENEVE - TRUE 1-CLICK GITHUB AUTO UPLOADER
REM  Repository: https://github.com/sydmehedi/-ORA-SWISS-GENEVA
REM ============================================================================

chcp 65001 >nul
cd /d "%~dp0"

title ORA SWISS - 1-Click GitHub Sync
color 0B

echo.
echo ============================================================================
echo                 ✦ ORA SWISS - 1-CLICK GITHUB AUTO SYNC ✦
echo                      Haute Horlogerie Geneve
echo ============================================================================
echo.

echo [1/3] Staging project files...
git branch -M main >nul 2>&1
git add -A

echo [2/3] Checking for updates...
git diff --cached --quiet
if !ERRORLEVEL! EQU 0 (
    echo       [OK] Working tree clean. Pushing latest state...
) else (
    echo       [OK] New changes detected. Creating automatic commit...
    git commit -m "Auto-update ORA SWISS luxury website (%date% %time%)" >nul 2>&1
    echo       [OK] Commit created.
)

echo.
echo [3/3] Uploading to GitHub repository...
git push origin main

if !ERRORLEVEL! EQU 0 (
    color 0A
    echo.
    echo ============================================================================
    echo                   ✦ SUCCESS! CODE IS LIVE ON GITHUB ✦
    echo ============================================================================
    echo.
    echo Repository: https://github.com/sydmehedi/-ORA-SWISS-GENEVA
    echo All updates have been synced to GitHub in 1 click!
    echo ============================================================================
) else (
    color 0C
    echo.
    echo ============================================================================
    echo                         UPLOAD NOTICE
    echo ============================================================================
    echo Push could not be completed. Please check your internet connection.
    echo ============================================================================
)

echo.
echo Press any key to exit...
pause >nul