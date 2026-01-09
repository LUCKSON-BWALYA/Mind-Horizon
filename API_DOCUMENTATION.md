# Mind-Horizon API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer [token]
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Get Current User
**GET** `/auth/me` (Protected)

Get the authenticated user's profile.

**Headers**:
```
Authorization: Bearer [token]
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Blog Endpoints

### Get All Blogs
**GET** `/blogs`

Retrieve all blog posts with optional filtering and sorting.

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category (Technology, Travel, Food, Lifestyle, Mindfulness, Other) |
| sortBy | string | Sort field (createdAt, title, author) - default: createdAt |
| order | string | Sort order (asc, desc) - default: desc |

**Example**:
```
GET /blogs?category=Technology&sortBy=createdAt&order=desc
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React",
      "content": "<p>Rich HTML content here...</p>",
      "author": "John Doe",
      "description": "A beginner's guide to React",
      "category": "Technology",
      "featuredImage": "/uploads/image-1234567890.jpg",
      "tags": ["react", "javascript"],
      "views": 150,
      "likes": ["507f1f77bcf86cd799439012"],
      "comments": ["507f1f77bcf86cd799439013"],
      "createdAt": "2026-01-09T10:30:00Z",
      "updatedAt": "2026-01-09T10:30:00Z"
    }
  ]
}
```

---

### Get Single Blog
**GET** `/blogs/:id`

Retrieve a specific blog post by ID. Auto-increments view count.

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Blog post MongoDB ID |

**Example**:
```
GET /blogs/507f1f77bcf86cd799439011
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with React",
    "content": "<p>Rich HTML content here...</p>",
    "author": "John Doe",
    "description": "A beginner's guide to React",
    "category": "Technology",
    "featuredImage": "/uploads/image-1234567890.jpg",
    "tags": ["react", "javascript"],
    "views": 151,
    "likes": ["507f1f77bcf86cd799439012"],
    "comments": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "content": "Great post!",
        "author": "Jane Smith"
      }
    ]
  }
}
```

---

### Create Blog Post
**POST** `/blogs` (Protected)

Create a new blog post with optional featured image.

**Headers**:
```
Authorization: Bearer [token]
Content-Type: multipart/form-data
```

**Form Data**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Blog post title (max 200 chars) |
| content | string | Yes | Blog content (min 10 chars, HTML supported) |
| author | string | Yes | Author name (max 100 chars) |
| description | string | No | Brief description (max 300 chars) |
| category | string | No | Category (default: Other) |
| featuredImage | file | No | Featured image (JPEG, PNG, GIF, WebP, max 5MB) |

**Example**:
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer [token]" \
  -F "title=My New Blog" \
  -F "author=John Doe" \
  -F "content=<p>Blog content</p>" \
  -F "category=Technology" \
  -F "featuredImage=@/path/to/image.jpg"
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "My New Blog",
    "author": "John Doe",
    "content": "<p>Blog content</p>",
    "category": "Technology",
    "featuredImage": "/uploads/image-1234567890.jpg",
    "views": 0,
    "likes": [],
    "comments": [],
    "createdAt": "2026-01-09T11:00:00Z"
  }
}
```

---

### Update Blog Post
**PUT** `/blogs/:id` (Protected)

Update an existing blog post.

**Headers**:
```
Authorization: Bearer [token]
Content-Type: multipart/form-data
```

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Blog post MongoDB ID |

**Form Data**: Same as Create Blog Post

**Example**:
```bash
curl -X PUT http://localhost:5000/api/blogs/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer [token]" \
  -F "title=Updated Blog Title" \
  -F "content=<p>Updated content</p>"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Blog Title",
    "content": "<p>Updated content</p>",
    "updatedAt": "2026-01-09T11:30:00Z"
  }
}
```

---

### Delete Blog Post
**DELETE** `/blogs/:id` (Protected)

Delete a blog post and its associated image.

**Headers**:
```
Authorization: Bearer [token]
```

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Blog post MongoDB ID |

