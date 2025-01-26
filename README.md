# Manhning - Manga/Manhwa Reader with Music

A modern web application for reading manga and manhwa with background music functionality. Built with Next.js and MongoDB.

![Manhning Screenshot](screenshot.png)

## Features

- 📚 Read manga and manhwa online
- 🎵 Background music player with playlist
- 🎨 Clean, modern UI design
- 📱 Responsive layout for all devices
- 🔒 Google Sign-in integration
- 🎯 Quick access to popular and latest titles

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - TypeScript
  - CSS Modules
  - React Player

- **Backend:**
  - MongoDB
  - Next.js API Routes

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/manhning.git
cd manhning
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure