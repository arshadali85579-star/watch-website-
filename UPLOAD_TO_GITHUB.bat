@echo off
setlocal EnableDelayedExpansion

REM ============================================================================
REM  ORA SWISS GENEVE - TRUE 1-CLICK GITHUB AUTO UPLOADER
REM  Repository: https://github.com/arshadali85579-star/watch-website-
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

REM --- 1. Project & Remote Setup ---
echo [1/3] Preparing repository and remote...
git config user.name "arshadali85579-star" >nul 2>&1
git config user.email "arshadali85579@gmail.com" >nul 2>&1
git branch -M main >nul 2>&1

set "TARGET_REMOTE=https://github.com/arshadali85579-star/watch-website-.git"
git remote set-url origin !TARGET_REMOTE! >nul 2>&1 || git remote add origin !TARGET_REMOTE! >nul 2>&1

echo       [OK] Remote configured: !TARGET_REMOTE!

REM --- 2. Stage & Commit ---
echo.
echo [2/3] Checking for changes and staging files...
git add -A

git diff --cached --quiet
if !ERRORLEVEL! EQU 0 (
    echo       [OK] Working tree clean. Preparing to upload...
) else (
    echo       [OK] New changes detected. Creating automatic commit...
    git commit -m "Update ORA SWISS luxury website (%date% %time%)" >nul 2>&1
    echo       [OK] Commit created.
)

REM --- 3. Push to GitHub ---
echo.
echo [3/3] Uploading code to GitHub repository...
echo.

git push -u origin main

if !ERRORLEVEL! EQU 0 (
    color 0A
    echo.
    echo ============================================================================
    echo                   ✦ SUCCESS! CODE IS LIVE ON GITHUB ✦
    echo ============================================================================
    echo.
    echo Repository: https://github.com/arshadali85579-star/watch-website-
    echo All website files have been synced to your GitHub in 1 click!
    echo ============================================================================
) else (
    color 0C
    echo.
    echo ============================================================================
    echo                         PUSH IN PROGRESS / NOTICE
    echo ============================================================================
    echo If your browser opened GitHub asking to Authorize, please click Authorize.
    echo Once authorized in browser, double-click this file again and it will push instantly.
    echo ============================================================================
)

echo.
echo Press any key to exit...
pause >nul