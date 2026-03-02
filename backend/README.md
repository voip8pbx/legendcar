# Backend Serverless API

This directory contains the backend API endpoints for LegendCar, deployed as Vercel Serverless Functions.

## 📁 Directory Structure

```
backend/
├── api/                    # Vercel Serverless Functions
│   ├── cars.js            # GET /api/cars - Returns all cars
│   └── health.js          # GET /api/health - Health check endpoint
├── index.js               # (Legacy) Local Express server for development
└── package.json           # Dependencies
```

## 🚀 How It Works

### Serverless Functions vs Traditional Server

**Before (Traditional):**
- Express server runs continuously on port 5000
- Handles all requests
- Costs money even when idle

**After (Serverless):**
- Each endpoint is a stateless function
- Functions start on demand
- Only pay when executing
- Auto-scales with traffic

## 📝 Creating New Endpoints

### Example: Create a New API Endpoint

**File:** `backend/api/products.js`

```javascript
/**
 * GET /api/products
 * Returns all products
 */

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // GET handler
  if (req.method === 'GET') {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ];
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      data: products
    });
    return;
  }
  
  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
};
```

This automatically creates endpoint: `GET /api/products`

## 🔧 Endpoint Reference

### GET /api/cars
Returns all classic cars in the collection.

**Request:**
```bash
GET https://your-app.vercel.app/api/cars
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "year": "1969",
      "model": "Dodge Charger",
      "image": "https://..."
    }
  ],
  "count": 6
}
```

### GET /api/health
Health check endpoint to verify API is running.

**Request:**
```bash
GET https://your-app.vercel.app/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-02T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

## 🧪 Development

### Local Testing (Express Server)
While Vercel uses serverless functions, the legacy `index.js` provides a traditional Express server for local development:

```bash
# Start backend only
cd backend
npm run dev

# Visit http://localhost:5000/api/cars
```

### Testing Serverless Functions Locally
Use Vercel CLI to test serverless functions locally:

```bash
npm install -g vercel
vercel dev
# Tests all functions in api/ directory
# http://localhost:3000/api/cars
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1"
  }
}
```

Note: Express is optional now (only used in `index.js` for local development). Serverless functions don't need it.

## 🔐 Environment Variables

In `backend/api/*.js` files:
- Access via `process.env.VARIABLE_NAME`
- Use `dotenv` to load `.env` files locally
- Set in Vercel dashboard for production

Example:
```javascript
const apiKey = process.env.EXTERNAL_API_KEY;
```

## ⚙️ Vercel Configuration

See `vercel.json` in the root directory:

```json
{
  "functions": {
    "backend/api/**/*.js": {
      "runtime": "nodejs20.x",
      "memory": 512,
      "maxDuration": 30
    }
  }
}
```

**Settings:**
- `runtime`: Node.js version (18.x, 20.x, etc.)
- `memory`: RAM allocated (128MB - 3GB)
- `maxDuration`: Maximum execution time (5-900 seconds)

## 🚢 Deployment Notes

1. **File Naming:**
   - `api/cars.js` → `/api/cars`
   - `api/v1/products.js` → `/api/v1/products`
   - `api/admin/users.js` → `/api/admin/users`

2. **Request/Response:**
   - Node.js native `req` and `res` objects
   - No need for Express middleware
   - Return JSON for API responses

3. **Limits:**
   - Max execution time: 30 seconds
   - Max memory: 512MB (configurable)
   - Request timeout: 60 seconds

4. **Best Practices:**
   - Keep functions stateless
   - Use databases for persistence
   - Cache frequently accessed data
   - Handle errors gracefully

## 🐛 Troubleshooting

### Function Not Found
- Check file is in `backend/api/` directory
- Verify filename matches URL path
- Restart Vercel dev server

### CORS Errors
- Add CORS headers in function:
  ```javascript
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ```

### Timeout Errors
- Check function is taking too long
- Optimize database queries
- Increase `maxDuration` in `vercel.json` if needed

### Module Not Found
- Ensure dependency is in `package.json`
- Run `npm install` locally
- Check node version matches runtime

## 📚 Resources

- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Node.js Request/Response](https://nodejs.org/en/docs/guides/nodejs-web-app/)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎯 Migration from Express

If you want to convert more Express routes to serverless:

### Express Route
```javascript
app.get('/api/cars', (req, res) => {
  res.json({ cars: [] });
});
```

### Serverless Function
```javascript
module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ cars: [] });
    return;
  }
  res.status(405).json({ error: 'Not allowed' });
};
```

The pattern is simple:
1. Export a handler function instead of Express app
2. Check `req.method` manually
3. Use `res.setHeader()` instead of Express middleware
4. Return early with `res.end()` or `.json()`
