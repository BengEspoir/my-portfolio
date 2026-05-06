# Deployment Guide

## Overview
This portfolio consists of:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express with secure email handling

## Security Improvements Completed
✅ Removed vulnerable EmailJS frontend dependency
✅ Implemented secure backend API with rate limiting
✅ Added input validation and sanitization
✅ Configured CORS and security headers

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended (100% Free)

#### Backend Deployment (Render)
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create an account
3. Click "New" -> "Web Service"
4. Connect your GitHub repository and select your portfolio repo
5. In settings, set the **Root Directory** to `backend`
6. Set the **Build Command** to `npm install` and **Start Command** to `node server.js`
7. Select the **Free** instance type
8. Set environment variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password
   - `PORT`: 3001
   - `FRONTEND_URL`: Your Vercel URL (Update this after you deploy your frontend)
9. Deploy and copy the Render URL (e.g., `https://your-backend.onrender.com`)
*Note: Render's free tier spins down after 15 minutes of inactivity. It may take ~50 seconds to wake up when someone uses your contact form for the first time.*

#### Frontend Deployment (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Set environment variable:
   - `VITE_API_URL`: Your Render backend URL
4. Deploy

### Option 2: Vercel (Frontend) + Railway (Backend)
*Note: Railway requires a credit card or offers a limited free trial.*
Merge backend into the main project and use Vercel serverless functions.

## Email Setup (Required)
1. Enable 2-factor authentication on your Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as `EMAIL_PASS` (not your regular password)

## Post-Deployment Verification
1. Test contact form on deployed site
2. Check email delivery
3. Verify rate limiting works (try 6 submissions quickly)
4. Test CORS between frontend and backend

## Domain Configuration
After deployment:
1. Add custom domain to both frontend and backend
2. Update `FRONTEND_URL` in backend environment variables
3. Configure SSL certificates (handled automatically by most platforms)

## Monitoring
- Backend includes `/api/health` endpoint for monitoring
- Check logs for email delivery issues
- Monitor rate limiting effectiveness
