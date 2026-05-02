# Portfolio Backend

Secure backend server for handling contact form submissions.

## Setup

1. Copy `.env.example` to `.env`
2. Configure your email settings:
   - Set up a Gmail account with 2-factor authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Update `EMAIL_USER` and `EMAIL_PASS` in `.env`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## Security Features

- Rate limiting (5 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- No sensitive data exposed to frontend

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Deployment

Deploy to Railway, Render, or any Node.js hosting service.

### Environment Variables for Production:
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail App Password
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Your deployed frontend URL
