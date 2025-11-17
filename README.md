# 🏨 The Wild Oasis

A comprehensive cabin booking management system for hotel staff to manage bookings, cabins, guests, and operations for The Wild Oasis - a boutique hotel with 8 luxury cabins.

## 🚀 Live Demo

**[View Live Application](https://the-w-ild-oasis-app-w8zb.vercel.app/dashboard)**

### Demo Credentials
To explore the application, you can use these test credentials:
- **Email:** user@test.com
- **Password:** 123123

> **Note:** This is a shared demo environment. Any changes you make may be visible to other users exploring the application.

---

## 📑 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technologies Used](#️-technologies-used)
- [Database Schema](#-database-schema)
- [Running Locally](#-running-locally)
- [Security](#-security)
- [Learning Outcomes](#-learning-outcomes)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

---

## 📋 About The Project

The Wild Oasis is an internal hotel management application designed for hotel employees to handle day-to-day operations. Staff can manage cabin inventory, process bookings, check in guests, handle payments, and configure hotel settings - all within a secure, authenticated environment.

This project was built as a learning exercise to master modern React patterns, state management, and backend integration with Supabase.

## ✨ Key Features

### 🏠 Cabin Management
- Create, edit, and delete cabin listings
- Upload and manage cabin images
- Set pricing, capacity, and discounts

### 📅 Booking Management
- View all bookings with status indicators (unconfirmed, checked-in, checked-out)
- Create new bookings
- Filter and sort bookings by date and amount
- Delete bookings
- Real-time booking status updates

### ✅ Guest Check-In / Check-Out
- Check in arriving guests
- Check out departing guests
- Confirm payment status
- Add breakfast packages during check-in
- Update total pricing dynamically
- Check out departing guests

### 👤 User Management
- Secure authentication system
- Create new staff user accounts (authenticated users only)
- Update user profiles and avatars
- Change passwords

### ⚙️ Settings Configuration
- Set breakfast price
- Configure minimum and maximum booking length
- Set maximum guests per booking
- Adjust operational parameters

### 📊 Dashboard & Analytics
- Today's arrivals and departures
- Recent booking statistics
- Sales and occupancy charts
- Key performance indicators

### 🎨 Additional Features
- Dark mode support
- Responsive design
- Real-time data synchronization
- Toast notifications for user actions
- Error boundaries for graceful error handling
- Form validation with react-hook-form

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **React Query (TanStack Query)** - Server state management and caching
- **React Hook Form** - Form management and validation
- **React Hot Toast** - Toast notifications
- **React Error Boundary** - Error handling
- **React DatePicker** - Date selection for bookings
- **React Select** - Enhanced select dropdowns
- **React Icons** - Icon library
- **Recharts** - Data visualization and charts
- **date-fns** - Date manipulation

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Storage for images

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## 📊 Database Schema

### Tables

**settings**
- `id` (int8, PK)
- `min_booking_length` (int2)
- `max_booking_length` (int2)
- `max_guests_booking` (int2)
- `breakfast_price` (float4)
- `created_at` (timestamptz)

**cabins**
- `id` (int8, PK)
- `name` (text)
- `max_capacity` (int2)
- `regular_price` (int2)
- `discount` (int2)
- `description` (text)
- `image` (text)
- `created_at` (timestamptz)

**guests**
- `id` (int8, PK)
- `full_name` (text)
- `email` (text)
- `national_id` (text)
- `nationality` (text)
- `country_flag` (text)
- `created_at` (timestamptz)

**bookings**
- `id` (int8, PK)
- `created_at` (timestamptz)
- `start_date` (timestamp)
- `end_date` (timestamp)
- `num_nights` (int2)
- `num_guests` (int2)
- `cabin_price` (float4)
- `extras_price` (float4)
- `total_price` (float4)
- `status` (text) - 'unconfirmed', 'checked-in', 'checked-out'
- `has_breakfast` (bool)
- `has_paid` (bool)
- `observations` (text)
- `cabin_id` (int8, FK)
- `guest_id` (int8, FK)

### Storage Buckets
- `cabin-images` - Cabin photos
- `avatars` - User profile pictures

### Demo Credentials
To explore the application, you can use these test credentials:
- **Email:** user@test.com
- **Password:** 123123

> **Note:** This is a shared demo environment. Any changes you make may be visible to other users exploring the application.

## 💻 Running Locally

If you want to run this project locally:

### Prerequisites
- Node.js (v18 or higher)
- A Supabase account

### Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/HoTa90/The-WIld-Oasis-App.git
   cd the-wild-oasis
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Create the database tables (see Database Schema section)
   - Enable RLS policies
   - Create storage buckets: `cabin-images` and `avatars`

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Security

- All API calls require authentication
- Row Level Security (RLS) enabled on all Supabase tables
- Protected routes - unauthenticated users cannot access the application
- Secure password handling through Supabase Auth

## 📱 Application Screenshots

*Coming soon*

## 🎓 Learning Outcomes

This project helped me master:
- Complex state management with React Query
- Advanced React patterns and hooks
- Supabase integration (database, auth, storage)
- Form handling and validation
- Responsive design with styled-components
- Date handling and validation
- Error handling and boundary components
- Performance optimization with memoization and lazy loading

## 🤝 Acknowledgments

- Built following Jonas Schmedtmann's Ultimate React Course on Udemy

## 📝 License

This project is open source and available for educational purposes.

---

⭐ If you found this project helpful, please consider giving it a star!
