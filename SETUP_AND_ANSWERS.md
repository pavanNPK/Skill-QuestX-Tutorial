# Setup & Answers

## 1. Backend

The backend is now **Node.js + Express + TypeScript**.

- Runtime: Node.js
- HTTP framework: Express
- Database: MongoDB with Mongoose
- Auth: JWT middleware
- File uploads: local `uploads/` folder
- Main source: `server/src/express`

---

## 2. MongoDB URL – is the Compass one OK?

**Yes.** The connection string you get when you choose **“Compass”** in the Atlas “Connect” dialog is the same format as the one used by **Drivers**.

- It looks like:  
  `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`
- Use this **exact same URL** in the Express backend (in `.env` as `MONGODB_URI`).
- Only replace `<username>`, `<password>`, and optionally `<dbname>` with your real values. Do **not** commit this URL to git; keep it in `.env` and add `.env` to `.gitignore`.

So: **Compass connection string = Driver connection string** for this use case. You’re good to use it in the backend.

---

## 3. Hostinger mail – how to connect and is an app password required?

Hostinger uses **SMTP** for sending mail. To send from the backend:

1. **Get SMTP details from Hostinger**  
   In Hostinger: **Emails** → your domain → **Connect device / SMTP**. You’ll see:
   - Server: e.g. `smtp.hostinger.com`
   - Port: **465** (SSL) or **587** (TLS)
   - Username: your full email (e.g. `noreply@yourdomain.com`)
   - Password: either the normal email password or an **App password** (see below)

2. **Is an app password required?**  
   - If Hostinger offers **“App password”** or **“Application password”** for that mailbox, **use it** instead of your normal email password. It’s more secure and often required when 2FA or “less secure apps” restrictions are on.
   - If there is no app password option, use the **normal email password** for that mailbox. Prefer a dedicated mailbox (e.g. `noreply@yourdomain.com`) for sending from the app.

3. **How to create an app password (when available)**  
   - In Hostinger: **Emails** → select the account → look for **“App passwords”** or **“Security” / “2FA”**.  
   - Create a new app password, copy it once, and use it in your app as the SMTP password.  
   - If you don’t see it, check Hostinger’s help for “SMTP” or “app password”; it varies by plan.

4. **In the Node/Express backend**  
   - Store in `.env`:  
     `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD` (your app password or email password), `MAIL_FROM`.  
   - The backend uses these in a mail module (e.g. Nodemailer) to send registration/OTP/password-reset emails.

---

## 4. Project layout (client + server)

- **`client/`** – Angular app (frontend). Entire current project lives here.
- **`server/`** – Node/Express app (backend): auth, MongoDB, mail, uploads, notifications, and learning content APIs.

Root `package.json` can have scripts like `"start:client"`, `"start:server"` (and optionally `"start"` running both) for convenience.

---

## 5. Auth guards and lazy loading (frontend)

The app uses:

- **CanMatch** (`authLoadGuard`) – decides whether to load the protected route bundle at all (no token → don’t load).
- **CanActivate** (`authGuard`) – allows/denies access to the route.
- **CanActivateChild** (`authChildGuard`) – same check for child routes.

All feature modules (dashboard, courses, materials, classes, tasks, batches, exams, projects) are **lazy-loaded** via `loadChildren`. No change needed for “all lazy loading” beyond what’s already there; the new backend simply replaces the static token with a real JWT from the API.

---

## 6. Loader overlay

A **full-screen overlay** with:

- **Blur** (white or black) for the whole screen  
- **Centered SVG loader** (training/project style)  
- Shown during HTTP requests (via an HTTP interceptor) and optionally via a `LoaderService` for other async actions  

is implemented under `client` in shared components and wired via interceptor and optional service.

---

## 7. How to run

1. **Backend (server)**  
   - `cd server`  
   - Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` (your Compass/Atlas URL), `JWT_SECRET`, and optionally Hostinger SMTP vars.  
  - `npm install`  
   - `npm run start:dev`  

2. **Frontend (client)**  
   - `cd client`  
   - `npm install --legacy-peer-deps` (if needed)  
   - Set `apiUrl` in `client/src/environments/environment.ts` to `http://localhost:3000` (default).  
   - `npm start`  

3. **From root**  
   - `npm run install:all` then `npm run start:client` and `npm run start:server` in two terminals.
