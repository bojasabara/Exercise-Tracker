step: 
1. D:\i\project\fitness-tracker-sebelas\exercise-tracker\backend> npm start 
2. add new powershell
3. PS D:\i\project\fitness-tracker-sebelas\exercise-tracker\client> npm start

## Deployment Instructions

1. Backend Deployment:
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to backend directory: `cd backend`
   - Deploy: `vercel`
   - Set environment variables in Vercel dashboard:
     - MONGODB_URI
     - PORT

2. Frontend Deployment:
   - Update config.js with backend URL
   - Navigate to client directory: `cd client`
   - Deploy: `vercel`

Note: Make sure to update the apiUrl in config.js with your actual backend URL after deployment.