# ORA SWISS — One-Click GitHub Upload Guide

This project includes an automated Windows script: **`UPLOAD_TO_GITHUB.bat`**.

---

## ✦ How to Use (One-Click)

1. Open your project folder in Windows File Explorer:
   `c:\💻 Web Development\02_Personal_Projects\watch`
2. **Double-click** on **`UPLOAD_TO_GITHUB.bat`**.
3. The script will automatically:
   - Check that **Git** is installed.
   - Confirm you are in the correct project directory (`package.json`).
   - Initialize the Git repository (if not already initialized).
   - Set the branch to `main`.
   - Link the remote repository: `https://github.com/arshadali85579-star/watch-website-.git`.
   - Stage all source code files (respecting `.gitignore`).
   - Create a commit (you can press **Enter** to accept the default message or type a custom note).
   - Push your code directly to GitHub.
4. When finished, the terminal displays the green **SUCCESS** banner and repository link.

---

## ✦ First-Time GitHub Sign-In

If this is your first time pushing to GitHub from your computer:
1. Windows **Git Credential Manager** will automatically open a small browser window asking you to **Sign in with your browser**.
2. Click **Authorize GitCredentialManager**.
3. The upload will automatically continue and finish pushing to your repository.

---

## ✦ What is Excluded from Upload?

The `.gitignore` file protects your repository from bloated and sensitive files:
- `node_modules/` (dependencies installed via `npm install`)
- `dist/` (local build output)
- `ffmpeg.exe` (76 MB local video processing tool)
- `ora-v2 (1).mp4` (reference video)
- `ora-swiss-project.zip` (backup archive)
- `extracted_analysis_frames/` (scratch debug frames)
- `.env*` (environment variables)

**What IS uploaded:**
- Complete source code (`src/`, `index.html`, `vite.config.ts`, `tsconfig.json`)
- All 57 mastered WebP frames (`public/frames/`)
- All watch collection posters and image assets (`public/`)
- `package.json` and `package-lock.json`
- `README.md` and documentation

---

## ✦ Subsequent Updates

Whenever you make new changes to the website in the future:
- Simply **double-click `UPLOAD_TO_GITHUB.bat` again**.
- It will automatically detect only your new changes, commit them, and sync to GitHub without reconfiguring anything.
