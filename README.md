# Kilimanjaro Groups Booking System

A Next.js application for managing group bookings for Kilimanjaro climbs.

## Features

- Booking management system
- Automated email notifications
- Payment tracking
- Training progress monitoring
- Acclimatization tracking
- Interactive maps with Mapbox integration
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Resend for emails
- Mapbox for maps
- Vercel for deployment

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=your_app_url
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kilimanjaro-groups.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## License

MIT 