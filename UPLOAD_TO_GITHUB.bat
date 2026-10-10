@echo off
setlocal EnableDelayedExpansion

REM ============================================================================
REM  ORA SWISS GENEVE - ONE-CLICK AUTOMATED GITHUB UPLOADER
REM  Target Repository: https://github.com/sydmehedi/-ORA-SWISS-GENEVA.git
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

REM --- 1. Check Git Environment ---
echo [1/6] Checking system environment...
where git >nul 2>&1
if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Git is not installed or not found in system PATH.
    echo Please download and install Git from: https://git-scm.com/downloads
    echo.
    goto FINISH
)
for /f "tokens=*" %%v in ('git --version 2^>nul') do set "GIT_VER=%%v"
echo       [OK] Git detected: !GIT_VER!

where node >nul 2>&1
if not errorlevel 1 (
    for /f "tokens=*" %%n in ('node -v 2^>nul') do set "NODE_VER=%%n"
    echo       [OK] Node.js detected: !NODE_VER!
)

REM --- 2. Check Project Directory ---
echo.
echo [2/6] Validating project directory...
if not exist "package.json" (
    color 0C
    echo.
    echo [ERROR] package.json not found in "%~dp0".
    echo Please make sure this script is located in the root folder of the project.
    echo.
    goto FINISH
)
echo       [OK] Project root verified: %CD%

REM --- 3. Initialize Git & Ensure Main Branch ---
echo.
echo [3/6] Inspecting Git repository...
if not exist ".git" (
    echo       Initializing local Git repository...
    git init
    if !ERRORLEVEL! NEQ 0 (
        color 0C
        echo [ERROR] Failed to initialize Git repository.
        goto FINISH
    )
    echo       [OK] Repository initialized.
) else (
    echo       [OK] Git repository already initialized.
)

git branch -M main >nul 2>&1

REM --- 4. Remote Repository Configuration ---
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
    if /i "!EXISTING_REMOTE!"=="!TARGET_REMOTE!" (
        echo       [OK] Remote origin verified: !EXISTING_REMOTE!
    ) else (
        echo.
        echo [WARNING] Current remote origin points to:
        echo           !EXISTING_REMOTE!
        echo Target is:
        echo           !TARGET_REMOTE!
        echo.
        set /p "UPDATE_REMOTE=Do you want to switch remote to !TARGET_REMOTE!? (Y/N, default Y): "
        if "!UPDATE_REMOTE!"=="" set "UPDATE_REMOTE=Y"
        if /i "!UPDATE_REMOTE!"=="Y" (
            git remote set-url origin !TARGET_REMOTE!
            echo       [OK] Remote origin updated.
        ) else (
            echo       Keeping current remote: !EXISTING_REMOTE!
        )
    )
)

REM --- 5. Stage Files and Commit ---
echo.
echo [5/6] Staging files and creating commit...
git add -A

git diff --cached --quiet
if !ERRORLEVEL! EQU 0 (
    echo       [INFO] Working tree is clean. No new file modifications to commit.
) else (
    echo       Staged changes detected.
    set "DEFAULT_MSG=Update: ORA SWISS luxury watch experience"
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
echo [NOTE] If Windows Git Credential Manager opens a browser window,
echo        please approve the sign-in with your GitHub account: sydmehedi
echo.

:DO_PUSH
git push -u origin main

if !ERRORLEVEL! EQU 0 (
    color 0A
    echo.
    echo ============================================================================
    echo                     SUCCESS! CODE UPLOADED TO GITHUB
    echo ============================================================================
    echo.
    echo Repository: https://github.com/sydmehedi/-ORA-SWISS-GENEVA
    echo.
    echo Your ORA SWISS luxury website source code is now live on GitHub!
    echo ============================================================================
    goto FINISH
)

color 0C
echo.
echo ============================================================================
echo                         PUSH FAILED / PERMISSION CHECK
echo ============================================================================
echo.
echo If you saw a 403 Permission Denied or were logged in under a different
echo GitHub username, Windows may have an old GitHub login saved.
echo.
set /p "RESET_AUTH=Would you like to reset cached GitHub credentials and retry? (Y/N, default Y): "
if "!RESET_AUTH!"=="" set "RESET_AUTH=Y"
if /i "!RESET_AUTH!"=="Y" (
    cmdkey /delete:LegacyGeneric:target=git:https://github.com >nul 2>&1
    cmdkey /delete:git:https://github.com >nul 2>&1
    echo.
    echo Cached Git credentials cleared. Retrying push now...
    echo (A browser window will open asking you to sign in as sydmehedi)
    echo.
    goto DO_PUSH
)

echo.
echo You can also test pushing manually in PowerShell with:
echo   git push -u origin main
echo ============================================================================

:FINISH
echo.
echo Press any key to exit this window...
pause >nul