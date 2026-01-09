# 🚀 Mind-Horizon Quick Start Guide

## Project Overview
Mind-Horizon is a professional full-stack blog application with user authentication, rich text editing, image uploads, and a beautiful meditation-themed UI.

---

## 🎨 Features at a Glance

### ✨ User Interface
- **Beautiful Auth Pages** with meditation image and color palette (#3F888D, #D0B6CE, #F6F1EF)
- **Welcome Greeting** screen after login/signup
- **Responsive Design** works on desktop, tablet, and mobile
- **Rich Text Editor** for blog post creation with formatting options

### 📰 Blog Features
- **Search & Filter** by title, content, author, or category
- **Pagination** for easy blog browsing (6 posts per page)
- **Categories** including Mindfulness, Technology, Travel, Food, Lifestyle
- **Image Uploads** with featured image support (5MB max)
- **View Tracking** automatic view counter per post
- **Like System** for authenticated users

### 💬 Community Features
- **Comments System** with full CRUD operations
- **Comment Likes** show community engagement
- **Approval System** for comment moderation

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas or local)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create `.env` file in `backend/` directory:
```env
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

#### Start Backend
```bash
npm run dev     # With nodemon auto-reload
# or
npm start       # Production mode
```

The server will start at `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
```

#### Start Frontend
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🗂️ Project Structure

```
Mind-Horizon/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── fileUpload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── commentRoutes.js
│   ├── uploads/          # Generated at runtime
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── meditation.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── BlogList.js
│   │   │   ├── BlogDetail.js
│   │   │   └── BlogForm.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── blogService.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── Auth.css
│   │   │   ├── Header.css
│   │   │   ├── BlogList.css
│   │   │   ├── BlogForm.css
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── IMPLEMENTATION_SUMMARY.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Blogs
- `GET /api/blogs` - Get all blogs (supports query params: category, sortBy, order)
- `GET /api/blogs/:id` - Get single blog by ID
- `POST /api/blogs` - Create new blog (protected, with image upload)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)

### Comments
- `GET /api/comments/blog/:blogId` - Get comments for a blog
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)
- `POST /api/comments/:id/like` - Like a comment (protected)

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Cyan | #3F888D | Primary buttons, headers |
| Thistle | #D0B6CE | Accents, hover states |
| Parchment | #F6F1EF | Light backgrounds |
| White | #FFFFFF | Card/form backgrounds |

---

## 🛠️ Available Scripts

### Backend
```bash
npm start       # Start server (production)
npm run dev     # Start with nodemon (development)
```

### Frontend
```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
npm eject       # Eject from Create React App
```

---

## 📝 Creating Your First Blog Post

1. **Login/Register**
   - Navigate to `/login` or `/register`
   - See the meditation image and brand colors
   - Welcome greeting appears after successful auth

2. **Create Blog**
   - Click "Create First Post" or navigate to `/create`
   - Fill in title, author name, category
   - Upload a featured image (optional)
   - Use the rich text editor for content formatting
   - Click "Publish Post"

3. **View Blog**
   - Browse blogs on homepage with search/filter
   - Click "Read More" to view full post
   - View counter increments automatically
   - Like the post or add comments

---

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Tokens stored in localStorage
- Sent as `Authorization: Bearer [token]` header
- Protected routes require valid token
- Auto-logout on token expiration

---

## 📸 Image Upload

**Supported Formats**: JPEG, PNG, GIF, WebP
**Max Size**: 5MB
**Storage**: Local filesystem (`/backend/uploads`)

Images are:
- Validated on client and server
- Served via `/uploads/:filename` endpoint
- Automatically deleted when blog is deleted

---

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB connection failed
```
**Solution**: Check your `.env` file MONGODB_URI is correct and account has network access

### File Upload Not Working
```
Error: multer middleware not found
```
**Solution**: Ensure `uploads` directory exists in backend root

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` or kill process using port 5000

---

## 📚 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- dotenv - Environment variables
- cors - Cross-origin resource sharing
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- multer - File upload handling

### Frontend
- react - UI library
- react-router-dom - Routing
- react-quill - Rich text editor

---

## 🤝 Contributing

To contribute to Mind-Horizon:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is created as a portfolio project.

---

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] User profiles
- [ ] Email notifications
- [ ] Social sharing
- [ ] Advanced search with Elasticsearch
- [ ] CDN integration for images
- [ ] Unit and integration tests
- [ ] Analytics dashboard
- [ ] Comment notifications
- [ ] Draft post saving

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify MongoDB connection

---

**Happy Blogging! 🎉**

Last Updated: January 9, 2026
