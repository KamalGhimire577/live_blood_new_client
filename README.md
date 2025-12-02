# Live Blood App - Frontend

A Next.js application for blood donation management system.

## Features

- User authentication (Admin, Donor, Regular User)
- Blood request management
- Donor registration and management
- Admin dashboard
- Real-time blood donation tracking

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd my-next-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your backend URL:
```
BACKEND_URL=http://localhost:4000
ADMIN_TOKEN=your_admin_jwt_token_here
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `BACKEND_URL`: Your production backend URL
   - `ADMIN_TOKEN`: Your admin JWT token

4. Deploy automatically on push to main branch

### Manual Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── Components/      # Reusable components
│   ├── admin/          # Admin pages
│   ├── auth/           # Authentication pages
│   └── ...
├── lib/                # Utilities and configurations
│   ├── store/          # Redux store
│   ├── http/           # API configuration
│   └── types/          # TypeScript types
└── data/               # Static data
```

## Environment Variables

- `BACKEND_URL`: Backend API base URL
- `ADMIN_TOKEN`: JWT token for admin authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request