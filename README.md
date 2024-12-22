# Travel Website

A full-stack web application for browsing and booking trips, with separate interfaces for users and trip organizers.

## Features

### User Features
- Browse upcoming trips
- View detailed trip information
- Book trips with secure checkout
- Manage bookings with cancellation options
- View booking history and status

### Organizer Features
- Add and manage trips
- View booking analytics
- Process cancellations
- Monitor available slots

### Core Functionality
- Authentication for users and organizers
- Booking system with refund policies:
  - Full refund: 15+ days before trip
  - 50% refund: 7-14 days before trip
  - No refund: <7 days before trip
- Dummy payment system ready for payment gateway integration
- Responsive design for desktop and mobile

## Tech Stack

- Frontend: React, TailwindCSS
- Backend: Node.js/Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

### Prerequisites
- Node.js v14+
- MongoDB
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd travel-website
```

2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Configure environment variables
npm start
```

### Environment Variables

Backend (.env):
```
MONGODB_URI=mongodb://localhost:27017/travel-website
JWT_SECRET=your_secret_key
PORT=5000
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register user/organizer
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - List all trips
- `POST /api/trips` - Create trip (organizer only)
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/organizer` - Get organizer bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

## Database Schema

Core collections:
- Users (customers and organizers)
- Trips
- Bookings
- Payments

## Performance Features

- Optimized assets loading
- Lazy loading for content
- Concurrent booking handling
- Session management (7-day expiry)

## Security

- JWT-based authentication
- Protected routes for authenticated users
- Role-based access control
- Secure payment handling structure

## Project Structure
```
travel-website/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
```

## Future Enhancements

- Third-party payment gateway integration
- Advanced search and filtering
- Review system
- Email notifications
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License
