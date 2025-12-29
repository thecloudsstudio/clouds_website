# ARGIS Deployment Guide

## 1. Prerequisites
- The website is built with **Next.js**.
- It is configured to run on the subpath `/intelligence`.

## 2. Prepare Production Build
1. Open your terminal in the project directory: `c:\Users\Lenovo\OneDrive\Documents\website`
2. Run the build command:
   ```powershell
   npm run build
   ```
   *This creates a `.next` folder with the optimized production application.*

## 3. Deploy to Hosting Provider

### Option A: Vercel (Recommended)
If you typically deploy via Vercel:
1. Push your latest code to your Git repository (GitHub/GitLab).
   - *Since I cannot access your private repo credentials, please run these commands manually:*
     ```powershell
     git add .
     git commit -m "Final ARGIS Release - Mapped to /intelligence"
     git push origin main
     ```
2. Vercel will automatically detect the `Next.js` app.
3. **IMPORTANT**: Ensure Vercel project settings do NOT override the `basePath`. The code itself handles the `/intelligence` path.

### Option B: Static Export (For standard web servers)
If you are hosting on a traditional server (Apache/Nginx/cPanel) alongside your main WordPress/HTML site:
1. Update `next.config.ts`:
   Add `output: 'export'` inside the config object.
2. Run `npm run build`.
3. An `out` folder will be created.
4. Upload the contents of the `out` folder to a folder named `intelligence` on your web server.

## 4. Verify Live Site
- Go to `https://thecloudsstudio.com/intelligence`.
- You should see the new ARGIS landing page.
