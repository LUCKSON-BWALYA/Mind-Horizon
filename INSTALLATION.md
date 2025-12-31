# Installation & Setup Checklist

## Pre-Installation Requirements

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account set up
- [ ] Code editor (VS Code recommended)
- [ ] Git installed (optional, for version control)

---

## Backend Setup Steps

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

**Packages installed**:
- express@4.18.2 - Web framework
- mongoose@7.0.0 - MongoDB ODM
- cors@2.8.5 - Cross-origin requests
- dotenv@16.0.3 - Environment variables
- nodemon@2.0.20 (dev) - Auto-reload in development

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and set:
```
MONGODB_URI=mongodb://localhost:27017/blog-app
NODE_ENV=development
PORT=5000
```

### 4. Start MongoDB (if using local)
```bash
# macOS with Homebrew
brew services start mongodb-community

# Windows (if installed)
mongod

# Or use MongoDB Atlas (cloud) - no local setup needed
```

### 5. Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

✅ **Backend running at**: `http://localhost:5000`

Test with:
```bash
curl http://localhost:5000/api/health
```

---

## Frontend Setup Steps

### 1. Navigate to Frontend Directory (New Terminal)
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

**Packages installed**:
- react@18.2.0 - UI library
- react-dom@18.2.0 - React rendering
- react-router-dom@6.8.0 - Routing
- react-scripts@5.0.1 - Build tools

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` (usually no changes needed):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Server
```bash
npm start
```

✅ **Frontend running at**: `http://localhost:3000`

React will auto-open in your browser!

---

## MongoDB Setup Options

### Option 1: Local MongoDB

**macOS (Homebrew)**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows**:
- Download from https://www.mongodb.com/try/download/community
- Follow installation wizard
- Run mongod.exe

**Linux (Ubuntu)**:
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Verify running**:
```bash
mongosh
# or
mongo
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Use in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   ```

---

## Verify Installation

### Check Node/npm
```bash
node --version    # Should be v14+
npm --version     # Should be 6+
```

### Check MongoDB
```bash
mongosh          # Should connect to MongoDB
# Then exit with: exit
```

### Check Backend
```bash
cd backend
npm run dev
# Should show: Server is running on http://localhost:5000
```

### Check Frontend (New Terminal)
```bash
cd frontend
npm start
# Should open browser at http://localhost:3000
```

---

## Dependency Management

### Update Dependencies (Optional)
```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

### View Installed Packages
```bash
npm list
```

### Remove Package (if needed)
```bash
npm uninstall package-name
```

---

## Troubleshooting Installation

| Problem | Solution |
|---------|----------|
| npm: command not found | Install Node.js from nodejs.org |
| MongoDB connection error | Start MongoDB service or use Atlas |
| Port 5000 in use | Change PORT in backend/.env |
| Port 3000 in use | React will prompt to use another |
| node_modules issues | Delete node_modules, clear cache: `npm cache clean --force`, reinstall |
| CORS errors | Ensure backend is running before frontend |

---

## File Sizes (Post-Installation)

```
backend/node_modules/       ~200 MB
frontend/node_modules/      ~400 MB
```

**Total disk space needed**: ~700 MB for node_modules

---

## Development Commands

### Backend
```bash
npm run dev     # Start with auto-reload (nodemon)
npm start       # Start without reload
```

### Frontend
```bash
npm start       # Start dev server
npm build       # Build for production
npm test        # Run tests
```

---

## Environment Variables Quick Reference

### Backend (.env)
| Variable | Example | Required |
|----------|---------|----------|
| MONGODB_URI | mongodb://localhost:27017/blog-app | Yes |
| PORT | 5000 | No (default: 5000) |
| NODE_ENV | development | No |

### Frontend (.env)
| Variable | Example | Required |
|----------|---------|----------|
| REACT_APP_API_URL | http://localhost:5000/api | No |

---

## Next Steps

1. ✅ Install Node.js if not already installed
2. ✅ Install MongoDB (local or Atlas)
3. ✅ Run `npm install` in backend
4. ✅ Create backend `.env` file
5. ✅ Start backend with `npm run dev`
6. ✅ Run `npm install` in frontend
7. ✅ Start frontend with `npm start`
8. ✅ Test by creating a blog post

---

## Getting Help

If installation fails:

1. Check Node/npm versions are up to date
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and package-lock.json
4. Run `npm install` again
5. Check MongoDB is running
6. Review error messages in terminal carefully
7. See README.md for detailed troubleshooting

---

**Installation complete!** 🎉

You're ready to start building your blog. See QUICKSTART.md for next steps.
