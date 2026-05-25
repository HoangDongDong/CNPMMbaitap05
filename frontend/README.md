# BaiTap03 Frontend - React + Vite

A modern React frontend application with authentication using Vite, React Router, Axios, and Ant Design.

## Project Structure

```
frontend/
├── src/
│   ├── util/
│   │   └── api.js              # Axios API calls
│   ├── pages/
│   │   ├── register.jsx        # Register page
│   │   ├── register.css
│   │   ├── forgot-password.jsx # Forgot password page
│   │   └── forgot-password.css
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── App.jsx                 # Login component
│   ├── App.css
│   ├── main.jsx                # React Router setup
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── .env                        # Environment variables
```

## Features

- **Authentication System**: Register, Login, and Forgot Password
- **JWT Token Management**: Automatic token storage and request injection
- **Protected Routes**: Global auth context for state management
- **Ant Design UI**: Professional UI components
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: User-friendly error notifications

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:8080`

### Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```
VITE_API_BASE_URL=http://localhost:8080/api/users
```

## Running the Application

**Development mode** (with hot reload):

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

**Build for production**:

```bash
npm run build
```

**Preview production build**:

```bash
npm run preview
```

## API Integration

The frontend uses Axios to communicate with the backend API. All API calls are centralized in `src/util/api.js`:

- **registerApi(name, email, password)** - Register a new user
- **loginApi(email, password)** - User login
- **getUserApi()** - Fetch all users (requires authentication)
- **forgotPasswordApi(email)** - Request password reset

## Pages & Routes

| Route              | Component           | Description            |
| ------------------ | ------------------- | ---------------------- |
| `/`                | App.jsx             | Login page             |
| `/register`        | register.jsx        | User registration      |
| `/forgot-password` | forgot-password.jsx | Password reset request |

## Authentication Flow

1. User registers with name, email, and password
2. User logs in with email and password
3. Backend returns JWT token
4. Token is stored in localStorage
5. Token is automatically included in API requests
6. Protected routes validate token on each request

## Features

### Register Page

- Form validation for name, email, and password
- Password strength validation (min 6 characters)
- Success notification and redirect to login
- Error handling with user feedback

### Login Page

- Email and password authentication
- JWT token generation
- Auth context update
- Navigation to dashboard/home

### Forgot Password Page

- Email-based password reset
- Mock email notification
- Success/error handling

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **antd**: UI component library
- **vite**: Build tool

## Environment Variables

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8080/api/users
```

## Notes

- The application assumes the backend is running on port 8080
- Tokens are stored in localStorage
- Token is automatically added to request headers via Axios interceptor
- All dates are in ISO format from the backend

## Next Steps

- Implement password reset with token validation
- Add user profile page
- Implement logout functionality
- Add role-based access control
- Implement password change feature
