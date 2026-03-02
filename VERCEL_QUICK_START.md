# 🚀 Quick Start: Deploy to Vercel in 5 Minutes

## Step 1: Push Code to GitHub
```bash
cd d:\NEXT.js\legendcar
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Create Vercel Account & Connect Project
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select `legendcar` repository
5. Click "Import"

## Step 3: Configure Build Settings
When prompted:
- **Root Directory:** Leave blank
- **Framework:** Next.js (auto-detected)
- **Build Command:** `cd frontend && npm run build`
- **Install Command:** `npm install && cd frontend && npm install && cd ../backend && npm install`
- **Output Directory:** `frontend/.next`

## Step 4: Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-app.vercel.app/api` |

Replace `your-app` with your Vercel project name.

## Step 5: Deploy
Click "Deploy" button. Vercel will:
1. Build the frontend
2. Create serverless functions for APIs
3. Deploy everything automatically

## Done! ✅
Your app will be at: `https://your-app.vercel.app`

---

## Test the Deployment

### Frontend
```
https://your-app.vercel.app
```

### API Endpoints
```
GET https://your-app.vercel.app/api/cars
GET https://your-app.vercel.app/api/health
```

---

## If Deployment Fails

Check these logs:
1. **Vercel Dashboard** → Deployments → [Latest] → View Build Logs
2. Look for red error messages
3. Common issues:
   - Missing env variables → Add in Settings
   - Wrong directory structure → Verify `backend/api/` folder exists
   - Node version mismatch → Ensure Node 18+ in `package.json`

---

## Local Development Testing
```bash
npm run dev
# Frontend: http://localhost:3000
# API: http://localhost:3000/api/cars
```

---

## Set Up Automatic Deployments (CI/CD)

1. Go to GitHub repo → Settings → Secrets and Variables → Actions
2. Add three secrets:
   - `VERCEL_TOKEN` - From https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - From Vercel dashboard (Org or Personal)
   - `VERCEL_PROJECT_ID` - From Vercel dashboard (Project Settings)

3. Every push to `main` will auto-deploy! 🎉

---

For full documentation, see: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
