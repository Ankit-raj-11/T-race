# T-Race - Typing Speed Game

T-Race is a modern typing speed game built with Next.js, Firebase Authentication, and MongoDB Atlas. Players can compete in typing challenges and track their progress with user accounts and leaderboards.

## Features

- 🔐 Firebase Authentication (Google Sign-In)
- 🎯 Real-time typing speed calculation
- 🏆 User leaderboards and statistics
- 📊 MongoDB Atlas for data persistence
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: MongoDB Atlas with Mongoose
- **Deployment**: Vercel (recommended)

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v16 or later)
2. **npm** or **yarn**
3. **Firebase project** with Authentication enabled
4. **MongoDB Atlas cluster** (free tier available)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd T-race
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

### 4. Configure Environment Variables

Edit `.env.local` and add your configuration:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trace-db?retryWrites=true&w=majority

# Firebase Configuration (update firebase.js with your config)
# Get these values from your Firebase project settings at https://console.firebase.google.com/
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key           # Project settings > General > Web API Key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com   # Project settings > General > Auth domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id              # Project settings > General > Project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com    # Project settings > General > Storage bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id  # Project settings > Cloud Messaging > Sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id                      # Project settings > General > App ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id      # Project settings > General > Measurement ID (optional, for analytics)
```

### 5. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure Google Sign-In
3. Update `src/firebase.js` with your Firebase configuration

### 6. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with read/write permissions
4. Whitelist your IP address (use `0.0.0.0/0` for development)
5. Get your connection string and add it to `.env.local`

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── components/          # React components
├── context/            # React Context (Auth)
├── lib/                # Database connection
├── models/             # Mongoose models
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   │   └── users/     # User-related API routes
└── styles/            # Global styles
```

## API Endpoints

- `POST /api/users/create-or-update` - Create or update user data
- `PUT /api/users/update-score` - Update user's game score
- `GET /api/users/leaderboard` - Get leaderboard data

## Usage

1. **Sign In**: Use Google Sign-In to authenticate
2. **Play Game**: Navigate to the race page to start typing
3. **Track Progress**: Your scores and statistics are automatically saved
4. **View Leaderboard**: Check your ranking against other players

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `MONGODB_URI`
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
