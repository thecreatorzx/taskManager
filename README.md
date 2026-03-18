# TaskMaster

A full-stack task management application with JWT authentication, built from scratch.

## Screenshots

![Dashboard image](./client/src/assets/dashboard2.png)

## Tech Stack

### Frontend

- React 18 + TypeScript
- Tailwind CSS
- Axios (API calls with credentials)
- React Router v6

### Backend

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT (httpOnly cookies)
- bcrypt (password hashing)

## Features

- User registration and login
- JWT authentication stored in httpOnly cookies (XSS protected)
- Protected routes — dashboard inaccessible without login
- Create, complete and delete tasks
- Real-time progress tracking
- Persistent auth — stay logged in on page refresh

## Architecture

```
client/          → React frontend (Vite)
server/          → Express backend
  src/
    routes/      → auth, tasks
    middleware/  → authMiddleware, errorMiddleware
    prisma/      → schema, migrations
```

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### Backend

```bash
cd server
npm install
```

Create `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/taskmaster"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3000
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

## API Routes

### Auth

| Method | Route          | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /auth/register | Create account         |
| POST   | /auth/login    | Login + set cookie     |
| POST   | /auth/logout   | Clear cookie           |
| GET    | /auth/me       | Verify current session |

### Tasks (protected)

| Method | Route      | Description        |
| ------ | ---------- | ------------------ |
| GET    | /tasks     | Get all user tasks |
| POST   | /tasks     | Create task        |
| PUT    | /tasks/:id | Update task status |
| DELETE | /tasks/:id | Delete task        |

## Key Technical Decisions

**Why httpOnly cookies over localStorage?**
httpOnly cookies are inaccessible to JavaScript — protecting against XSS attacks that could steal tokens from localStorage.

**Why bcrypt over SHA256?**
bcrypt is intentionally slow (~100ms per hash) making brute force attacks impractical. It also automatically salts each password preventing rainbow table attacks.

**Why Prisma over raw SQL?**
Type-safe queries, automatic migrations, and protection against SQL injection — while still allowing raw queries when needed.

## Author

[Mohd Saad] — [LinkedIn](https://linkedin.com/in/webdevmsaad) — [GitHub](https://github.com/thecreatorzx)
