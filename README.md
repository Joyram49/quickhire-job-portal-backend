## QuickHire Backend (Node.js + Express + MongoDB)

This is the backend API for the QuickHire mini job board.

### Tech stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Zod for validation

### Environment variables

The backend loads environment variables from, in order:

- `.env` in the backend root (recommended)
- `../.env` (parent folder)
- `src/.env`

Minimum required variables:

```bash
NODE_ENV=development
PORT=8080
DATABASE_URL=mongodb+srv://<user>:<pass>@<cluster>/<db-name>
```

### Scripts

- `npm run dev` – start dev server with hot reload on `PORT` (default `8080`)
- `npm run build` – build TypeScript to `dist`
- `npm start` – run compiled server from `dist`

### API endpoints

All responses are JSON.

- `GET /api/health` – health check

**Jobs**

- `GET /api/jobs` – list jobs, supports:
  - `search` – free-text search in title, company, description
  - `category` – filter by category
  - `location` – filter by location
- `GET /api/jobs/:id` – get single job
- `POST /api/jobs` – create job
- `DELETE /api/jobs/:id` – delete job

**Applications**

- `POST /api/applications` – submit an application for a job

### Models

**Job**

- `title` (string, required)
- `company` (string, required)
- `location` (string, required)
- `category` (string, required)
- `description` (string, required)
- `created_at` (date, auto)

**Application**

- `job_id` (ObjectId → Job, required)
- `name` (string, required)
- `email` (string, required, valid email)
- `resume_link` (string, required, valid URL)
- `cover_note` (string, required)
- `created_at` (date, auto)

### Running locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend root (or use `src/.env`) with `DATABASE_URL` and `PORT`.

3. Start the dev server:

```bash
npm run dev
```

The API will be available at `http://localhost:8080`.
