# 📦 LegendCar Vercel Deployment Guide

## Overview

This guide provides complete instructions for deploying the LegendCar monorepo (Next.js frontend + Express backend) to Vercel. The project uses Vercel Serverless Functions for the backend API and Next.js for the frontend.

---

## 📋 Summary of Changes Made for Vercel Deployment

### 1. **Root Configuration**
- ✅ Added `vercel.json` - Vercel build configuration
- ✅ Updated `package.json` - Added workspace configuration and build scripts
- ✅ Created `.env.example` - Environment variable template

### 2. **Frontend (Next.js)**
- ✅ Updated `frontend/package.json` - Added engine requirements and export script
- ✅ Ensured `next.config.ts` is compatible

### 3. **Backend (Express → Serverless)**
- ✅ Created `/backend/api/` directory for Vercel Serverless Functions
- ✅ Converted `backend/index.js` logic to serverless function handlers
- ✅ Created:
  - `backend/api/cars.js` - Cars API endpoint
  - `backend/api/health.js` - Health check endpoint
- ✅ Updated `backend/package.json` - Removed port binding, optimized for serverless

### 4. **CI/CD Pipeline**
- ✅ Created `.github/workflows/deploy.yml` - GitHub Actions workflow
  - Runs tests on every push
  - Deploys to Vercel Preview on PRs
  - Deploys to Production on main branch pushes

---

## 🎯 Directory Structure for Vercel

```
legendcar/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions CI/CD
├── frontend/                          # Next.js app (main output)
│   ├── src/
│   ├── public/
│   ├── .next/                        # Build output
│   ├── package.json                  # Frontend dependencies
│   └── next.config.ts                # Next.js config
├── backend/
│   ├── api/                          # 🆕 Vercel Serverless Functions
│   │   ├── cars.js                  # GET /api/cars
│   │   └── health.js                # GET /api/health
│   ├── index.js                      # (legacy - can remove after migration)
│   └── package.json                  # Backend dependencies (no express server needed)
├── vercel.json                       # 🆕 Vercel configuration
├── .env.example                      # 🆕 Environment variables template
└── package.json                      # Root workspace config
```

### Directory Setup Checklist:
- [x] `backend/api/` folder exists
- [x] Serverless function files are in `backend/api/*.js`
- [x] `.github/workflows/` exists with `deploy.yml`
- [x] `vercel.json` is in root directory
- [x] All files committed to git

---

## 🔧 Configuration Files

### 1. **vercel.json** (Root)
```json
{
  "buildCommand": "cd frontend && npm run build",
  "installCommand": "npm install && cd frontend && npm install && cd ../backend && npm install",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_API_URL": {
      "description": "API base URL for frontend",
      "required": true
    }
  },
  "functions": {
    "backend/api/**/*.js": {
      "runtime": "nodejs20.x",
      "memory": 512,
      "maxDuration": 30
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/$1",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    }
  ]
}
```

**Key Points:**
- Frontend is the main output (`outputDirectory`)
- Backend functions are in `backend/api/` directory
- `/api/*` routes are routed to serverless functions
- Environment variables are set in Vercel dashboard

### 2. **package.json** (Root)
```json
{
  "scripts": {
    "dev": "npx -y concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\"",
    "build": "npm run build --workspace=frontend && npm run build --workspace=backend",
    "start": "cd frontend && npm run start",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build"
  },
  "workspaces": ["frontend", "backend"],
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 3. **package.json** (Frontend)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "export": "next export"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 4. **package.json** (Backend)
```json
{
  "scripts": {
    "dev": "node index.js",
    "start": "node index.js",
    "build": "echo \"No build needed for serverless functions\""
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🌐 Environment Variables

### Vercel Dashboard Setup

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add these variables:**

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-domain.vercel.app/api` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

3. **Local Development (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Environment Variable Names
- **`NEXT_PUBLIC_*`** - Accessible in browser (frontend)
- **`NODE_ENV`** - Node.js environment setting

---

## 📡 API Endpoint Structure

### Before (Express Server - NOT on Vercel):
```
http://localhost:5000/api/cars
```

### After (Vercel Serverless Functions):
```
https://your-domain.vercel.app/api/cars
```

### Available Endpoints:

#### 1. **Get All Cars**
```
GET /api/cars

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "year": "1969",
      "model": "Dodge Charger",
      "image": "https://..."
    },
    ...
  ],
  "count": 6
}
```

#### 2. **Health Check**
```
GET /api/health

