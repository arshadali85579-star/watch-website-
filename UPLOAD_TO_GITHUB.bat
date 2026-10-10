@echo off
setlocal EnableDelayedExpansion

REM ============================================================================
REM  ORA SWISS GENEVE - AUTOMATED GITHUB UPLOADER
REM  Target: https://github.com/sydmehedi/-ORA-SWISS-GENEVA.git
REM ============================================================================

chcp 65001 >nul
cd /d "%~dp0"

title ORA SWISS - GitHub Auto Uploader
color 0B

echo.
echo ============================================================================
echo                    ORA SWISS - ONE-CLICK GITHUB SYNC
echo                        Haute Horlogerie Geneve
echo ============================================================================
echo.

REM --- 1. Check Git ---
echo [1/6] Checking system environment...
where git >nul 2>&1
if errorlevel 1 (
    color 0C
    echo [ERROR] Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/downloads
    goto FINISH
)
for /f "tokens=*" %%v in ('git --version 2^>nul') do set "GIT_VER=%%v"
echo       [OK] Git: !GIT_VER!

where node >nul 2>&1
if not errorlevel 1 (
    for /f "tokens=*" %%n in ('node -v 2^>nul') do set "NODE_VER=%%n"
    echo       [OK] Node: !NODE_VER!
)

REM --- 2. Check Project Root ---
echo.
echo [2/6] Validating project directory...
if not exist "package.json" (
    color 0C
    echo [ERROR] package.json not found in "%~dp0"
    goto FINISH
)
echo       [OK] Project root verified.

REM --- 3. Initialize Git and Branch ---
echo.
echo [3/6] Inspecting Git repository status...
if not exist ".git" (
    echo       Initializing local Git repository...
    git init
    if !ERRORLEVEL! NEQ 0 (
        color 0C
        echo [ERROR] Failed to run git init.
        goto FINISH
    )
    echo       [OK] Git initialized.
) else (
    echo       [OK] Git repository already initialized.
)

git branch -M main >nul 2>&1

REM --- 4. Remote Configuration ---
echo.
echo [4/6] Verifying remote repository...
set "TARGET_REMOTE=https://github.com/sydmehedi/-ORA-SWISS-GENEVA.git"
set "EXISTING_REMOTE="

for /f "tokens=*" %%r in ('git remote get-url origin 2^>nul') do (
    set "EXISTING_REMOTE=%%r"
)

if "!EXISTING_REMOTE!"=="" (
    echo       Adding remote origin: !TARGET_REMOTE!
    git remote add origin !TARGET_REMOTE!
    if !ERRORLEVEL! NEQ 0 (
        color 0C
        echo [ERROR] Failed to add remote origin.
        goto FINISH
    )
    echo       [OK] Remote origin configured.
) else (
    echo       [OK] Remote origin: !EXISTING_REMOTE!
)

REM --- 5. Stage and Commit ---
echo.
echo [5/6] Staging files and creating commit...
git add -A

git diff --cached --quiet
if !ERRORLEVEL! EQU 0 (
    echo       [INFO] Working tree is clean. No new changes to commit.
) else (
    echo       Staged changes detected.
    set "DEFAULT_MSG=Update ORA SWISS luxury website"
    echo Default commit message: "!DEFAULT_MSG!"
    echo Press ENTER to use default message, or type a custom note:
    set "USER_MSG="
    set /p "USER_MSG=Commit message: "
    if "!USER_MSG!"=="" set "USER_MSG=!DEFAULT_MSG!"

    git commit -m "!USER_MSG!"
    if !ERRORLEVEL! NEQ 0 (
        color 0C
        echo [ERROR] Git commit failed.
        goto FINISH
    )
    echo       [OK] Commit created successfully.
)

REM --- 6. Push to GitHub ---
echo.
echo [6/6] Pushing code to GitHub (branch: main)...
echo.
echo [NOTE] If prompted by GitHub in a browser window,
echo        please authorize sign-in to complete the upload.
echo.

git push -u origin main

if !ERRORLEVEL! EQU 0 (
    color 0A
    echo.
    echo ============================================================================
    echo                     SUCCESS! CODE UPLOADED TO GITHUB
    echo ============================================================================
    echo.
    echo Repository: https://github.com/sydmehedi/-ORA-SWISS-GENEVA
    echo Your ORA SWISS luxury website source code is now live on GitHub!
    echo ============================================================================
) else (
    color 0C
    echo.
    echo ============================================================================
    echo                           PUSH FAILED OR CANCELLED
    echo ============================================================================
    echo If this is your first time, check your browser for GitHub authentication.
    echo You can also test pushing manually with: git push -u origin main
    echo ============================================================================
)

:FINISH
echo.
echo Press any key to exit...
pause >nul