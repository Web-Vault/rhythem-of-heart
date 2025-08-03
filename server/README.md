# rhythm of heart - Server

This is the backend server for the rhythm of heart application, providing APIs for user authentication, events, bookings, and posts.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/performer/:id` - Get events by performer ID
- `POST /api/events` - Create a new event (protected)
- `PUT /api/events/:id` - Update an event (protected)
- `DELETE /api/events/:id` - Delete an event (protected)
- `PUT /api/events/:id/performer` - Add a performer to an event (protected)

### Bookings
- `GET /api/bookings` - Get all bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `GET /api/bookings/user` - Get bookings for current user (protected)
- `GET /api/bookings/event/:id` - Get bookings for an event (protected)
- `POST /api/bookings` - Create a new booking (protected)
- `DELETE /api/bookings/:id` - Cancel a booking (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/author/:id` - Get posts by author ID
- `GET /api/posts/tag/:tag` - Get posts by tag
- `POST /api/posts` - Create a new post (protected, performers only)
- `PUT /api/posts/:id` - Update a post (protected, author only)
- `DELETE /api/posts/:id` - Delete a post (protected, author only)
- `PUT /api/posts/:id/like` - Like/unlike a post (protected)

## Database Seeding

The application includes seeders to populate the database with mock data for testing and development.

### Available Seeding Commands

```bash
# Install dependencies
npm install

# Seed all data (users, events, posts, bookings)
npm run seed

# Seed specific data
npm run seed:users
npm run seed:events
npm run seed:posts
npm run seed:bookings

# Destroy all seeded data
npm run seed:destroy
```

### Seeded Data

#### Users
- Admin user (admin@example.com)
- Regular users
- Performers (singers, dancers, musicians)

#### Events
- Various cultural events with different dates, venues, and performers

#### Posts
- Posts by performers about their experiences, upcoming events, etc.

#### Bookings
- Sample bookings for events by both regular users and performers

## Running the Server

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

The server will start on http://localhost:5000 by default.