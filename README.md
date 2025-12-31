# Mind Horizon - Professional Full Stack Blog Application

A modern, professional full-stack blog application built with Node.js, Express, MongoDB, and React. This application demonstrates complete CRUD (Create, Read, Update, Delete) functionality with a clean, responsive user interface.

## 🎯 Project Overview

Mind Horizon is a fully functional blog platform where users can:
- **Create** new blog posts with title, content, author, and category
- **Read** all blog posts with filtering and sorting options
- **Update** existing blog posts
- **Delete** blog posts
- Filter posts by category
- Sort posts by creation date, title, or author

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v4.18.2)
- **Database**: MongoDB with Mongoose (v7.0.0)
- **Additional**: CORS, Dotenv for environment variables

### Frontend
- **Library**: React (v18.2.0)
- **Routing**: React Router v6
- **Styling**: CSS3 with custom responsive design
- **State Management**: React Hooks (useState, useEffect)

## 📁 Project Structure

```
Mind-Horizon/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── models/
│   │   └── Blog.js              # Mongoose Blog schema
│   ├── controllers/
│   │   └── blogController.js    # Business logic for blog operations
│   ├── routes/
│   │   └── blogRoutes.js        # API route definitions
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling middleware
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore               # Git ignore rules
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   └── Footer.js        # Footer component
│   │   ├── pages/
│   │   │   ├── BlogList.js      # Home page with blog listing
│   │   │   ├── BlogDetail.js    # Single blog post view
│   │   │   └── BlogForm.js      # Create/Edit blog form
│   │   ├── services/
│   │   │   └── blogService.js   # API integration service
│   │   ├── styles/
│   │   │   ├── index.css        # Global styles
│   │   │   ├── App.css          # App layout styles
│   │   │   ├── Header.css       # Header styling
│   │   │   ├── Footer.css       # Footer styling
│   │   │   ├── BlogList.css     # Blog list page styles
│   │   │   ├── BlogDetail.css   # Blog detail page styles
│   │   │   └── BlogForm.css     # Blog form page styles
│   │   ├── App.js               # Main app component with routing
│   │   └── index.js             # React entry point
│   ├── package.json             # Frontend dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore               # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB connection**:
   Edit `.env` and set your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/blog-app
   NODE_ENV=development
   PORT=5000
   ```

   **MongoDB Options**:
   - **Local MongoDB**: `mongodb://localhost:27017/blog-app`
   - **MongoDB Atlas**: `mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-app`

5. **Start the backend server**:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory** (in a new terminal):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Verify the API URL** (default configuration):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the React development server**:
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Blogs
```http
GET /blogs?category=Technology&sortBy=createdAt&order=desc
```
**Query Parameters**:
- `category` (optional): Filter by category (Technology, Travel, Food, Lifestyle, Other)
- `sortBy` (optional): Sort field (createdAt, title, author) - default: createdAt
- `order` (optional): Sort order (asc, desc) - default: desc

**Response**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Blog Title",
      "content": "Blog content...",
      "author": "Author Name",
      "description": "Short description",
      "category": "Technology",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Single Blog
```http
GET /blogs/:id
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Blog Title",
    "content": "Blog content...",
    "author": "Author Name",
    "description": "Short description",
    "category": "Technology",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Create Blog
```http
POST /blogs
Content-Type: application/json

{
  "title": "New Blog Post",
  "content": "This is the blog content...",
  "author": "Author Name",
  "description": "Short description",
  "category": "Technology"
}
```

**Required Fields**: title, content, author  
**Optional Fields**: description, category

**Response**: Returns created blog object (201 Created)

#### Update Blog
```http
PUT /blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Updated Author",
  "description": "Updated description",
  "category": "Technology"
}
```

**Response**: Returns updated blog object (200 OK)

#### Delete Blog
```http
DELETE /blogs/:id
```

**Response**:
```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": { ...deletedBlog }
}
```

#### Health Check
```http
GET /api/health
```

## 🎨 Features

### Frontend Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Blog Listing**: View all blog posts with grid layout
- **Filtering**: Filter blogs by category
- **Sorting**: Sort by creation date, title, or author
- **Blog Details**: Full blog post view with metadata
- **Create Blog**: Form to create new blog posts with validation
- **Edit Blog**: Update existing blog posts
- **Delete Blog**: Remove blog posts with confirmation
- **Navigation**: Smooth routing between pages
- **Error Handling**: User-friendly error messages

### Backend Features
- **RESTful API**: Clean and consistent API design
- **Data Validation**: Input validation on all endpoints
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Timestamps**: Automatic creation and update timestamps
- **CORS**: Enabled for cross-origin requests
- **MongoDB**: Persistent data storage with Mongoose ODM

## 🔒 Validation Rules

### Blog Post Validation
- **Title**: Required, max 200 characters
- **Content**: Required, minimum 10 characters
- **Author**: Required, max 100 characters
- **Description**: Optional, max 300 characters
- **Category**: Technology, Travel, Food, Lifestyle, or Other

## 📝 Sample Data

You can create sample blog posts through the UI or using curl:

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with React",
    "content": "React is a powerful JavaScript library for building user interfaces...",
    "author": "John Doe",
    "description": "Learn the basics of React development",
    "category": "Technology"
  }'
```

## 🔄 CRUD Operations Workflow

1. **Create**: Click "Write Post" button → Fill form → Publish
2. **Read**: View blog post on home page → Click "Read More"
3. **Update**: On blog detail page → Click "Edit Post" → Update content → Save
4. **Delete**: On blog detail page → Click "Delete Post" → Confirm deletion

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- Verify `MONGODB_URI` in `.env` is correct
- Check firewall settings if using MongoDB Atlas

### Port Already in Use
- Change `PORT` in backend `.env` if port 5000 is taken
- Change proxy in frontend `package.json` if needed

### CORS Errors
- Ensure backend is running before starting frontend
- Check that proxy in `frontend/package.json` points to correct backend URL

### React Not Starting
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Delete `.env` and recreate from `.env.example`

## 🚢 Production Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables on hosting platform
2. Deploy code to hosting service
3. Update frontend `REACT_APP_API_URL` to production API URL

### Frontend (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy `build/` folder to hosting service
3. Set `REACT_APP_API_URL` environment variable

## 📚 Best Practices Implemented

- **Clean Code**: Well-organized folder structure and naming conventions
- **Component Reusability**: Modular React components
- **Error Handling**: Comprehensive error handling in API calls
- **Validation**: Input validation on both frontend and backend
- **Responsive Design**: Mobile-first CSS approach
- **Environment Variables**: Sensitive data stored securely
- **RESTful API**: Proper HTTP methods and status codes
- **Code Comments**: Clear documentation where needed

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact & Support

For questions or support, please create an issue in the repository.

---

**Happy Blogging!** ✨

