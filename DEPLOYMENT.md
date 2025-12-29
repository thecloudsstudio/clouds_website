# ARGIS Deployment Guide

## 1. Prerequisites
- The website is built with **Next.js**.
- The website is built with **Next.js**.
- It is configured as a **Hybrid Site**:
  - **Homepage**: Restored "Clouds Automation" landing page.
  - **ARGIS App**: Mapped to `/intelligence`.
- Uses **Static Export** (`output: export`) for universal hosting compatibility.

## 2. Prepare Production Build
1. Open your terminal in the project directory: `c:\Users\Lenovo\OneDrive\Documents\website`
2. Run the build command:
   ```powershell
   npm run build
## 3. Deployment (Netlify)

Since you are using Netlify, you do **not** need GitHub Actions configuration. Netlify connects directly to this repository.

### Step-by-Step Setup:

1.  **Log in to Netlify Dashboard**.
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Select **GitHub**.
4.  Authorize it and pick this repository: `thecloudsstudio/clouds_website`.
5.  **Configure Build Settings**:
    *   **Build requires**: Netlify auto-detects Next.js.
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `out`
    *   *(Note: `out` is correct because we are using Static Export mode).*
6.  Click **Deploy Site**.

### Verification
- Netlify will give you a URL (e.g., `random-name.netlify.app/intelligence`).
- To make it accessible at `thecloudsstudio.com/intelligence`:
    - **If `thecloudsstudio.com` is also on Netlify**: You might need to set up a **Redirect/Rewrite** key on your *main* website's code to point `/intelligence/*` to this new site.
    - **Or**, you can add a Custom Domain in Netlify settings if this is meant to be a subdomain (e.g., `intelligence.thecloudsstudio.com`).

## 4. Verify Live Site
- Go to `https://thecloudsstudio.com/intelligence`.
- You should see the new ARGIS landing page.
