# Gidy Profile Replica

A full-stack developer profile application — replica + innovation.

**Author:** Mohamed Ashik M

---

## 🔗 Live Links

- **Live App:** [Update with Netlify URL]
- **GitHub Repo:** [Update with GitHub URL]

---

## 🛠 Tech Stack

| Layer        | Tech                        |
| ------------ | --------------------------- |
| Frontend     | React + Vite                |
| Backend      | Node.js + Express           |
| Database     | MongoDB Atlas               |
| File Uploads | Multer                      |
| HTTP Client  | Axios                       |
| ODM          | Mongoose                    |
| AI           | Google Gemini 2.5 Flash API |
| Hosting (FE) | Netlify                     |
| Hosting (BE) | Render                      |

---

## ✨ Features

- Profile management — name, bio, avatar, resume upload
- Skills, Experience, Education, Certifications — full CRUD
- Social links — Instagram, GitHub, LinkedIn
- Profile completion tracker with task shortcuts
- AI Profile Analyzer — Gemini-powered score + improvement suggestions
- Public Portfolio View — clean recruiter-facing read-only mode

---

## 💡 Innovation Features

### 1. AI Profile Analyzer

Built using Google Gemini 2.5 Flash API. When a user selects a target role (e.g. Full Stack Developer), the entire profile — skills, experience, education, certifications, bio — is sent to Gemini with a structured prompt that returns:

- A match score out of 100
- Top 3 profile strengths
- 5 improvement suggestions tailored to the role
- 3 skills recommended to add

**Why:** Recruiters filter profiles by keywords and role fit. Most developers don't know how their profile reads to an ATS or a recruiter. This feature gives users an objective, role-specific audit so they can close the gap before applying.

---

### 2. Public Portfolio View

A toggle button in the profile header switches between Edit Mode and Public View. In Public View all edit controls are hidden and the layout becomes a clean, read-only portfolio — like a shareable resume link.

**Why:** Users often can't visualize how their profile looks to someone else. This toggle lets them instantly see their profile through a recruiter's eyes — encouraging them to fill gaps and optimize content before sharing.

---

## ⚙️ Local Setup

### Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas account (free tier)
- Google AI Studio account for Gemini API key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd gidy-profile-replica
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Make sure your `package.json` has the following scripts:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

Start the backend in development mode:

```bash
npm run dev
```

> For production use `npm start` instead.

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

> **Note:** The frontend is pre-configured in `src/config.js` to point to the deployed backend on Render. No changes are needed — the frontend will work against the live API out of the box.

---

## 🍃 Getting Your MongoDB Atlas URI

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign up or log in
2. Create a new Project → click **Build a Database**
3. Choose the **FREE** shared tier (M0)
4. Set a username and password — save these
5. Under **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
6. Go to **Database → Connect → Drivers**
7. Copy the connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

8. Replace `<username>`, `<password>`, and `<dbname>` with your values
9. Paste as `MONGO_URI` in your `.env`

---

## 🤖 Getting Your Gemini API Key

1. Go to [https://aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** in the left sidebar
4. Click **Create API Key** → select or create a Google Cloud project
5. Copy the generated key
6. Paste as `GEMINI_API_KEY` in your `.env`

> **Note:** The free tier allows up to 500 requests/day on Gemini 2.5 Flash. Do not commit your API key to GitHub.

---

## 📡 API Endpoints

### Profile

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/profile`               | Get profile         |
| PUT    | `/api/profile`               | Update profile      |
| POST   | `/api/profile/upload-avatar` | Upload avatar image |
| POST   | `/api/profile/upload-resume` | Upload resume PDF   |

### Skills

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| PUT    | `/api/profile/skills` | Update skills array |

### Experience

| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| POST   | `/api/profile/experience`     | Add experience    |
| PUT    | `/api/profile/experience/:id` | Update experience |
| DELETE | `/api/profile/experience/:id` | Delete experience |

### Education

| Method | Endpoint                     | Description      |
| ------ | ---------------------------- | ---------------- |
| POST   | `/api/profile/education`     | Add education    |
| PUT    | `/api/profile/education/:id` | Update education |
| DELETE | `/api/profile/education/:id` | Delete education |

### Certifications

| Method | Endpoint                         | Description          |
| ------ | -------------------------------- | -------------------- |
| POST   | `/api/profile/certification`     | Add certification    |
| PUT    | `/api/profile/certification/:id` | Update certification |
| DELETE | `/api/profile/certification/:id` | Delete certification |

### Socials

| Method | Endpoint                         | Description           |
| ------ | -------------------------------- | --------------------- |
| PUT    | `/api/profile/socials`           | Add or replace social |
| PUT    | `/api/profile/socials/:platform` | Update social URL     |
| DELETE | `/api/profile/socials/:platform` | Delete social         |

### AI

| Method | Endpoint                  | Description                         |
| ------ | ------------------------- | ----------------------------------- |
| POST   | `/api/profile/ai-analyze` | Analyze profile against target role |

---

_Built by Mohamed Ashik M — Submitted to gidy@gidy.ai_
