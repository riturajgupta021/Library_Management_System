# Library Management System API

A RESTful API for managing a library system with role-based access control, book management, and member management features.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Librarian Routes](#librarian-routes)
  - [Member Routes](#member-routes)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcryptjs for password hashing

## Setup

### Clone the repository
```bash
git clone https://github.com/yourusername/library-management-system.git
```

### Install dependencies
```bash
cd library-management-system
npm install
```

### Create a `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your-secret-key
```

### Start the server
```bash
npm start
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Auth Routes
#### Sign Up
```http
POST /api/auth/signup
```
**Request Body:**
```json
{
  "username": "john_doe",
  "password": "secure123",
  "role": "MEMBER"
}
```
**Response:**
```json
{
  "message": "User created successfully"
}
```

#### Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "username": "john_doe",
  "password": "secure123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Librarian Routes
#### Add New Book
```http
POST /api/librarian/books
```
**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-3-16-148410-0"
}
```
**Response:**
```json
{
  "_id": "60f1a5b9e6c8a32f3c9c1234",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-3-16-148410-0",
  "status": "AVAILABLE",
  "createdAt": "2023-07-16T10:00:00.000Z"
}
```

#### Update Book
```http
PUT /api/librarian/books/:id
```
**Request Body:**
```json
{
  "title": "The Great Gatsby - Revised Edition",
  "author": "F. Scott Fitzgerald"
}
```

#### View All Members
```http
GET /api/librarian/members
```
**Response:**
```json
[
  {
    "_id": "60f1a5b9e6c8a32f3c9c5678",
    "username": "john_doe",
    "role": "MEMBER",
    "isActive": true,
    "createdAt": "2023-07-16T10:00:00.000Z"
  }
]
```

#### View Transaction History
```http
GET /api/librarian/transactions
```
**Response:**
```json
[
  {
    "_id": "60f1a5b9e6c8a32f3c9c9012",
    "book": {
      "_id": "60f1a5b9e6c8a32f3c9c1234",
      "title": "The Great Gatsby"
    },
    "user": {
      "_id": "60f1a5b9e6c8a32f3c9c5678",
      "username": "john_doe"
    },
    "type": "BORROW",
    "createdAt": "2023-07-16T10:00:00.000Z"
  }
]
```

### Member Routes
#### View Available Books
```http
GET /api/member/books
```
**Response:**
```json
[
  {
    "_id": "60f1a5b9e6c8a32f3c9c1234",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-3-16-148410-0",
    "status": "AVAILABLE"
  }
]
```

#### Borrow Book
```http
POST /api/member/books/:id/borrow
```
**Response:**
```json
{
  "message": "Book borrowed successfully"
}
```

#### Return Book
```http
POST /api/member/books/:id/return
```
**Response:**
```json
{
  "message": "Book returned successfully"
}
```

#### View Personal Borrowing History
```http
GET /api/member/transactions
```
**Response:**
```json
[
  {
    "_id": "60f1a5b9e6c8a32f3c9c9012",
    "book": {
      "_id": "60f1a5b9e6c8a32f3c9c1234",
      "title": "The Great Gatsby"
    },
    "type": "BORROW",
    "createdAt": "2023-07-16T10:00:00.000Z"
  }
]
```

#### Delete Account
```http
DELETE /api/member/account
```
**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

## Data Models
### User Model
```javascript
{
  username: String,
  password: String (hashed),
  role: Enum['LIBRARIAN', 'MEMBER'],
  isActive: Boolean,
  createdAt: Date
}
```

### Book Model
```javascript
{
  title: String,
  author: String,
  isbn: String,
  status: Enum['AVAILABLE', 'BORROWED'],
  createdAt: Date
}
```

### BookTransaction Model
```javascript
{
  book: ObjectId (ref: 'Book'),
  user: ObjectId (ref: 'User'),
  type: Enum['BORROW', 'RETURN'],
  createdAt: Date
}
```

## Error Handling
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
