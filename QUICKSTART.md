# Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Step 1: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (MongoDB URI)
npm run dev
```
✅ Server running at `http://localhost:5000`

### Step 2: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```
✅ App opens at `http://localhost:3000`

## ✨ You're Done!

### Create Your First Blog
1. Click **"Write Post"** button
2. Fill in the form:
   - Title: "My First Blog"
   - Author: "Your Name"
   - Category: "Technology"
   - Content: Write your content
3. Click **"Publish Post"**
4. View it on the home page!

## 🎮 Test CRUD Operations

### Using the UI
- **Create**: Write Post → Fill Form → Publish
- **Read**: Home page shows all posts → Click "Read More"
- **Update**: Open post → Click "Edit Post" → Update → Save
- **Delete**: Open post → Click "Delete Post" → Confirm

### Using cURL (API Testing)
```bash
# Create
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test content here","author":"Tester"}'

# Read All
curl http://localhost:5000/api/blogs

# Read One (replace ID)
curl http://localhost:5000/api/blogs/YOUR_BLOG_ID

# Update (replace ID)
curl -X PUT http://localhost:5000/api/blogs/YOUR_BLOG_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content","author":"Tester"}'

# Delete (replace ID)
curl -X DELETE http://localhost:5000/api/blogs/YOUR_BLOG_ID
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` |
| Port 5000 already in use | Change PORT in backend/.env |
| Port 3000 already in use | React will ask to use another port |
| CORS error | Check backend is running before frontend |
| No blogs showing | Create a blog post via form or API |

## 📱 Features to Explore

- ✅ **Filter by Category** - See posts by Technology, Travel, Food, Lifestyle, Other
- ✅ **Sort Options** - By Date (default), Title, or Author
- ✅ **Responsive Design** - Test on mobile, tablet, desktop
- ✅ **Real-time Updates** - Create/Edit/Delete and see changes immediately
- ✅ **Error Handling** - Try submitting empty forms to see validation

## 📚 File Structure Summary

```
Mind-Horizon/
├── backend/          (Express + MongoDB)
│   ├── config/       (Database config)
│   ├── models/       (Blog schema)
│   ├── controllers/  (Business logic)
│   ├── routes/       (API endpoints)
│   └── server.js     (Main entry point)
├── frontend/         (React app)
│   ├── src/
│   │   ├── pages/    (BlogList, BlogDetail, BlogForm)
│   │   ├── components/ (Header, Footer)
│   │   ├── services/ (API calls)
│   │   └── styles/   (CSS)
│   └── public/       (HTML)
└── README.md         (Full documentation)
```

## 🎯 Next Steps

1. **Customize**: Add your own styling, logo, or features
2. **Deploy**: Push to GitHub, deploy to Heroku/Vercel
3. **Extend**: Add authentication, comments, likes, tags
4. **Learn**: Study the code to understand full-stack development

## 📞 Need Help?

- Check README.md for detailed documentation
- Review API documentation in README.md
- Check browser console (F12) for errors
- Check terminal output for backend errors

---

**Happy Blogging!** 🚀