Response:
{
  "status": "healthy",
  "timestamp": "2024-03-02T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

---

## 🚀 Deployment Checklist

### Pre-Deployment (Local)
- [ ] All files committed to git
- [ ] No uncommitted changes (`git status` is clean)
- [ ] `backend/api/` folder exists with function files
- [ ] `vercel.json` is in root
- [ ] All package.json files updated
- [ ] `.env.example` created
- [ ] GitHub Actions workflow created at `.github/workflows/deploy.yml`
- [ ] Local tests pass (`npm run lint`, `npm run build`)

### Vercel Setup
- [ ] Create account at https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Select your `legendcar` repository
- [ ] Choose "Next.js" framework (Vercel should auto-detect)
- [ ] **Root Directory:** Leave blank or select root
- [ ] **Build Command:** `cd frontend && npm run build`
- [ ] **Output Directory:** `frontend/.next`

### Environment Variables (Vercel Dashboard)
- [ ] Set `NEXT_PUBLIC_API_URL` to your Vercel domain
- [ ] Verify all required variables are set
- [ ] Test preview deployment first

### GitHub Secrets (for CI/CD)
1. Go to GitHub repo → Settings → Secrets and Variables → Actions
2. Add these secrets:
   - [ ] `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - [ ] `VERCEL_ORG_ID` - From Vercel dashboard
   - [ ] `VERCEL_PROJECT_ID` - From Vercel dashboard

### Final Verification
- [ ] Push to main branch
- [ ] GitHub Actions workflow runs automatically
- [ ] Vercel deployment completes
- [ ] Test `/api/cars` endpoint
- [ ] Test `/api/health` endpoint
- [ ] Frontend loads correctly
- [ ] API calls work from frontend
- [ ] No console errors in browser

---

## 🔗 Frontend to Backend Communication

### In Your Frontend Component:

```typescript
// src/app/page.tsx or components/CarGallery.tsx

useEffect(() => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  fetch(`${apiUrl}/cars`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Use data.data for cars array
    })
    .catch(err => console.error('API Error:', err));
}, []);
```

### CORS Configuration
The serverless functions have CORS enabled for all origins:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
```

For production, restrict to your domain:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.vercel.app');
```

---

## 🐛 Troubleshooting

### Issue: "Error: src refspec main does not match any"
**Solution:** Branch to `main` first:
```bash
git branch -M main
git push -u origin main
```

### Issue: Frontend builds but API returns 404
**Solution:** 
1. Check `vercel.json` routes section
2. Verify `backend/api/cars.js` exists
3. Check `NEXT_PUBLIC_API_URL` environment variable

### Issue: CORS errors from frontend
**Solution:**
1. Verify CORS headers are set in serverless functions
2. Update `res.setHeader('Access-Control-Allow-Origin', '*')`
3. Check browser console for specific error

### Issue: Build fails on Vercel
**Solution:**
1. Check Build Logs in Vercel dashboard
2. Verify all dependencies are in package.json
3. Check Node.js version compatibility
4. Ensure no `.next` folder is committed

### Issue: API not accessible
**Solution:**
1. Verify `/backend/api/` folder structure
2. Check Vercel Functions are deployed (Vercel dashboard → Functions tab)
3. Test health check: `GET /api/health`
4. Check Vercel logs for errors

---

## 📊 Expected Folder Structure on Vercel

After deployment, Vercel will create:

```
.vercel/
  output/
    functions/
      backend/api/cars.js          # Serverless function
      backend/api/health.js        # Serverless function
    static/
      # Next.js static files
```

---

## 🎓 Key Concepts

### Serverless Functions vs Traditional Server
- **Before:** Express server running on port 5000 (NOT on Vercel)
- **After:** Stateless functions that start on demand

### How It Works
1. Request comes to `https://legendcar.vercel.app/api/cars`
2. Vercel routes to `backend/api/cars.js`
3. Function executes, returns JSON
4. Function shuts down (no server running)

### Benefits
- Auto-scaling (handles traffic spikes)
- Pay only for execution time
- No costs when idle
- Global deployment

---

## 📚 Next Steps

1. **Test Locally**
   ```bash
   npm run dev
   # Frontend at http://localhost:3000
   # Backend at http://localhost:5000
   ```

2. **Deploy to Vercel**
   ```bash
   git push origin main
   # GitHub Actions triggers
   # Vercel builds and deploys
   ```

3. **Monitor Deployment**
   - Vercel Dashboard → Deployments tab
   - Check build logs
   - Test endpoints

4. **Setup Custom Domain**
   - Vercel Dashboard → Project Settings → Domains
   - Add your custom domain

---

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## ✅ Deployment Status

- **Configuration Files:** ✅ Created
- **Backend Serverless:** ✅ Converted
- **CI/CD Pipeline:** ✅ Setup
- **Documentation:** ✅ Complete
- **Ready to Deploy:** ✅ YES

**Next Action:** Push changes to `main` branch → GitHub Actions → Vercel automatic deployment