**Example**:
```bash
curl -X DELETE http://localhost:5000/api/blogs/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer [token]"
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

---

## Comment Endpoints

### Create Comment
**POST** `/comments`

Create a new comment on a blog post.

**Request Body**:
```json
{
  "content": "Great blog post! Very informative.",
  "author": "Jane Smith",
  "blog": "507f1f77bcf86cd799439011"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "content": "Great blog post! Very informative.",
    "author": "Jane Smith",
    "blog": "507f1f77bcf86cd799439011",
    "likes": [],
    "isApproved": true,
    "createdAt": "2026-01-09T12:00:00Z"
  }
}
```

---

### Get Comments for Blog
**GET** `/comments/blog/:blogId`

Get all approved comments for a specific blog post.

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| blogId | string | Blog post MongoDB ID |

**Example**:
```
GET /comments/blog/507f1f77bcf86cd799439011
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "content": "Great blog post!",
      "author": "Jane Smith",
      "likes": ["507f1f77bcf86cd799439012"],
      "createdAt": "2026-01-09T12:00:00Z"
    }
  ]
}
```

---

### Get All Comments (Admin)
**GET** `/comments`

Get all comments in the system (for admin moderation).

**Headers**:
```
Authorization: Bearer [admin-token]
```

**Response** (200 OK):
```json
{
  "success": true,
  "count": 25,
  "data": [...]
}
```

---

### Update Comment
**PUT** `/comments/:id` (Protected)

Update a comment's content.

**Headers**:
```
Authorization: Bearer [token]
```

**Request Body**:
```json
{
  "content": "Updated comment content"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "content": "Updated comment content",
    "updatedAt": "2026-01-09T13:00:00Z"
  }
}
```

---

### Delete Comment
**DELETE** `/comments/:id` (Protected)

Delete a comment from a blog post.

**Headers**:
```
Authorization: Bearer [token]
```

**Example**:
```bash
curl -X DELETE http://localhost:5000/api/comments/507f1f77bcf86cd799439015 \
  -H "Authorization: Bearer [token]"
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Comment deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015"
  }
}
```

---

### Like Comment
**POST** `/comments/:id/like` (Protected)

Like or unlike a comment. Toggle functionality.

**Headers**:
```
Authorization: Bearer [token]
```

**Example**:
```bash
curl -X POST http://localhost:5000/api/comments/507f1f77bcf86cd799439015/like \
  -H "Authorization: Bearer [token]"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "likes": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439016"]
  }
}
```

---

## Health Check

### Server Health
**GET** `/health`

Check if the server is running.

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Title, content, and author are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized, token missing"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting
Currently not implemented. Recommended for production.

---

## CORS
Enabled for all origins. Recommended to restrict in production.

---

## File Upload
- **Endpoint**: POST/PUT `/blogs` with `featuredImage` field
- **Max Size**: 5MB
- **Allowed Types**: JPEG, PNG, GIF, WebP
- **Storage**: `/backend/uploads/`
- **Served At**: `/uploads/:filename`

---

## Example Workflows

### 1. User Registration and Blog Creation
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Response includes token: "eyJhb..."

# 2. Create Blog
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer eyJhb..." \
  -F "title=My First Blog" \
  -F "author=John Doe" \
  -F "content=<p>Hello World</p>" \
  -F "category=Other"

# Response includes blog ID
```

### 2. View Blog and Add Comment
```bash
# 1. View Blog (increments views)
curl http://localhost:5000/api/blogs/507f1f77bcf86cd799439011

# 2. Add Comment
curl -X POST http://localhost:5000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great post!",
    "author": "Jane Smith",
    "blog": "507f1f77bcf86cd799439011"
  }'

# 3. Like Comment
curl -X POST http://localhost:5000/api/comments/507f1f77bcf86cd799439015/like \
  -H "Authorization: Bearer [token]"
```

---

## Pagination Implementation (Frontend)
The frontend implements client-side pagination with 6 posts per page.

**Query**: 
```javascript
// Get all posts
const response = await fetch('/api/blogs?category=Technology&sortBy=createdAt&order=desc');

// Frontend filters and paginates
const itemsPerPage = 6;
const currentPage = 1;
const paginatedBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
```

---

**Last Updated**: January 9, 2026
**Version**: 1.0.0
