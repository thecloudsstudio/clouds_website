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

## 3. Automated Deployment (CD Pipeline)

I have set up a **GitHub Action** to automatically build and deploy your site whenever you push to `main`.

### One-Time Setup Required
For this to work, you must add your hosting credentials to **GitHub Repository Secrets**:

1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret** and add the following:
   
   | Secret Name | Value Example |
   |-------------|---------------|
   | `FTP_SERVER` | `ftp.thecloudsstudio.com` |
   | `FTP_USERNAME` | `your_ftp_user` |
   | `FTP_PASSWORD` | `your_ftp_password` |

3. **Verify Target Folder**:
   - The workflow attempts to upload to `./public_html/intelligence/`. 
   - If your server path is different, edit `.github/workflows/deploy.yml` line 34: `server-dir: ./your/path/`

### Manual Deploy (Fallback)
If the automation fails or you prefer manual control:
1. Run local build: `npm run build`
2. Upload the content of the `out` folder to your server manually.

## 4. Verify Live Site
- Go to `https://thecloudsstudio.com/intelligence`.
- You should see the new ARGIS landing page.
