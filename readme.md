Library Management System API
A RESTful API for managing a library system with role-based access control, book management, and member management features.
Table of Contents

Technologies Used
Setup
Authentication
API Endpoints

Auth Routes
Librarian Routes
Member Routes


Data Models

Technologies Used

Node.js
Express.js
MongoDB
JWT for authentication
bcryptjs for password hashing

Setup

Clone the repository

bashCopygit clone https://github.com/yourusername/library-management-system.git

Install dependencies

bashCopycd library-management-system
npm install

Create a .env file in the root directory

envCopyPORT=3000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your-secret-key

Start the server

bashCopynpm start
Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
CopyAuthorization: Bearer <your-jwt-token>
API Endpoints
Auth Routes
Sign Up
httpCopyPOST /api/auth/signup
Creates a new user account (LIBRARIAN or MEMBER)
Request body:
jsonCopy{
  "username": "john_doe",
  "password": "secure123",
  "role": "MEMBER"
}
Response:
jsonCopy{
  "message": "User created successfully"
}
Login
httpCopyPOST /api/auth/login
Authenticates a user and returns a JWT token
Request body:
jsonCopy{
  "username": "john_doe",
  "password": "secure123"
}
Response:
jsonCopy{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Librarian Routes
Add New Book
httpCopyPOST /api/librarian/books
Adds a new book to the library
Request body:
jsonCopy{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-3-16-148410-0"
}
Response:
jsonCopy{
  "_id": "60f1a5b9e6c8a32f3c9c1234",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-3-16-148410-0",
  "status": "AVAILABLE",
  "createdAt": "2023-07-16T10:00:00.000Z"
}
Update Book
httpCopyPUT /api/librarian/books/:id
Updates book information
Request body:
jsonCopy{
  "title": "The Great Gatsby - Revised Edition",
  "author": "F. Scott Fitzgerald"
}
View All Members
httpCopyGET /api/librarian/members
Response:
jsonCopy[
  {
    "_id": "60f1a5b9e6c8a32f3c9c5678",
    "username": "john_doe",
    "role": "MEMBER",
    "isActive": true,
    "createdAt": "2023-07-16T10:00:00.000Z"
  }
]
View Transaction History
httpCopyGET /api/librarian/transactions
Response:
jsonCopy[
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
Member Routes
View Available Books
httpCopyGET /api/member/books
Response:
jsonCopy[
  {
    "_id": "60f1a5b9e6c8a32f3c9c1234",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-3-16-148410-0",
    "status": "AVAILABLE"
  }
]
Borrow Book
httpCopyPOST /api/member/books/:id/borrow
Response:
jsonCopy{
  "message": "Book borrowed successfully"
}
Return Book
httpCopyPOST /api/member/books/:id/return
Response:
jsonCopy{
  "message": "Book returned successfully"
}
View Personal Borrowing History
httpCopyGET /api/member/transactions
Response:
jsonCopy[
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
Delete Account
httpCopyDELETE /api/member/account
Response:
jsonCopy{
  "message": "Account deleted successfully"
}
Data Models
User Model
javascriptCopy{
  username: String,
  password: String (hashed),
  role: Enum['LIBRARIAN', 'MEMBER'],
  isActive: Boolean,
  createdAt: Date
}
Book Model
javascriptCopy{
  title: String,
  author: String,
  isbn: String,
  status: Enum['AVAILABLE', 'BORROWED'],
  createdAt: Date
}
BookTransaction Model
javascriptCopy{
  book: ObjectId (ref: 'Book'),
  user: ObjectId (ref: 'User'),
  type: Enum['BORROW', 'RETURN'],
  createdAt: Date
}
Error Handling
The API returns appropriate HTTP status codes:

200: Success
201: Created
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
500: Internal Server Error

Contributing

Fork the repository
Create a new branch
Make your changes
Submit a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.