# API Usage Examples

## Base URL
```
http://localhost:5000/api
```

## Health Check

### Check if server is running
```bash
curl http://localhost:5000/api/health
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Blog Endpoints

### 1. Get All Blogs

**Request**:
```bash
curl "http://localhost:5000/api/blogs"
```

**With Filters**:
```bash
# Filter by category
curl "http://localhost:5000/api/blogs?category=Technology"

# Sort by title (ascending)
curl "http://localhost:5000/api/blogs?sortBy=title&order=asc"

# Combine filters
curl "http://localhost:5000/api/blogs?category=Technology&sortBy=author&order=desc"
```

**Response (200 OK)**:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React",
      "content": "React is a powerful JavaScript library...",
      "author": "John Doe",
      "description": "Learn React basics",
      "category": "Technology",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Paris Travel Guide",
      "content": "Discover the magic of Paris...",
      "author": "Jane Smith",
      "description": "Everything about Paris",
      "category": "Travel",
      "createdAt": "2024-01-14T15:45:00Z",
      "updatedAt": "2024-01-14T15:45:00Z"
    }
  ]
}
```

---

### 2. Get Single Blog

**Request**:
```bash
curl "http://localhost:5000/api/blogs/507f1f77bcf86cd799439011"
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with React",
    "content": "React is a powerful JavaScript library...",
    "author": "John Doe",
    "description": "Learn React basics",
    "category": "Technology",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

---

### 3. Create Blog

**Request**:
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. In this comprehensive guide, we'll explore how to build scalable server-side applications using Node.js.",
    "author": "Alex Johnson",
    "description": "Learn Node.js from the basics",
    "category": "Technology"
  }'
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "author": "Alex Johnson",
    "description": "Learn Node.js from the basics",
    "category": "Technology",
    "createdAt": "2024-01-16T08:20:00Z",
    "updatedAt": "2024-01-16T08:20:00Z"
  }
}
```

**Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Title, content, and author are required"
}
```

**Validation Error**:
```json
{
  "success": false,
  "error": "Content must be at least 10 characters"
}
```

---

### 4. Update Blog

**Request**:
```bash
curl -X PUT http://localhost:5000/api/blogs/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Node.js - Updated",
    "content": "Node.js is a powerful JavaScript runtime... [Updated content]",
    "author": "Alex Johnson",
    "description": "A comprehensive Node.js guide",
    "category": "Technology"
  }'
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Getting Started with Node.js - Updated",
    "content": "Node.js is a powerful JavaScript runtime...",
    "author": "Alex Johnson",
    "description": "A comprehensive Node.js guide",
    "category": "Technology",
    "createdAt": "2024-01-16T08:20:00Z",
    "updatedAt": "2024-01-16T09:15:00Z"
  }
}
```

---

### 5. Delete Blog

**Request**:
```bash
curl -X DELETE http://localhost:5000/api/blogs/507f1f77bcf86cd799439013
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Getting Started with Node.js - Updated",
    "content": "Node.js is a powerful JavaScript runtime...",
    "author": "Alex Johnson",
    "description": "A comprehensive Node.js guide",
    "category": "Technology",
    "createdAt": "2024-01-16T08:20:00Z",
    "updatedAt": "2024-01-16T09:15:00Z"
  }
}
```

---

## Query Parameters

### Sorting & Filtering

| Parameter | Values | Default | Example |
|-----------|--------|---------|---------|
| `category` | Technology, Travel, Food, Lifestyle, Other | All | `?category=Technology` |
| `sortBy` | createdAt, title, author | createdAt | `?sortBy=title` |
| `order` | asc, desc | desc | `?order=asc` |

**Examples**:
```bash
# All Technology posts, sorted by title, oldest first
curl "http://localhost:5000/api/blogs?category=Technology&sortBy=title&order=asc"

# All Travel posts, sorted by author
curl "http://localhost:5000/api/blogs?category=Travel&sortBy=author"

# All posts, newest first (default)
curl "http://localhost:5000/api/blogs?order=desc"
```

---

## Error Handling

### Common Error Responses

**400 Bad Request** - Missing required fields:
```json
{
  "success": false,
  "error": "Title, content, and author are required"
}
```

**400 Bad Request** - Validation error:
```json
{
  "success": false,
  "error": "Content must be at least 10 characters"
}
```

**404 Not Found** - Blog doesn't exist:
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

**400 Bad Request** - Invalid ID format:
```json
{
  "success": false,
  "error": "Invalid _id: 12345"
}
```

**404 Not Found** - Route doesn't exist:
```json
{
  "success": false,
  "error": "Route not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

---

## Using with JavaScript Fetch

```javascript
// Get all blogs
fetch('http://localhost:5000/api/blogs')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Create blog
fetch('http://localhost:5000/api/blogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Blog',
    content: 'Blog content here...',
    author: 'Your Name',
    category: 'Technology'
  })
})
  .then(res => res.json())
  .then(data => console.log(data.data));

// Update blog
fetch('http://localhost:5000/api/blogs/BLOG_ID', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated Title',
    content: 'Updated content...',
    author: 'Your Name',
    category: 'Technology'
  })
})
  .then(res => res.json())
  .then(data => console.log(data.data));

// Delete blog
fetch('http://localhost:5000/api/blogs/BLOG_ID', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data.message));
```

---

## Using with Axios

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Get all blogs
api.get('/blogs')
  .then(res => console.log(res.data.data));

// Create blog
api.post('/blogs', {
  title: 'New Blog',
  content: 'Blog content here...',
  author: 'Your Name',
  category: 'Technology'
})
  .then(res => console.log(res.data.data));

// Update blog
api.put('/blogs/BLOG_ID', {
  title: 'Updated Title',
  content: 'Updated content...',
  author: 'Your Name',
  category: 'Technology'
})
  .then(res => console.log(res.data.data));

// Delete blog
api.delete('/blogs/BLOG_ID')
  .then(res => console.log(res.data.message));
```

---

## Testing with Postman

1. Import these requests into Postman
2. Set `{{baseUrl}}` variable to `http://localhost:5000/api`
3. Use the examples above for request bodies

**Postman Collection Environment**:
```json
{
  "baseUrl": "http://localhost:5000/api",
  "blogId": ""
}
```

---

## Response Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation or missing fields |
| 404 | Not Found | Blog post doesn't exist |
| 500 | Server Error | Database or server issue |

---

For more information, see [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)
