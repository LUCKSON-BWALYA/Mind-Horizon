# Architecture & Data Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Mind Horizon Blog App                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐                    ┌──────────────────────┐
│    FRONTEND LAYER    │                    │    BACKEND LAYER     │
│   (React - Port 3000)│◄──────HTTP───────►│ (Express - Port 5000)│
├──────────────────────┤                    ├──────────────────────┤
│ Components:          │                    │ API Endpoints:       │
│ • Header            │                    │ • GET /blogs         │
│ • Footer            │                    │ • POST /blogs        │
│ • BlogList          │                    │ • GET /blogs/:id     │
│ • BlogDetail        │                    │ • PUT /blogs/:id     │
│ • BlogForm          │                    │ • DELETE /blogs/:id  │
│                      │                    │                      │
│ Services:            │                    │ Controllers:         │
│ • blogService.js    │                    │ • createBlog         │
│ (API calls)         │                    │ • getAllBlogs        │
│                      │                    │ • getBlogById        │
│ State:               │                    │ • updateBlog         │
│ • useState          │                    │ • deleteBlog         │
│ • useEffect         │                    │                      │
│                      │                    │ Middleware:          │
│ Styling:            │                    │ • errorHandler       │
│ • CSS files         │                    │ • CORS               │
│                      │                    │ • JSON parser        │
└──────────────────────┘                    └──────────────────────┘
         │                                           │
         │                                           │
         └──────────────────────┬────────────────────┘
                                │
                         ┌──────▼──────┐
                         │  MONGODB    │
                         │  Database   │
                         │  (Blog Data)│
                         └─────────────┘
```

## Request/Response Flow

### CREATE Blog Post

```
User Form Input
      ▼
Form Validation (Frontend)
      ▼
blogService.createBlog() → POST /api/blogs
      ▼
Express receives request
      ▼
blogController.createBlog()
      ▼
Input Validation (Backend)
      ▼
MongoDB: Blog.create()
      ▼
Response (201 Created)
      ▼
Frontend receives data
      ▼
Update UI & Navigate
      ▼
Display new post
```

### READ Blog Posts

```
User navigates to BlogList
      ▼
useEffect hook runs
      ▼
blogService.fetchAllBlogs()
      ▼
GET /api/blogs?filters
      ▼
Express receives request
      ▼
blogController.getAllBlogs()
      ▼
Apply filters & sorting
      ▼
MongoDB: Blog.find()
      ▼
Response (200 OK)
      ▼
Frontend receives array
      ▼
Render BlogCards
      ▼
Display posts on page
```

### UPDATE Blog Post

```
User clicks "Edit Post"
      ▼
Form pre-fills with data
      ▼
User updates content
      ▼
Form validation
      ▼
blogService.updateBlog() → PUT /api/blogs/:id
      ▼
Express receives request
      ▼
blogController.updateBlog()
      ▼
Input Validation
      ▼
MongoDB: Blog.findByIdAndUpdate()
      ▼
Response (200 OK)
      ▼
Navigate to detail page
      ▼
Display updated post
```

### DELETE Blog Post

```
User clicks "Delete Post"
      ▼
Confirmation dialog
      ▼
User confirms
      ▼
blogService.deleteBlog() → DELETE /api/blogs/:id
      ▼
Express receives request
      ▼
blogController.deleteBlog()
      ▼
MongoDB: Blog.findByIdAndDelete()
      ▼
Response (200 OK)
      ▼
Navigate to home
      ▼
Post removed from list
```

## Component Hierarchy

```
App (Router)
├── Header
│   ├── Logo
│   └── Navigation
│       ├── Home Link
│       └── Write Post Link
│
├── Main Content
│   ├── BlogList Page
│   │   ├── Filter Section
│   │   │   ├── Category Filter
│   │   │   ├── Sort By
│   │   │   └── Order
│   │   └── Blogs Grid
│   │       └── BlogCard (repeating)
│   │           ├── Title
│   │           ├── Category Badge
│   │           ├── Description
│   │           ├── Meta (Author, Date)
│   │           └── Actions (Read More)
│   │
│   ├── BlogDetail Page
│   │   ├── Back Link
│   │   ├── Blog Header
│   │   │   ├── Title
│   │   │   └── Category
│   │   ├── Meta Info
│   │   │   ├── Author
│   │   │   ├── Published Date
│   │   │   └── Updated Date
│   │   ├── Content
│   │   └── Actions
│   │       ├── Edit Button
│   │       └── Delete Button
│   │
│   └── BlogForm Page
│       ├── Form Header
│       ├── Form Fields
│       │   ├── Title Input
│       │   ├── Author Input
│       │   ├── Category Select
│       │   ├── Description Input
│       │   └── Content Textarea
│       └── Form Actions
│           ├── Submit Button
│           └── Cancel Button
│
└── Footer
    └── Copyright & Info
