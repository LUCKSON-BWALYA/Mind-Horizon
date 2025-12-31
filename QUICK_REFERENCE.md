# 🎴 Quick Reference Card

## 🚀 Get Started in 60 Seconds

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev
# ✅ http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm install
npm start
# ✅ http://localhost:3000
```

---

## 📝 Create Your First Blog

1. Click **"Write Post"** button
2. Fill form:
   - Title: "My First Blog"
   - Author: "Your Name"
   - Content: "Write something..."
   - Category: Pick one
3. Click **"Publish Post"**
4. Done! 🎉

---

## 🔄 CRUD Operations

### CREATE
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Blog","content":"Content...","author":"Name"}'
```

### READ
```bash
curl http://localhost:5000/api/blogs
curl http://localhost:5000/api/blogs/ID
```

### UPDATE
```bash
curl -X PUT http://localhost:5000/api/blogs/ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated...","author":"Name"}'
```

### DELETE
```bash
curl -X DELETE http://localhost:5000/api/blogs/ID
```

---

## 📱 Key Features

| Feature | How to Use |
|---------|-----------|
| **Create Post** | Click "Write Post" button |
| **View Posts** | See on home page |
| **View Single** | Click "Read More" |
| **Edit Post** | Open post → Click "Edit Post" |
| **Delete Post** | Open post → Click "Delete Post" |
| **Filter** | Use Category dropdown |
| **Sort** | Use Sort dropdown |

---

## 🗂️ File Structure

```
Mind-Horizon/
├── backend/          (Express + MongoDB)
│   ├── server.js
│   ├── models/Blog.js
│   ├── controllers/blogController.js
│   └── routes/blogRoutes.js
├── frontend/         (React)
│   ├── src/App.js
│   ├── src/pages/BlogList.js
│   ├── src/pages/BlogDetail.js
│   └── src/pages/BlogForm.js
├── README.md         (Read this!)
└── QUICKSTART.md     (Start here!)
```

---

## 🔧 Configuration

### Backend .env
```
MONGODB_URI=mongodb://localhost:27017/blog-app
NODE_ENV=development
PORT=5000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 💾 Technology Stack

**Backend**: Node.js • Express • MongoDB • Mongoose
**Frontend**: React • React Router • CSS3
**Database**: MongoDB

---

## 🌐 API Endpoints

```
GET    /api/health              Status
GET    /api/blogs               All posts
GET    /api/blogs/:id           One post
POST   /api/blogs               Create
PUT    /api/blogs/:id           Update
DELETE /api/blogs/:id           Delete
```

---

## 🎨 Color Scheme

```
Primary:    #2563eb (Blue)
Secondary:  #1e40af (Dark Blue)
Success:    #16a34a (Green)
Danger:     #dc2626 (Red)
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| QUICKSTART.md | 5-min setup |
| API_EXAMPLES.md | API usage |
| ARCHITECTURE.md | System design |
| INSTALLATION.md | Setup guide |
| PROJECT_SUMMARY.md | Overview |
| FILE_INDEX.md | File reference |

---

## ⚡ Common Commands

```bash
# Backend
npm run dev        # Start with auto-reload
npm start          # Start without reload

# Frontend
npm start          # Start dev server
npm build          # Build for production
npm test           # Run tests

# MongoDB
mongod             # Start MongoDB locally
mongosh            # MongoDB shell
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB error | Start MongoDB: `mongod` |
| Port in use | Change PORT in .env |
| CORS error | Check backend is running |
| Module not found | Run `npm install` again |
| Form not submitting | Check browser console |

---

## 📊 Blog Fields

```
title:       String (required, max 200)
content:     String (required, min 10)
author:      String (required, max 100)
description: String (optional, max 300)
category:    Technology | Travel | Food | Lifestyle | Other
createdAt:   DateTime (auto)
updatedAt:   DateTime (auto)
```

---

## 🎯 Categories

- Technology
- Travel
- Food
- Lifestyle
- Other

---

## 📱 Responsive Design

```
Mobile:   320px - 767px
Tablet:   768px - 1023px
Desktop:  1024px+
```

---

## ✅ Checklist

- [ ] npm install in backend
- [ ] npm install in frontend
- [ ] MongoDB running
- [ ] Backend running on 5000
- [ ] Frontend running on 3000
- [ ] Created first blog post
- [ ] Tested all CRUD operations
- [ ] Tested filters and sorting

---

## 🚀 Deployment

**Backend**: Heroku, Railway, Render
**Frontend**: Vercel, Netlify
**Database**: MongoDB Atlas

---

## 💡 Pro Tips

✅ Use MongoDB Atlas for easy setup
✅ Test API with curl or Postman
✅ Check browser console for errors (F12)
✅ Check terminal for backend errors
✅ Use React DevTools for debugging
✅ Mobile test your responsive design

---

## 📖 Learn More

- Backend: `backend/server.js`
- Frontend: `frontend/src/App.js`
- API: `backend/controllers/blogController.js`
- Forms: `frontend/src/pages/BlogForm.js`
- Styling: `frontend/src/styles/`

---

## 🎓 Study Order

1. QUICKSTART.md (5 min)
2. Run the project
3. Create a blog post
4. Read backend/server.js
5. Read frontend/src/App.js
6. Read API_EXAMPLES.md
7. Experiment and modify!

---

## 🔐 Best Practices

✅ Validate input on frontend and backend
✅ Use environment variables for config
✅ Handle errors gracefully
✅ Test on mobile
✅ Follow consistent naming
✅ Add comments to code
✅ Backup before deploying
✅ Monitor after deploying

---

## 🌟 Key Files

**Must Know**:
- backend/server.js
- frontend/src/App.js
- frontend/src/services/blogService.js
- backend/controllers/blogController.js

**Should Know**:
- backend/models/Blog.js
- frontend/src/pages/BlogForm.js
- frontend/src/styles/

---

## 📞 When You Need Help

1. **Installation**: See INSTALLATION.md
2. **API Help**: See API_EXAMPLES.md
3. **Setup Help**: See QUICKSTART.md
4. **General Help**: See README.md
5. **Design Help**: See ARCHITECTURE.md

---

## 🎉 You're Ready!

```
┌──────────────────────────┐
│ Congratulations!         │
│ Your full-stack app is   │
│ ready to rock!           │
│                          │
│ Next: Run QUICKSTART.md  │
└──────────────────────────┘
```

**Start**: `npm run dev` (backend) + `npm start` (frontend)

**Then**: Create your first blog post!

---

**Happy Blogging!** 🚀

