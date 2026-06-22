# Aura Jobs MVP

A minimal viable product for local job posting and worker matching. Post small tasks (electrician, plumber, painter, driver) with location, and find nearby verified workers.

## Tech Stack

- **Frontend**: React 18 + Vite, JavaScript, Tailwind CSS
- **Backend**: Firebase (Firestore + Authentication)
- **Hosting**: Vercel
- **Version Control**: GitHub

## Features

- Post tasks with title, category, description, price, and lat/lng
- Browse workers filtered by category and sorted by distance
- Worker registration with skills and location
- Basic email/password authentication
- Task management (view posted tasks)
- Responsive design with minimal styling

## Quickstart

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/local-jobs-mvp.git
   cd local-jobs-mvp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore and Email/Password Authentication
   - Copy your Firebase config to `.env.local` (see `.env.example`)

4. **Seed data** (optional for demo):
   - Workers register themselves via the app
   - For testing, register a few worker accounts manually

5. **Run locally**:
   ```bash
   npm run dev
   ```

6. **Demo script**:
   - Visit home page
   - Register as a worker (fill skills, location)
   - Post a task (login required)
   - Browse workers with your location
   - View tasks

## Deployment to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard (from `.env.local`)
4. Deploy

## Screenshots

- Home: Welcome page with links
- Post Task: Form to submit tasks
- Workers: List of workers with distance
- My Tasks: List of posted tasks

## Known Limitations

- No real-time updates
- No chat or status tracking beyond basic assignment
- No payments or SMS OTP
- Auth is minimal; no profile management
- Distance calculation assumes user inputs lat/lng manually

## Next Steps

- Add OTP verification for signup
- Integrate payments (Stripe)
- Real-time chat between poster and worker
- Push notifications
- KYC for workers
- Mobile app with geolocation

## Security Notes

- Firebase config is exposed in client-side code (normal for Firebase)
- In production, use Firestore security rules to restrict access
- For assignment, implement server-side verification to prevent unauthorized updates