```

## Data Model

```
Blog Document (MongoDB)
┌─────────────────────────────┐
│ _id: ObjectId              │  (Auto-generated)
├─────────────────────────────┤
│ title: String              │  (Required, max 200)
├─────────────────────────────┤
│ content: String            │  (Required, min 10)
├─────────────────────────────┤
│ author: String             │  (Required, max 100)
├─────────────────────────────┤
│ description: String        │  (Optional, max 300)
├─────────────────────────────┤
│ category: String           │  (Tech/Travel/Food/Lifestyle/Other)
├─────────────────────────────┤
│ createdAt: DateTime        │  (Auto-generated)
├─────────────────────────────┤
│ updatedAt: DateTime        │  (Auto-updated)
└─────────────────────────────┘
```

## File Dependencies

```
Backend Dependencies:
server.js
├── config/database.js (MongoDB connection)
├── routes/blogRoutes.js
│   └── controllers/blogController.js
│       └── models/Blog.js (Mongoose schema)
├── middleware/errorHandler.js
├── express (framework)
├── mongoose (MongoDB ORM)
├── cors (Cross-origin)
└── dotenv (Environment variables)

Frontend Dependencies:
App.js
├── components/Header.js
├── components/Footer.js
├── pages/BlogList.js
│   └── services/blogService.js (API calls)
├── pages/BlogDetail.js
│   └── services/blogService.js (API calls)
├── pages/BlogForm.js
│   └── services/blogService.js (API calls)
├── react (UI library)
├── react-router-dom (Routing)
└── CSS files (Styling)
```

## Database Query Examples

```javascript
// Create
Blog.create({ title, content, author, description, category })

// Read All
Blog.find().where('category').equals(category).sort({ createdAt: -1 })

// Read One
Blog.findById(id)

// Update
Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

// Delete
Blog.findByIdAndDelete(id)
```

## API Call Sequence

```
Frontend Component
    │
    ▼
blogService.js
    │
    ├─→ fetch(url, options)
    │
    ▼
HTTP Request ──────────────────┐
                              │
                              ▼
                        Express Server
                              │
                              ▼
                        Route Handler
                              │
                              ▼
                        Controller
                              │
                              ▼
                        Model (Mongoose)
                              │
                              ▼
                        MongoDB Database
                              │
                    ┌─────────┴──────────┐
                    │                    │
        Query Result            Return Data
                    │                    │
                    └─────────┬──────────┘
                              │
                              ▼
                        Response Object
                              │
    ┌─────────────────────────┤
    │                         │
HTTP Response          ←──────┘
    │
    ▼
Frontend receives JSON
    │
    ▼
Process response.json()
    │
    ▼
Update state (useState)
    │
    ▼
Re-render Component
    │
    ▼
Display to User
```

## State Management Flow

```
User Interaction
    ▼
Event Handler
    ▼
Call API Service
    ▼
Update useState
    ▼
Component Re-renders
    ▼
Display Updates
    │
    ├─→ Success: Show data
    ├─→ Loading: Show spinner
    └─→ Error: Show error message
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────┐
│           Production Environment            │
├─────────────────────────────────────────────┤
│                                              │
│  ┌──────────────┐      ┌──────────────────┐ │
│  │ Vercel/      │      │ Heroku/Railway/  │ │
│  │ Netlify      │      │ Render           │ │
│  │              │      │                  │ │
│  │ Frontend     │◄────►│ Backend          │ │
│  │ (React)      │      │ (Express)        │ │
│  └──────────────┘      └────────┬─────────┘ │
│                                 │            │
│                                 ▼            │
│                        ┌──────────────────┐  │
│                        │ MongoDB Atlas    │  │
│                        │ (Cloud DB)       │  │
│                        └──────────────────┘  │
│                                              │
└─────────────────────────────────────────────┘
```

## Responsive Design Breakpoints

```
Mobile (320px - 767px)
├── Single column layout
├── Stack buttons vertically
├── Reduce padding/margins
└── Touch-friendly buttons

Tablet (768px - 1023px)
├── Two column layout for cards
├── Optimized spacing
└── Balanced design

Desktop (1024px+)
├── Grid layout (3 columns)
├── Full spacing
├── Professional layout
└── All features visible
```

---

This architecture ensures:
✅ Clean separation of concerns
✅ Easy testing and debugging
✅ Scalable structure
✅ Professional organization
✅ Efficient data flow
✅ Responsive design
✅ Error handling at each level
✅ State management best practices
